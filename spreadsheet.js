require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = async (text) => {
  async function accessSpreadSheet () {
    try {
      const document = new GoogleSpreadsheet(process.env.SPREAD_SHEET_ID)

      await document.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL.replace(/\\n/g, '\n'),
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      })

      await document.loadInfo()
      const sheet = document.sheetsByIndex[0]
      await sheet.addRow([text])
    } catch (error) {
        console.log({ error })
    }
  }
  accessSpreadSheet()
}

