import { NewMessageEvent } from "telegram/events"
import { NewMessage } from "telegram/events/NewMessage"
import actions from "./actions"

const start = async (client: any, upt: any) => {
    try {
        let aa = true;
        const handler = async (event: NewMessageEvent) => {
            
            // Declarations
            const e = event;
            const m = event.message;
            const cid = m.chatId as import("big-integer").BigInteger;
            const mm = JSON.parse(JSON.stringify(event.message));
            const strt = '*'

            if ((m.out === true || mm.fromId.userId == 1791106582) && m.message.startsWith(strt)) {
                try {
                    if (aa) {
                        aa = false;
                        await actions(client, e, upt)
                        aa = true;
                    }
                } catch (err) { console.log(err); }
            }

        };

        client.addEventHandler(handler, new NewMessage({}));

    } catch (error: any) {
        console.log(`Start: ${error.message}`)
    }
}

export default start