var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '39.108.168.42',
    port: '3306',
    user: 'wangxuan001',
    password: 'Wangxuan_1734',
    database: 'warehouse',
    insecureAuth: true
});

connection.connect();

const Sql = {
    find: function(sql ,params) {
        return new Promise((resolve, reject) => {
            connection.query(sql,params, function (err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows)
            });
        });
    },
    update: function (sql ,params) {
        return new Promise((resolve, reject) => {
            connection.query(sql,params, function (err, rows) {
                if (err) {
                    reject(err);
                }
                resolve(rows)
            });
        });
    }
};

module.exports = Sql;