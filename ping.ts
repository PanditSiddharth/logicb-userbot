import { Api, TelegramClient } from "telegram";
import { Upt } from "./helpers";
import Chk from "./helpers/chk";

const ping = async (client: TelegramClient, e: any, upt:Upt ) =>{
      // console.log(m.peerId)
  const m = e.message
      try {
        const y = new Chk(client,e, upt)

await y.edit(`
  .╭╮╱╱╱╱╱╱╱╱╭━━╮
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
  `)

      } catch (err) { console.log(err) }
    
  }
  export default ping
  