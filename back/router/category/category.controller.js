const path = require('path');
const Category = require('../../model/Category');
const config = require('../../config/server.config');
const multer = require('multer');

function uploadFile(){

}

exports.createCategory = (req, res) => {
    var newCategory = new Category({
        name: req.body.name,
        file_path: req.body.file_path,
        depth: 0, // TODO: need to edit
        img_path: req.body.img_path,
        sequence: req.body.sequence,
    });
    newCategory.save(function (err) {
        if (err) return res.json(err);
        return res.json(newCategory);
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