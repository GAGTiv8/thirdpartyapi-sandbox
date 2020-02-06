function uploadFiles() {
    const formData = new FormData()
    const imagefile = document.querySelector('#gambar')
    console.log(imagefile)
    const name = 'Heri Susanto'
    formData.append('name', name)
    formData.append('image', imagefile.files[0])
    axios
        .post('http://localhost:3000', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
}

$(document).ready(function() {
    console.log('Ready...!')
    $('#upload-file').submit(function(e) {
        e.preventDefault()
        uploadFiles()
    })
})
