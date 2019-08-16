const { authMiddleware } = require('../../lib/jwt')
const { connectToDatabase } = require('../../lib/db')
const mongoose = require('mongoose')

const UserLinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
})

const UserLink = mongoose.model('UserLink', UserLinkSchema)

module.exports = authMiddleware(async (req, res) => {
  try {
    await connectToDatabase()
    const user = req.user.userId
    if (req.method === 'POST') {
      const { title, url } = req.body
      const item = await new UserLink({
        user,
        title,
        url
      }).save()
      return res.json(item)
    }
    if (req.method === 'PUT') {
      const { title, url } = req.body
      const item = await UserLink.findOne({ _id: req.query.id, user })
      item.title = title
      item.url = url
      await item.save()
      return res.json(item)
    }
    if (req.method === 'DELETE') {
      const item = await UserLink.findOne({ _id: req.query.id, user })
      await item.remove()
      return res.json(item)
    }
    const data = await UserLink.find({ user })
    res.json(data)
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
