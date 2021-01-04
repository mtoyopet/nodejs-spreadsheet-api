require('dotenv').config()
const line = require('@line/bot-sdk')
const fs = require('fs')

const client = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
})

client.setRichMenuImage(process.env.LINE_RICH_MENU_ID, fs.createReadStream('./images/richmenu.jpg'))
  .then(res => {
    console.log("rich menu image successfully uploaded")
    console.log({ res })
  })
  .catch(error => {
    console.log({ error })
  })
