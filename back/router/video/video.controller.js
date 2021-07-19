const path = require('path');
const Video = require('../../model/Video');
const config = require('../../config/server.config');
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/data') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
});

exports.upload = multer({ storage: storage });

exports.uploadVideo =  (req, res) => {
    
    res.send("upload");
};

exports.getVideo = (req, res) => {
    res.send("get");
};

exports.createVideo = (req, res) => {
    var newVideo = new Video({
        name: req.body.name,
        sequence: req.body.sequence,
        img_path: req.body.img_path,
        file_path: req.body.file_path,
        category: req.body.category,
    });
    newVideo.save(function (err) {
        if (err) return res.json(err);
        return res.json(newVideo);
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