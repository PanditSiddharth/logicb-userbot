import { TelegramClient } from "telegram"
import { NewMessage, NewMessageEvent } from "telegram/events"

const unmute =async (client: TelegramClient, e: NewMessageEvent, upt : any) => {
    try {
        const m = e.message
        const chatId = m.chatId as import("big-integer").BigInteger

        var message = await client.sendMessage(chatId, { message: "unmute command running....." });
    } catch (error: any) {
            console.log("UnMute: " + error.message)
    }
}

export default unmute