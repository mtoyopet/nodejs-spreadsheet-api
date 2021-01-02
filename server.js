'use strict'

const line = require('@line/bot-sdk')
const express = require('express')
const spreadSheet = require('./spreadsheet.js')

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config)
const app = express()

// const richMenu = {
//   size: {
//     width: 2500,
//     height: 1686
//   }
// }

// client.createRichMenu(richMenu)
//   .then((richMenuId) => {
//     console.log(111111111)
//     console.log(richMenuId)
//   })

app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })
})

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null)
  }

  const echo = { type: 'text', text: event.message.text }
  spreadSheet(event.message.text)
  return client.replyMessage(event.replyToken, echo)
}

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
