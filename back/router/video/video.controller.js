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
        cb(null, `video_${Date.now()}_${file.originalname}`);
    }
});

exports.uploadVideoFile = multer({ storage: storage});

exports.upload = multer({ storage: storage });


exports.createVideo = (req, res) => {
    const video = JSON.parse(req.body.video);
    const path = [];
    const ext = [];

    var file_path_data = {};
    // TODO: check if file exist
    req.files.forEach(file => {
        path.push(file.path);
        ext.push(file.path.split('.')[1]);
    });

    for(var i = 0; i<path.length; i++){
        if (videoFormat.includes(ext[i])) {
            file_path_data.video_path = path[i];
        }
        else {
            file_path_data.img_path = path[i];
        }
    }

    var newVideo = new Video({
        name: video.name,
        sequence: video.sequence,
        category: video.category,
        img_path: file_path_data.img_path,
        file_path: file_path_data.video_path
    });
    newVideo.save(function (mongo_err) {
        if (mongo_err) return res.json(mongo_err);
        return res.json(newVideo);
    });
};

exports.getAllVideo = (req, res) => {
    Video.find({}, (err, video) => {
        if (err) return res.status(500).send(err); // 500 error
        return res.json(video);
    });
};

exports.getVideoRelatedCategory = (req, res) => {
    Video.find({category: req.params.category}, (err, video) => {
        if (err) return res.status(500).send(err); // 500 error
        return res.json(video);
    })
}

exports.updateVideo = (req, res) => {
    Video.findOneAndUpdate(
        {_id: req.params.id}, {$set: req.body}, (update_err, result) => {
            if (!update_err) {
                Video.findOne({_id: req.params.id}, (find_err, video) => {
                    if(!find_err) {return res.json(video);}
                    else {return res.json({message: `???????????? ???????????? ????????????.`})};
                });
            } else {return res.json({result: `id: ${req.params.id}??? ?????? body??? ?????????????????? ???????????????.`})};
    }); 
};

exports.deleteVideo = (req, res) => {
    Video.findOneAndRemove({_id: req.params.id},(remove_err, result)=> {
        if (!remove_err && result){
            var paths = [];
            paths.push(result.file_path);
            paths.push(result.img_path);
            paths.forEach(path => {
                fs.access(path, fs.constants.F_OK, (file_search_err) => { // A
                    if (file_search_err) return console.log('????????? ??? ?????? ???????????????');
                    fs.unlink(path, (file_remove_err) => file_remove_err ?  
                      console.log(file_remove_err) : console.log(`????????? ??????????????? ??????????????????`));
                  });
            });
            return res.json({message: `??????????????? ????????? ???????????? ???????????????, ????????? ?????? ????????? ???????????? ???????????? ?????????????????????.`});
        }
        return res.status(404).send({message: `id??? ${req.params.id}??? ???????????? ???????????? ????????????.`});
    });
};