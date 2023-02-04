import { TelegramClient } from "telegram";
import { deleteMessages } from "telegram/client/messages";
import { NewMessageEvent } from "telegram/events";
import { DeletedMessageEvent } from "telegram/events/DeletedMessage";
import ban from "./actions/ban";
import mute from "./actions/mute"
import info from "./actions/info";
import unmute from "./actions/unmute"
import { Upt } from "./helpers";
import help from "./actions/help";
import kick from "./actions/kick";
import unban from "./actions/unban";
import clone from "./actions/clone";

const actions = async (client: TelegramClient, e: NewMessageEvent, upt: Upt) => {
    try {
        // Declarations
        const m = e.message
        const chatId = m.chatId as import("big-integer").BigInteger

        // var message = await client.sendMessage(chatId, { message: "runnig....." });

        if (m.message.includes(upt.strt + 'mute'))
            await mute(client, e, upt)

        if (m.message.includes(upt.strt + 'unmute'))
            await unmute(client, e, upt)

        if (m.message.includes(upt.strt + 'info'))
            await info(client, e, upt)

        if (m.message.includes(upt.strt + 'ban'))
            await ban(client, e, upt)

        if (m.message.includes(upt.strt + 'help'))
            await help(client, e, upt)

        if (m.message.includes(upt.strt + 'kick'))
            await kick(client, e, upt)

        if (m.message.includes(upt.strt + 'unban'))
            await unban(client, e, upt)

        if (m.message.includes(upt.strt + 'clone'))
            await clone(client, e, upt)

    } catch (error: any) {
        console.log(`Actions: ${error.message}`)
    }
}

export default actions