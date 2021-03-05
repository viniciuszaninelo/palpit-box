
import { GoogleSpreadsheet } from 'google-spreadsheet'


const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const fromBase64 = value => {
  const buff = new Buffer(value, 'base64');
  return buff.toString('ascii');
}

export default async (req, res) => {
  console.log(fromBase64(process.env.SHEET_PRIVATE_KEY))
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: (fromBase64(process.env.SHEET_PRIVATE_KEY))
    })
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A3:B3')

    const mostrarPromocaocell = sheet.getCell(2, 0)
    const textocell = sheet.getCell(2, 1)

    res.end(JSON.stringify({
      showCoupon: mostrarPromocaocell.value === 'VERDADEIRO',
      message: textocell.value
    }))


  } catch (err) {
    res.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }))
  }



}