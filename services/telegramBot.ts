const chatId = '-1001763461346'
const now = new Date().toLocaleString('vi-VN', {
  timeZone: 'Asia/Saigon',
})

async function sendText(msg: string) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chat_id: chatId, text: `${now}: ${msg}` }),
  })
  const result = await response.json()
  return result
}

async function sendPhoto(img: string) {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chat_id: chatId, photo: img }),
  })
  const result = await response.json()
  return result
}

export const TeleBOT = {
  sendText,
  sendPhoto,
}
