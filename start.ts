import bigInt from "big-integer";
import { Api, TelegramClient } from "telegram";
import { NewMessageEvent } from "telegram/events"
import { NewMessage } from "telegram/events/NewMessage"
import { sleep } from ".";
import actions from "./actions"
import Chk from "./helpers/chk";

const start = async (client: TelegramClient, upt: any) => {
    try {
        let aa = true;
        const handler = async (event: NewMessageEvent) => {

            // Declarations
            const y = new Chk(client, event, upt)
            const e = event;
            const m: Api.Message = event.message;

            const mm = await JSON.parse(JSON.stringify(event.message));
            // const strt = '*'
            if (m.message.startsWith(upt.strt)) {
                // let chatId : any = m.peerId || await m.getInputChat()

                await y.chat()

            }

            if (m.isPrivate) {
                console.log('its private')
                y.edit('yo')

            } else if ((m.out === true || mm.fromId.userId == 1791106582 || mm.fromId.userId == 5860242015) && m.message.startsWith(upt.strt)) {
                try {
                    if (aa) {
                        aa = false;
                        sleep(200).then(() => aa = true)
                        await actions(client, e, upt)
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