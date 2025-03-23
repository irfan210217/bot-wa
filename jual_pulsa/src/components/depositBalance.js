import { balance, createDeposit, statusDeposit } from "../services/getData.service.js";
import { islowerCase } from "../utils/lower_upper-case.js"
import { spliter } from "../utils/spliter.js";

let api_key = "sk-m44p8iixh8fo2m";
let signatureId = `signID${Math.random().toString(36).substring(2, 10)}`;


const balanceCheck = () => {
    return new Promise((resolve, reject) => {
        balance({ api_key, signatureId }, (result) => {
            if (result.status === 404) return reject(result.response.data)
            return resolve(result)
        });
    })
};
;

const topUpBalance = (nominal) => {
    let reff_id = `deposit-${Math.random().toString(36).substring(2, 10)}`;

    return new Promise((resolve, reject) => {
        createDeposit({ nominal, reff_id, api_key }, (result) => {
            if (result.status === 404) return reject(result.response.data)
            return resolve(result);
        });
    })
};

const statusBalance = () => {
    return new Promise((resolve, reject) => {
        statusDeposit({ api_key, signatureId }, (result) => {
            if (result.status === 404) return reject(result.response.data)
            return resolve(result)
        })
    })
};


export const messageResponse = async (message) => {
    try {
        let response;
        let lowerCase = islowerCase(message.body);
        let messageData = spliter(lowerCase);
        switch (messageData[0]) {
            case "cek saldo":
                response = await balanceCheck();
                message.reply(JSON.stringify(response));
                break;
            case "status":
                response = await statusBalance();
                message.reply(JSON.stringify(response));
                break;

            case "isi saldo":
                response = await topUpBalance(parseInt(messageData[1]));
                message.reply(JSON.stringify(response));
                break;
                
            default: "Tidak Sesuai Format !"
                break;
        };
    } catch (error) {
        console.log(error);
    }
};