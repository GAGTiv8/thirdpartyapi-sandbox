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
})

app.get('/trends', (req, res) => {
    const token =
        'AAAAAAAAAAAAAAAAAAAAAJV7CQEAAAAAm6NIjWb%2BhDhGjGl8V4zgqVs9L14%3DMNNxR1ThsEXtvOJBJ3RnTQV3pt41dlU1TTJRs0pPemJ4JQnBs6'
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    axios
        .get('https://api.twitter.com/1.1/trends/place.json?id=1', config)
        .then(result => {
            res.send(result.data[0].trends)
            // res.send(result)
        })
        .catch(err => {
            console.log(err)
            // res.status(404)
        })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
