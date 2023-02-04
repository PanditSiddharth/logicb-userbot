import { TelegramClient } from "telegram";

const ping = async (client: TelegramClient, m: any, upt: { s: any; m: any; h: any; }, sleep: (t: number | undefined) => Promise<unknown>) => {
    if (m.message == ".ping" && (m.out == true || m.fromId.userId.value == 1791106582)) {
      console.log(m.peerId)
  
      try {
        if (m.out == false)
          var message = await client.sendMessage(m.chatId, { message: "runnig....." });
        else {
          var message = await client.editMessage(m.chatId, { message: m.id, text: "runnig....." });
        }
        m.re
        await client.editMessage(m.chatId, {
          message: message.id, text: `
  ╭╮╱╱╱╱╱╱╱╱╭━━╮
  ┃┃╱╱╱╱╱╱╱╱┃╭╮┃
  ┃┃╱╱┳━━┳━━┃╰╯╰╮
  ┃┃╱╭┃╭╮┫╭━┃╭━╮┃
  ┃╰━╯┃╰╯┃╰━┫╰━╯┃
  ╰━━━┻╮━┻━━┻━━━╯
  ╱╱╱╭━╯┃
  ╱╱╱╰━━╯
  
  💓 PONG! Your Logic.B userbot is ready.
  💓 𝗨𝗽𝘁𝗶𝗺𝗲 👉 ${upt.h + ' : ' + upt.m + ' : ' + upt.s}
  ━━━━━━━━━━━━━━━━━━━━━━
  ` })
      } catch (err) { console.log(err) }
    }
  }
  export default ping
  