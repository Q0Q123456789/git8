const crypto = require('crypto');

const  common = {};

common.initItme = function () {
    let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
};

common.md5 = function(parameter){
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(parameter).digest("hex");
    return newPas;
};

common.sha256 = function(parameter){
    let sha256 = crypto.createHash("sha256");
    let encryption = sha256.update(parameter).digest("hex");
    return encryption;
};
module.exports = common;