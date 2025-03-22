import axios from "axios";
import { convertToRupiah as convert } from "convert-to-rupiah"

let baseURL;
let request = {};
const requestData = {};

requestData.post = (baseURL, request, signatureId) => {
    let response = axios.post(baseURL, request);
    return response;
};

requestData.get = (baseURL, request) => {
    let response = axios.get(baseURL)
    return response;
};



export const createDeposit = async (req, res) => {
    let { nominal, reff_id, api_key } = req.body;
    baseURL = "https://forestapi.web.id/api/h2h/deposit/create";

    request.phone_number = "";
    request.nominal = nominal;
    request.method = "QRIS";
    request.reff_id = reff_id;
    request.api_key = api_key;

    try {
        const { data } = await requestData.post(baseURL, request);
        return data;
    } catch (error) {
        return error;
    }
};


export const balance = async (req, res) => {
    let { apiKey, signatureId } = req.body;
    baseURL = `https://forestapi.web.id/api/h2h/get-profile/balance`;

    request.api_key = apiKey;
    request.signatureId = signatureId;

    try {
        if (!signatureId || !apiKey) {
            return "Please Input SignatureID or ApiKey"
        }
        const { data } = await requestData.post(baseURL, request);
        return data.data
    } catch (error) {
        return error;
    }
};


export const statusDeposit = async (req, res) => {
    let { signatureId, apiKey, id } = req.body;

    baseURL = "https://forestapi.web.id/api/h2h/deposit/status";
    request.id = id;
    request.api_key = apiKey;
    request.signatureId = signatureId;

    try {
        if (!signatureId || !apiKey) {
            return "Please Input SignatureID or ApiKey";
        };

        const { data } = await requestData.post(baseURL, request);
        return data;
    } catch (error) {
        return error;
    };
};