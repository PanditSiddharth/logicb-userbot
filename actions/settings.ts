import { TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from ".."
import { Upt } from "../helpers"

const settings = async (client: TelegramClient, e: NewMessageEvent, upt: Upt) => {
    try {

        // const m = e.message
        // const chatId = m.chatId as import("big-integer").BigInteger
        // var message = await client.sendMessage(chatId, { message: "settings command running....." });

    } catch (error: any) {
        console.log("settings: " + error.message)
    }
}

export default settings