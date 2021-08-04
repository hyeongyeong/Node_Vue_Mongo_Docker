const path = require('path');
const Video = require('../../model/Video');
const config = require('../../config/server.config');
const multer = require('multer');
const fs = require('fs')


const videoFormat = ['mp4', 'mov', 'wmv', 'avi', 'mkv']
const imageFormat = ['png', 'jpg', 'jpeg', 'bmp']

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `/data`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_video_${file.originalname}`);
    }
});

exports.uploadVideoFile = multer({ storage: storage});

exports.upload = multer({ storage: storage });


exports.createVideo = (req, res) => {
    const video = JSON.parse(req.body.video);
    const path = []
    const ext = []
    var videoPath = '';
    var imgPath = '';

    req.files.forEach(file => {
        path.push(file.path);
        ext.push(file.path.split('.')[1]);
    });

    var newVideo = new Video({
        name: video.name,
        sequence: video.sequence,
        category: video.category,
    });

    newVideo.save(function (mongo_err) {
        if (mongo_err) return res.json(mongo_err);

        // 파일 업로드 확인
        for(var i = 0; i<path.length; i++){
            fs.access(path[i], fs.F_OK, (file_access_err) => {
                if(file_access_err){ 
                    console.error(`파일이 서버에 업로드되지 않음 ${file_access_err}`);
                    return;
                }
            });
        }
        // directory 존재 확인
        var newFileDirectory = `/data/${newVideo.category}`;
        if(!fs.existsSync(newFileDirectory)){
            fs.mkdirSync(newFileDirectory);
        }
        // 파일 path 변경
        for(var i = 0; i<path.length; i++){
            if (videoFormat.includes(ext[i])) {
                videoPath = newFileDirectory + `/${newVideo.name}_video.${ext[i]}`;
                fs.rename(path[i], videoPath, function (err) {
                    if (err) throw err;
                    console.log(`성공적으로 이동했습니다.`);
                  });
            } else {
                imgPath = newFileDirectory + `/${newVideo.name}_thumbnail.${ext[i]}`;
                fs.rename(path[i], imgPath, function (err) {
                    if (err) throw err;
                    console.log(`성공적으로 이동했습니다.`);
                  });
            }   
        }
        Video.findOneAndUpdate({_id: newVideo._id}, {$set: {'img_path' : imgPath, 'file_path' : videoPath}}, (update_err, update_result) => {
            if (!update_err) {
                newVideo.img_path = imgPath;
                newVideo.file_path = videoPath;
                return res.json(newVideo);
            } 
            else {
                console.error(`새로운 이미지 패스가 update되지 않음 ${update_err}`);
            }
        });
    });
};

exports.getAllVideo = (req, res) => {
    Video.find({}, (err, video) => {
        if (err) return res.status(500).send(err); // 500 error
        return res.json(video);
    });
};

exports.updateVideo = (req, res) => {
    if (req.body.category){ 
        const updatedata = {};
        updatedata.category = req.body.category;
        Video.findOne({_id: req.params.id}, (err, video) => {
            if (err) return res.status(500).send(err); // 500 error
            var paths = []
            paths.push(video.file_path);
            paths.push(video.img_path);
            paths.forEach(path => {
                var fileName = path.split('/')[3];
                var ext = fileName.split('.')[1];
                var newPath = `/data/${req.body.category}/`
                newPath += req.body.name? `${req.body.name}`:fileName.split('.')[0];
                if (videoFormat.includes(ext)) {
                    newPath += `_video.${ext}`
                    updatedata.file_path = newPath;
                } else {
                    newPath += `_thunbnail.${ext}`
                    updatedata.img_path = newPath;
                }
                fs.access(path, fs.F_OK, (file_search_err) => { // A
                    if (file_search_err) {
                        return console.log('파일을 찾을 수 없습니다');
                    }
                    fs.rename(path, newPath, function (err) {
                        if (err) { return res.json({message: `해당하는 카테고리가 없습니다.`});}
                        console.log(`성공적으로 이동했습니다.`);
                    });
                });
                
            });
            req.body.name? updatedata.name = req.body.name : 0;
            req.body.sequence? updatedata.sequence = req.body.sequence : 0;
            Video.findOneAndUpdate(
                {_id: req.params.id}, updatedata, (update_err, result) => {
                    if (!update_err) {
                        Video.findOne({_id: req.params.id}, (find_err, updated_video) => {
                            if(!find_err) {return res.json(updated_video);}
                            else {return res.json({message: `해당하는 데이터가 없습니다.`})};
                        });
                    } else {return res.json({result: `해당 데이터를 업데이트하지 못했습니다.`})};
            });
        });
    }
    else {
        Video.findOneAndUpdate(
            {_id: req.params.id}, {$set: req.body}, (update_err, result) => {
                if (!update_err) {
                    Video.findOne({_id: req.params.id}, (find_err, video) => {
                        if(!find_err) {return res.json(video);}
                        else {return res.json({message: `해당하는 데이터가 없습니다.`})};
                    });
                } else {return res.json({result: `id: ${req.params.id}에 해당 body를 업데이트하지 못했습니다.`})};
        });
    }
    
};

exports.deleteVideo = (req, res) => {
    Video.findOneAndRemove({_id: req.params.id},(remove_err, result)=> {
        if (!remove_err && result){
            var paths = [];
            paths.push(result.file_path);
            paths.push(result.img_path);
            paths.forEach(path => {
                fs.access(path, fs.constants.F_OK, (file_search_err) => { // A
                    if (file_search_err) return console.log('삭제할 수 없는 파일입니다');
                    fs.unlink(path, (file_remove_err) => file_remove_err ?  
                      console.log(file_remove_err) : console.log(`파일을 정상적으로 삭제했습니다`));
                  });
            });
            return res.json({message: `성공적으로 비디오 데이터를 삭제하였고, 포함된 파일 경로에 해당하는 파일들을 삭제하였습니다.`});
        }
        return res.status(404).send({message: `id가 ${req.params.id}에 해당하는 데이터가 없습니다.`});
    });
};