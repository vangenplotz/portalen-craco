const mongoose = require('mongoose')

const { authMiddleware } = require('../../lib/jwt')
const { getRoles } = require('../../lib/infoData')
const { connectToDatabase } = require('../../lib/db')

const MessageSubscriptionSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
})

const MessageSubscription = mongoose.model(
  'MessageSubscription',
  MessageSubscriptionSchema
)

function customizeRoles(items, userSubscription, roles) {
  return items.map(item => {
    if (roles.find(id => item.id === id)) {
      return { ...item, subscription: true, required: true }
    }
    return {
      ...item,
      subscription: !!userSubscription.find(hidden => hidden.role === item.id)
    }
  })
}

module.exports = authMiddleware(async (req, res) => {
  try {
    await connectToDatabase()
    const { userId } = req.user
    if (req.method === 'POST') {
      const { role } = req.body
      const item = await new MessageSubscription({
        user: userId,
        role
      }).save()
      return res.json(item)
    }
    if (req.method === 'DELETE') {
      const item = await MessageSubscription.findOne({
        role: req.query.id,
        user: userId
      })
      await item.remove()
      return res.json(item)
    }
    const subscriptions = await MessageSubscription.find({ user: userId })
    const data = await getRoles()
    res.json(customizeRoles(data, subscriptions, req.user.roles))
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
