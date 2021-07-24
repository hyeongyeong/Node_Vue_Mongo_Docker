
exports.serverHost = '0.0.0.0';
exports.serverPort = 5000;

exports.dbUrl = function(){
    return `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongodb:27017/${process.env.DB_NAME}`;
};


