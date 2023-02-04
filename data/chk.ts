import { TelegramClient } from "telegram"
import { message } from "telegram/client"
import { NewMessageEvent } from "telegram/events"
import { sleep } from ".."
import { Upt } from "../helpers"

const settings = async (client: TelegramClient, e: NewMessageEvent, upt: Upt) => {
    try {

        const m = e.message
        const chatId = m.chatId as import("big-integer").BigInteger
        // var message = await client.sendMessage(chatId, { message: "settings command running....." });

        let cmd: number;
        if (upt.strt == '/') {
            cmd = 1;
        } else {
            cmd = 0;
        }
        const matches = (m.message).match(new RegExp(`\\b\\d{${9}}\\b`));
        if ((matches && matches.length ? matches[0] : undefined) ) {
            console.log('have id 9')
        }
        else if (m.entities != null && m.entities[1]) {

            const me: any = m.entities
            // console.log(me[cmd].className)
            
            if (me[cmd].className == "MessageEntityMentionName") {
                console.log('mention name')
            }
            else if (me[cmd].className == "MessageEntityMention") {
                console.log('mention')
            }
            else if (me[cmd].className == "MessageEntityPhone") {
                console.log('have id 10')
            } else {
                console.log("Please enter correct id")
                console.log(me)
            }
        }
         else if(m.replyTo != null){
            console.log("Replied Message")
        } else {
            console.log("Please give any user preference")
        }

    } catch (error: any) {
        console.log("CHK: " + error.message)
    }
}

export default settings