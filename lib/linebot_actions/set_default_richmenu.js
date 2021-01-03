require('dotenv').config()
const line = require('@line/bot-sdk')

const client = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
})

client.setDefaultRichMenu(process.env.LINE_RICH_MENU_ID)
  .then(res => {
    console.log('default rich menu successfully set')
    console.log({ res })
  })
  .catch(error => {
    console.log({ error })
  })