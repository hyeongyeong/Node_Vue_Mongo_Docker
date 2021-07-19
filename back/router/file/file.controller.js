const path = require('path');
const config = require('../../config/server.config');
const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/data') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
});

exports.upload = multer({ storage: storage });

exports.uploadFile =  (req, res) => {
    res.send("upload");
};

exports.getFile = (req, res) => {
    res.send("get");
};

exports.deleteFile = (req, res) => {
    const filePath = path.join('/data', req.param('path'));

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if(err) {
            console.log("can not delete file")
            return res.status(404).send({message: `can not delete file : ${err}`});
        }

        fs. unlink(filePath, (err) => {
            if(err) {
                console.log("can not delete file");
                return res.status(404).send({message: `can not delete file : ${err}`});
            }
            console.log(`Successfully delete ${filePath}.`);
            res.send(`Successfully delete ${filePath}.`);
        });
    });
};