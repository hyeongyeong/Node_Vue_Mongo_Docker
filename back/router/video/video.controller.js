const path = require('path');
const Video = require('../../model/Video');
const config = require('../../config/server.config');
const multer = require('multer');

function uploadFile(){

}

exports.createVideo = (req, res) => {
    console.log(req.body);
    var newVideo = new Video({
        name: req.body.name,
        file_path: req.body.file_path,
    });
    newVideo.save(function (err) {
        if (err) return res.json(err);
        console.res.json(newVideo);
        return res.json(newVideo);
    });
};

exports.getAllVideo = (req, res) => {
    Video.find({}, (err, video) => {
        if (err) return res.status(500).send(err); // 500 error
        return res.json(video);
    });
};