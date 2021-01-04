require('dotenv').config()
const line = require('@line/bot-sdk')

const client = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
})

const richmenu = {
  size: {
    width: 2500,
    height: 843
  },
  selected: true,
  name: "default rich menu",
  chatBarText: "メニュー",
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 2500,
        height: 843
      },
      type: "bubble", // ①
      body: { // ②
        type: "box", // ③
        layout: "horizontal", // ④
        contents: [ // ⑤
          {
            type: "text", // ⑥
            text: "Hello,"
          },
          {
            type: "text", // ⑥
            text: "World!"
          }
        ]
      }
    }
  ]
}

client.createRichMenu(richmenu)
  .then((richMenuId) =>
  console.log(richMenuId))