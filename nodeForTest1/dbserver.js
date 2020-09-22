const cors = require('cors')
const express = require('express')
const db = require('./dbmysql')
const app = express()

app.use(cors())

app.use(express.static("public"))
app.use(express.json())


db.connect((err => {
    if (err) {
        console.log('DB eroor', err)
        process.exit(1)
    } else {
        app.listen(3010, () => {
            console.log('SERVERs runing on port 3010')
        })
    }
}))

app.get('/servers/', (req, res) => {
    db.con.query('SELECT * FROM servers', (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})



app.post('/servers/:id', (req, res) => {
    db.con.query(`UPDATE  servers  SET serverStatus = not serverStatus WHERE serverID = ${req.params.id}`, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})




// i dont know why this thing is not wroking it gives me a bug that i wasted a lot of time 
// trying to solve

// code: 'ER_BAD_FIELD_ERROR',
// errno: 1054,
// sqlMessage: "Unknown column 'active' in 'where clause'",
// sqlState: '42S22',
// index: 0,
// sql: 'SELECT * FROM servers WHERE serverID = active'
// }

// app.get('/servers/active', (req, res) => {
//     db.con.query(' SELECT * FROM servers WHERE serverStatus = 1', (err, result) => {
//         if (err) throw err;
//         res.json(result)
//     })
// })

