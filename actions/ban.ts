
import { TelegramClient } from "telegram";
import { TelegramBaseClient } from "telegram/client/telegramBaseClient";
import { NewMessage, NewMessageEvent } from "telegram/events"

const ban =async (client: TelegramClient, e: NewMessageEvent, upt : any) => {
    try {
        const m = e.message
        const chatId = m.chatId as import("big-integer").BigInteger

        var message = await client.sendMessage(chatId, { message: "ban command running....." });
    } catch (error: any) {
            console.log("ban: " + error.message)
    }
}

export default ban