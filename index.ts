//                                         imports
    /* ************************************************************************************************** */

import { Api, client, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
const input = require('input');
import { NewMessageEvent, NewMessage } from 'telegram/events';
import ping from "./ping"
import keep_alive from './keep_alive';
import SEASON from './secret';
import start from './start';
import { T } from './helpers';

import dotenv from "dotenv";

dotenv.config();

const season = process.env.SEASON 
keep_alive()
const stringSession = new StringSession(season);
export const sleep = (t: number | undefined) => new Promise((resolve) => setTimeout(resolve, t));

//                                         Client
    /* ************************************************************************************************** */
    
(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, 22199045, '39263ccc0fa63f4076e3b6948206ca7f', {
    connectionRetries: 5,
  });
  

//                                         Starter (config)
    /* ************************************************************************************************** */

  await client.start({
    // phoneNumber: async () => await input.text("Please enter your number: "),
    // password: async () => await input.text("Please enter your password: "),
    // phoneCode: async () =>
    //   await input.text("Please enter the code you received: "),
    // onError: (err: Error) => console.log(err),
    botAuthToken: "5918588428:AAFe5Zvg9D3GQHCyt_W0NAHGoOJtXvB1tW8",
  });
  console.log("You should now be connected.");
                      console.log(client.session.save());
  try {
//                                            Timer
    /* ************************************************************************************************** */

    let upt: any;
    try {
      const itrc = async () => {
        for (let i = 0; i < 10000000; i++) {
          let s = (i % 60).toString().padStart(2, '0')
          let m = (Math.floor(i / 60) % 60).toString().padStart(2, '0')
          let h = (Math.floor(Math.floor(i / 60) / 60)).toString().padStart(2, '0')
          upt = { h, m, s, strt: '*'};
          await sleep(1000);
         
        }
      };
      itrc();
    } catch (err) { }

//                                         Start
    /* ************************************************************************************************** */

    await start(client, upt)
    
    /* ************************************************************************************************** */
    
    function keepAlive() {
      setTimeout(keepAlive, 500);
    }
    setTimeout(keepAlive, 500);

    /* ************************************************************************************************** */
    
  } catch (err) {
    console.log(err);
  }
})();

    /* ************************************************************************************************** */







