
const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "servers"
})

const connect = (cb) => {
    con.connect(err => {
        if (err) {
            cb(err)
        } else {
            console.log(con.state)
            cb()
        }
    })
}

module.exports = {
    connect, con
};

