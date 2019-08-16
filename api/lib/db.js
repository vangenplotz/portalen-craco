const mongoose = require('mongoose')
mongoose.Promise = global.Promise

let cachedDb = null

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb
  }
  const db = await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true
  })
  cachedDb = db
  return db
}

module.exports = {
  connectToDatabase
}
