import { TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from ".."

const info =async (client:TelegramClient, e: NewMessageEvent, upt : any) => {
    try {
        
    const m = e.message
    const chatId = m.chatId as import("big-integer").BigInteger
    var message = await client.sendMessage(chatId, { message: "info command running....." });
} catch (error: any) {
        console.log("info: " + error.message)
}
}

export default info