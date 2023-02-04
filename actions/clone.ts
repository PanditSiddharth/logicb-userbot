import bigInt, { BigInteger } from "big-integer";
import { Api, TelegramClient } from "telegram";
import { CustomFile } from "telegram/client/uploads";
import { NewMessageEvent } from "telegram/events"
import * as fs from 'fs';
import { sleep } from "..";

const clone = async (client: TelegramClient, e: NewMessageEvent, upt: any) => {
    try {
        const m = e.message
        const chatId = m.chatId as import("big-integer").BigInteger
        if (m.message.includes("s") || m.message.includes("save")) {
            const msgg: any = m
            const uidd: any = m.fromId
            const id: any = uidd.userId
            const msg: any = await client.getEntity(uidd.userId)
            const name = msg.firstName + (msg.lastName != null ? ' ' + msg.lastName : '')
            const username = msg.username
            const me = {
                name, username, fromId: { userId: id }, id, firstName: msg.firstName, lastName: msg.lastName
            }

            try {
                await client.editMessage(chatId, { message: m.id, text: "Saving user data....." });
                const buf: any = await client.downloadProfilePhoto(id)

                const dataString = JSON.stringify(me, null, 2);
                fs.writeFileSync('data.txt', dataString);
                if (buf.length > 11) {
                    fs.writeFileSync("./m.png", buf);
                } else {
                    fs.unlinkSync('./m.png')
                }
                return client.editMessage(chatId, { message: m.id, text: 'Your current state has been stored and previous save deleted' })

            } catch (error) {
                console.error(error);
            }
            return
        }

        if (m.message.includes('r') || m.message.includes("retrieve")) {
            try {
                const fileData = fs.readFileSync('./data.txt', 'utf-8');
                const me = JSON.parse(fileData);

                await client.editMessage(chatId, { message: m.id, text: "Retriving previous state of name: " + me.firstName });

                await sleep(100)
                await client.editMessage(chatId, { message: m.id, text: "Updating info....." });
                const relt = await client.invoke(
                    new Api.account.UpdateProfile({
                        firstName: me.firstName,
                        lastName: me.lastName ? me.lastName : '',
                        about: (me.firstName + (me.lastName ? " " + me.lastName : '')),
                    })
                );

                if (me.username != null) {
                    try { await client.invoke(new Api.account.UpdateUsername({ username: me.username + '0' })) } catch (error: any) {
                        try { await client.invoke(new Api.account.UpdateUsername({ username: me.username + '1' })) } catch (r: any) {
                            try { await client.invoke(new Api.account.UpdateUsername({ username: me.username + '456' })) } catch (err) {
                                try { await client.invoke(new Api.account.UpdateUsername({ username: '' })) } catch (eor: any) {
                                    console.log(eor)
                                    client.sendMessage(me.id, { message: eor.message })
                                }
                            }
                        }
                    }
                } else {
                    try { await client.invoke(new Api.account.UpdateUsername({ username: '' })) } catch (eor) {
                        console.log(eor)
                    }
                }
                await sleep(500)
                await client.editMessage(chatId, { message: m.id, text: "Removing old pic....." });
                const result = await client.invoke(
                    new Api.photos.UpdateProfilePhoto({
                        id:
                            new Api.InputPhoto({
                                id: bigInt(),
                                accessHash: bigInt(),
                                fileReference: Buffer.from("arbitrary data here"),
                            }),
                    })
                );
                try {
                    await sleep(200)
                    await client.editMessage(chatId, { message: m.id, text: "Uploading new pic....." });
                    const toUpload = new CustomFile("m.png", fs.statSync("./m.png").size, "./m.png");

                    const res = await client.invoke(
                        new Api.photos.UploadProfilePhoto({
                            file: await client.uploadFile({
                                file: toUpload,
                                workers: 1,
                            })
                        })
                    );
                    await sleep(200)
                    await client.editMessage(chatId, { message: m.id, text: "Retrieve profile successfull: User " + me.firstName + "\nLogic.B Userbot" });
                } catch (err) { }

            } catch (error) {
                console.error(error);
            }
            return
        }

        if(m.replyTo == null){
            let msr : any = m.fromId
            return client.sendMessage(msr.userId, { message: "Please reply to user" })
        }
        const replied: any = await m.getReplyMessage()
        const me: any = await client.getEntity(replied.fromId.userId)

        await client.editMessage(chatId, { message: m.id, text: "Clonning user: " + ((me.username != null) ? "@" + me.username : me.firstName) });

        const reult = await client.invoke(
            new Api.messages.SetTyping({
                peer: chatId,
                action: new Api.SendMessageTypingAction(),
                topMsgId: 43,
            })
        );

        await client.editMessage(chatId, { message: m.id, text: "Checking user pic....." });
        const buf: any = await client.downloadProfilePhoto(replied.fromId.userId)

        await sleep(1000)
        await client.editMessage(chatId, { message: m.id, text: "Updating info....." });
        const relt = await client.invoke(
            new Api.account.UpdateProfile({
                firstName: me.firstName,
                lastName: me.lastName ? me.lastName : '',
                about: (me.firstName + (me.lastName ? " " + me.lastName : '')),
            })
        );
        console.log(typeof me.username)
        if (me.username != null) {
            let usrr: string = me.username + '0'
            console.log(typeof (me.username + '1'))
            console.log(typeof (me.username + '456'))

            try { await client.invoke(new Api.account.UpdateUsername({ username: (me.username + '0') })) } catch (error: any) {
                try { await client.invoke(new Api.account.UpdateUsername({ username: (me.username + '1') })) } catch (r: any) {
                    try { await client.invoke(new Api.account.UpdateUsername({ username: (me.username + '456') })) } catch (err) {
                        try { await client.invoke(new Api.account.UpdateUsername({ username: '' })) } catch (eor: any) {
                            console.log(eor)
                            client.sendMessage(me.id, { message: eor.message })

                        }
                    }
                }
            }
        } else {
            try { await client.invoke(new Api.account.UpdateUsername({ username: '' })) } catch (eor) {
                console.log(eor)
            }
        }

        await sleep(500)

        await client.editMessage(chatId, { message: m.id, text: "Removing old pic....." });
        const result = await client.invoke(
            new Api.photos.UpdateProfilePhoto({ id: new Api.InputPhoto({ id: bigInt(), accessHash: bigInt(), fileReference: Buffer.from("arbitrary data here"), }), })
        );

        if (buf.length > 11) {
            await sleep(200)
            await client.editMessage(chatId, { message: m.id, text: "Uploading new pic....." });
            fs.writeFileSync("./r.png", buf);
            const toUpload = new CustomFile("r.png", fs.statSync("./r.png").size, "./r.png");

            const res = await client.invoke(
                new Api.photos.UploadProfilePhoto({
                    file: await client.uploadFile({
                        file: toUpload,
                        workers: 1,
                    })
                })
            );
        }
        await sleep(200)
        await client.editMessage(chatId, { message: m.id, text: "Clonning successfull: User " + me.firstName + "\nLogic.B Userbot" });
        await client.deleteMessages(chatId, [454], {revoke: false})
    } catch (error: any) {
        console.log("clone: " + error.message)
    }
}

export default clone