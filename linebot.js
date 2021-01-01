const express = require('express')
const line = require('@line/bot-sdk')

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret:  process.env.LINE_CHANNEL_SECRET
}

const client = new line.Client(config)
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
})

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text event
    return Promise.resolve(null)
  }

  const echo = { type: 'text', text: event.message.text }

  return client.replyMessage(event.replyToken, echo)
}

const port = 3000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
