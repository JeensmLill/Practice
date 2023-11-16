const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/news-publish')
        .then((res) => {
            console.log('connect MongoDB successfully')
        })
        .catch((err) => {
            console.log('fail to connect MongoDB:', err)
        })
}

module.exports = {
    connectDB
}