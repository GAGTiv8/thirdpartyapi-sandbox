const express = require('express')
const cors = require('cors')
const fs = require('fs')
const axios = require('axios')

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file)
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64')
}

const app = express()

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({ storage })
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hai')
})

app.post('/', upload.single('image'), function(req, res, next) {
    // console.log(req.file)

    // var request = require('request')
    // var options = {
    //     method: 'POST',
    //     url: 'https://api.imgur.com/3/image',
    //     headers: {
    //         Authorization: 'Client-ID {{clientId}}'
    //     },
    //     formData: {
    //         image: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    //     }
    // }

    const options = {
        headers: { Authorization: 'Client-ID 5da6ca0a43b0e11' }
    }

    const image = base64_encode(req.file.path)

    axios
        .post('https://api.imgur.com/3/image', image, options)
        .then(result => {
            console.log(result.data.data.link)
            res.send(result.data.data.link)

            // res.send(result)
        })
        .catch(err => {
            console.log(err)
            res.send('Error!')
        })

    // const base = base64_encode(req.file.path)

    // res.send(base)

    // res.status(201).json({ msg: 'OK' })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
