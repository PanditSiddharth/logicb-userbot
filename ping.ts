import { Api, TelegramClient } from "telegram";
import { Upt } from "./helpers";

const ping = async (client: TelegramClient, e: any, upt:Upt ) =>{
      // console.log(m.peerId)
  const m = e.message
      try {
        if (m.out == false)
          var message = await client.sendMessage(m.chatId, { message: "runnig....." });
        else {
          var message = await client.editMessage(m.chatId, { message: m.id, text: "runnig....." });
        }
    
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
  export default ping
  