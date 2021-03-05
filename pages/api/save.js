import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'
import { fromBase64 } from '../../utils/base64'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const genCupom = () => {
  const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
  return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
    })

    await doc.loadInfo()
    console.log(doc.title())
    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A3:B3')

    const mostrarPromocaoCell = sheetConfig.getCell(2, 0)
    const textCell = sheetConfig.getCell(2, 1)

    let Cupom = ''
    let Promo = ''
    if (mostrarPromocaoCell.value === 'VERDADEIRO') {
      // TODO: gerar Cupom 
      Cupom = genCupom()
      Promo = textCell.value
    }

    //Nome:	Email:	Whatsapp:	Cupom:	Promo:
    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Nota: parseInt(data.Nota),
      Sugestao: data.Sugestao,
      'Data preenchimento': moment().format('DD/MM/YYYY HH:mm:ss'),
      Cupom,
      Promo
    })
    res.end(JSON.stringify({
      showCoupon: Cupom !== '',
      Cupom,
      Promo
    }))
  } catch (err) {
    console.log(err)
    res.end(err)
  }
}