import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { balance, statusDeposit, createDeposit } from "../controller/getProfile.js";


const messageResponse = async (message) => {
    let response;
    let messageData = message.body.toLocaleLowerCase();
    switch (messageData) {
        case "cek saldo":
            response = await balance();
            message.reply(response.data.balance);
            break;

        case "status":
            response = await statusDeposit();
            message.reply("Anu");
            break;

        case "isi saldo":
            response = await createDeposit();
            message.reply("asu")
            break;

        default: message.reply(`Tidak Sesuai Format !`)
            break;
    };
}


export const start = () => {
    const whatsapp = new Client();

    whatsapp.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    })

    whatsapp.on('ready', () => {
        console.log('ready');
    })

    whatsapp.on('message_create', messageResponse("cek saldo"));
    whatsapp.on('message_create', messageResponse("status"));
    whatsapp.on('message_create', messageResponse("cek saldo"));

    whatsapp.initialize();
};