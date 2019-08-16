const mongoose = require('mongoose')
const dayjs = require('dayjs')

const { authMiddleware } = require('../lib/jwt')
const { connectToDatabase } = require('../lib/db')

const MessageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date_from: {
    type: Date,
    default: Date.now
  },
  date_to: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Object
  },
  likes: {
    type: Array
  },
  hidefor: {
    type: Array
  },
  role: {
    type: Array,
    required: true
  }
})

const Message = mongoose.model('Message', MessageSchema)

const createHelper = ({
  title = '',
  text = '',
  role = [],
  date_from,
  date_to,
  user
}) => ({
  title,
  text,
  role,
  date_from: dayjs(date_from).toDate(),
  date_to: date_to
    ? dayjs(date_to).toDate()
    : dayjs()
        .add(7, 'day')
        .toDate(),
  user
})

module.exports = authMiddleware(async (req, res) => {
  try {
    await connectToDatabase()
    const { cn, mail, userId } = req.user
    if (req.method === 'POST') {
      const params = createHelper({
        ...req.body,
        user: {
          cn,
          mail
        }
      })
      const item = await new Message(params).save()
      return res.json(item)
    }
    if (req.method === 'PUT') {
      const item = await Message.findOne({ _id: req.query.id })
      const { title, text, date_from, date_to, role } = req.body
      item.title = title
      item.text = text
      item.date_from = dayjs(date_from).toDate()
      item.date_to = dayjs(date_to).toDate()
      item.role = role
      await item.save()
      return res.json(item)
    }
    if (req.method === 'DELETE') {
      const item = await Message.findOne({ _id: req.query.id })
      await item.remove()
      return res.json(item)
    }
    const { roles, limit = 20, offset = 0 } = req.query
    const usedRoles = roles ? roles.split('|') : req.user.roles
    const usedLimit = limit + 1
    const data = await Message.find({
      role: {
        $in: usedRoles
      },
      hidefor: {
        $ne: userId
      }
    })
      .skip(parseInt(offset))
      .limit(parseInt(usedLimit))
      .sort({ date_from: -1 })
    res.json({
      hasNextPage: data.length === usedLimit,
      items: data.filter((item, i) => i < limit)
    })
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
