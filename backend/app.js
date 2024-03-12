const express = require ('express')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.get('/api/test', (_, res) => {
    res.send({
        msg: 'Bonjour les amis !'
    })
})

app.listen(PORT, () => {
    console.log(`port : ${PORT}`);
})
