import { TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from ".."

const mute =async (client:TelegramClient, e: NewMessageEvent, upt : any) => {
    try {
        
    const m = e.message
    const chatId = m.chatId as import("big-integer").BigInteger
    var message = await client.sendMessage(chatId, { message: "mute command running....." });
} catch (error: any) {
        console.log("Mute: " + error.message)
}
}

export default mute