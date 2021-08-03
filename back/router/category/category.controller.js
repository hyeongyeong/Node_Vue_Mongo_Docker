const path = require('path');
const Category = require('../../model/Category');
const config = require('../../config/server.config');
const multer = require('multer');
const fs = require('fs')

// 파일 path 수정 + folder path 없으면 생성하게
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `/data`)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_category_${file.originalname}`);
    }
});

exports.uploadCategoryFile = multer({ storage: storage});

exports.createCategory = (req, res) => {
    const category = JSON.parse(req.body.category);
    const path = req.file.path;
    const ext = path.split('.')[1];

    var newCategory = new Category({
        name: category.name,
        depth: category.depth,
        sequence: category.sequence,
    });
    newCategory.save(function (mongo_err) {
        // db에 new category data 저장됐는지 확인
        if (mongo_err) return res.json(`데이터베이스에 데이터가 생성되지 않음 ${mongo_err}`);
        // 파일이 서버에 올라와있는지 확인
        fs.access(path, fs.F_OK, (file_access_err) => {
            if (file_access_err) {
              console.error(`파일이 서버에 업로드되지 않음 ${file_access_err}`);
              return;
            }
            // 새로운 파일 패스를 정하고 그 directory가 존재하는지 확인, 없으면 새로 만들기
            var newFileDirectory = `/data/${newCategory._id}`;
            if(!fs.existsSync(newFileDirectory)){
                fs.mkdirSync(newFileDirectory);
            }
            // 파일을 새로운 파일 패스로 rename, mongo database에 update
            var newFilePath = newFileDirectory + `/${newCategory.name}.${ext}`;
            fs.rename(path, newFilePath, () => {
                Category.findOneAndUpdate({_id: newCategory._id}, {$set: {'img_path': newFilePath}}, (update_err, update_result) => {
                    if (!update_err) {
                        newCategory.img_path = newFilePath;
                        return res.json(newCategory);
                    } 
                    else {
                        console.error(`새로운 이미지 패스가 update되지 않음 ${update_err}`);
                    }
                });
            })

        });    
    });
};

exports.getAllCategory = (req, res) => {
    Category.find({}, (err, category) => {
        if (err) return res.status(500).send(err); // 500 error
        return res.json(category);
    });
};

exports.getTopCategory = (req, res) => {
    Category.find({depth: 0}, (err, category) => {
        if (err) return res.status(500).send(err); // 500 error
        return res.json(category);
    });
};

exports.deleteCategory = (req, res) => {
    Category.findOneAndRemove({_id: req.param('id')}, (err, result)=> {
        if (!err && result){
            return res.json(result);
        }
        return res.status(404).send({message: 'No data found to delete'});
    });
};