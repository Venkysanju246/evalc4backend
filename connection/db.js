const mongoose = require("mongoose")
require("dotenv").config()
const connectiontodb = mongoose.connect(process.env.mongourl)

module.exports = connectiontodb