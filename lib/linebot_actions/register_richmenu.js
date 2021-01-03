const line = require('@line/bot-sdk')

const client = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
})

const richmenu = {
  size: {
    width: 2500,
    height: 1686
  },
  selected: false,
  name: "Nice richmenu",
  chatBarText: "タップして登録",
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 2500,
        height: 1686
      },
      action: {
        type: "message",
        text: "押されたよー！"
      }
    }
  ]
}

client.createRichMenu(richmenu)
  .then((richMenuId) =>
  console.log(richMenuId))