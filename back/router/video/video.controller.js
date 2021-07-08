const path = require('path');
const Video = require('../../model/Video');
const config = require('../../config/server.config');
const multer = require('multer');

function uploadFile(){

}

exports.createVideo = (req, res) => {
    var newVideo = new Video({
        name: req.body.name,
        sequence: req.body.sequence,
        img_path: req.body.img_path,
        file_path: req.body.file_path,
        //category: req.body.category,
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