var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Wangxuan1734',
    database: 'admin'
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