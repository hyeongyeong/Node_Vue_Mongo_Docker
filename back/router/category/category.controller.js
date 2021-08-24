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
        cb(null, `category_${Date.now()}_category_${file.originalname}`);
    }
});

exports.uploadCategoryFile = multer({ storage: storage});

exports.createCategory = (req, res) => {
    const category = JSON.parse(req.body.category);
    const path = req.file.path;

    var newCategory = new Category({
        name: category.name,
        depth: category.depth,
        img_path: path,
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
        });
        return res.json(newCategory);  
    });
};

exports.updateCategory = (req, res) => {
    
    Category.findOneAndUpdate(
        {_id: req.params.id}, {$set: req.body}, (update_err, result) => {
            if (!update_err) {
                Category.findOne({_id: req.params.id}, (find_err, video) => {
                    if(!find_err) {return res.json(video);}
                    else {return res.json({message: `해당하는 데이터가 없습니다.`})};
                });
            } else {return res.json({result: `id: ${req.params.id}에 해당 body를 업데이트하지 못했습니다.`})};
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
