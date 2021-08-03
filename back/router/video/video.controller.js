const path = require('path');
const Video = require('../../model/Video');
const config = require('../../config/server.config');
const multer = require('multer');
const fs = require('fs')


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
    const videoFormat = ['mp4', 'mov', 'wmv', 'avi', 'mkv']
    const imageFormat = ['png', 'jpg', 'jpeg', 'bmp']
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
                    console.log('renamed complete');
                  });
            } else {
                imgPath = newFileDirectory + `/${newVideo.name}_thumbnail.${ext[i]}`;
                fs.rename(path[i], imgPath, function (err) {
                    if (err) throw err;
                    console.log('renamed complete');
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

exports.deleteVideo = (req, res) => {
    Video.findOneAndRemove({_id: req.param('id')}, (err, result)=> {
        if (!err && result){
            return res.json(result);
        }
        return res.status(404).send({message: 'No data found to delete'});
    });
};