const path = require('path');
const Video = require('../../models/category');
const config = require('../../config/server.config');
const multer = require('multer');

function uploadFile(){

}

exports.createVideo = (req, res) => {

    var newVideo = new Video({
        name: req.body.name,
        file_path: req.body.file_path,
    });
    newVideo.save(function (err) {
        if (err) return res.json(err);
        return res.json(newVideo)
    })
};
