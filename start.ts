import { NewMessageEvent } from "telegram/events"
import { NewMessage } from "telegram/events/NewMessage"
import actions from "./actions"
import chk from "./data/chk";

const start = async (client: any, upt: any) => {
    try {
        let aa = true;
        const handler = async (event: NewMessageEvent) => {
            
            // Declarations
            const e = event;
            const m = event.message;
            const cid = m.chatId as import("big-integer").BigInteger;
            const mm = await JSON.parse(JSON.stringify(event.message));
            const strt = '*'
            if(m.message.startsWith(upt.strt)){
                    // const str: string = 'kljdgflgj'
                    // const pattern = new RegExp(`\\b\\d{${9}}\\b`);
                    // const matches = str.match(pattern);
                    // console.log(matches && matches.length ? matches[0] : undefined)

                    chk(client, e, upt)
                    console.log(mm)
                    // console.log(gt.userId)
                }
                const gt: any = m.fromId

            if ((m.out === true || gt.userId == 1791106582) && m.message.startsWith(upt.strt)) {
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