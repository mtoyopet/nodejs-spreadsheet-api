require('dotenv').config()
const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const TOKEN_PATH = 'token.json'

module.exports = async (text) => {
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err)
    authorize(JSON.parse(content), addData)
  })

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0])

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback)
      oAuth2Client.setCredentials(JSON.parse(token))
      callback(oAuth2Client)
    })
  }

  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    })
    console.log('Authorize this app by visiting this url:', authUrl)
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close()
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err)
        oAuth2Client.setCredentials(token)
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err)
          console.log('Token stored to', TOKEN_PATH)
        })
        callback(oAuth2Client)
      })
    })
  }


  async function addData(auth, text) {
    try {
      const sheets = google.sheets({ version: 'v4' })
      const params = {
        spreadsheetId: process.env.SPREAD_SHEET_ID,
        range: 'シート1!A3',
        valueInputOption: 'USER_ENTERED',
        auth: auth,
        resource: {
          values: [[text]]
        }
      }
      const response = await sheets.spreadsheets.values.append(params)
      console.log({ response })
    } catch (error) {
      console.log({ error })
    }
  }
}

// function listMajors(auth) {
//   const sheets = google.sheets({version: 'v4', auth})
//   sheets.spreadsheets.values.get({
//     spreadsheetId: process.env.SPREAD_SHEET_ID,
//     range: 'A1:B2',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err)
//     const rows = res.data.values
//     if (rows.length) {
//       rows.map((row) => {
//         console.log(`${row[0]}, ${row[1]}`)
//       })
//     } else {
//       console.log('No data found.')
//     }
//   })
// }