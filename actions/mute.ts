import { Api, TelegramClient } from "telegram"
import { NewMessageEvent } from "telegram/events"
import { sleep } from ".."

const mute = async (client: TelegramClient, e: NewMessageEvent, upt: any) => {
    try {

        const m = e.message
        const chatId = m.chatId as import("big-integer").BigInteger
        var message = await client.sendMessage(chatId, { message: "mute command running....." });

        const result = await client.invoke(
            new Api.channels.EditBanned({
              channel: "username",
              participant: "username",
              bannedRights: new Api.ChatBannedRights({
                untilDate: Math.floor(Date.now() / 1000) + (60 * 2), // 2 minutes from now
                viewMessages: true,
                sendMessages: false,
                sendMedia: true,
                sendStickers: true,
                sendGifs: true,
                sendGames: true,
                sendInline: true,
                sendPolls: true,
                changeInfo: true,
                inviteUsers: true,
                pinMessages: true,
              }),
            })
          );

        //   new Api.ChatBannedRights(untilDate: new Date.now(11/11/2022))

    } catch (error: any) {
        console.log("Mute: " + error.message)
    }
}

export default mute