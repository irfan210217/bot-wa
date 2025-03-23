import { Client } from "whatsapp-web.js";
import fs from "fs";
import a from "qrcode-terminal";
import qrcode from "qrcode";
import { messageResponse } from "../src/components/depositBalance.js"

export const start = async (req, res) => {
    const whatsapp = new Client();

    whatsapp.on('qr', (qr) => {
        let code = qrcode.toFile("./app/images/qrcode.png", qr)
        fs.createReadStream('./app/images/qrcode.png').pipe(res)
    })

    whatsapp.on('ready', () => {
        res.redirect('/');
        res.send("success");
    })

    whatsapp.on('message_create', messageResponse);

    whatsapp.initialize();
};