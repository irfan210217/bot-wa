import axios from "axios";
// import { convertToRupiah as convert } from "convert-to-rupiah"

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



export const createDeposit = async ({nominal, reff_id, api_key}, response) => {
    baseURL = "https://forestapi.web.id/api/h2h/deposit/create";
    request.phone_number = "";
    request.nominal = nominal;
    request.method = "QRIS";
    request.reff_id = reff_id;
    request.api_key = api_key;

    try {
        const { data } = await requestData.post(baseURL, request);
        // let id = data.data.id;
        response(data);
    } catch (error) {
        return error;
    }
};


export const balance = async ({api_key, signatureId}, response) => {
    baseURL = `https://forestapi.web.id/api/h2h/get-profile/balance`;
    request.api_key = api_key;
    request.signatureId = signatureId;

    try {
        if (!signatureId || !api_key) {
            return response("Please Input SignatureId or Api Key")
        }
        const { data } = await requestData.post(baseURL, request);
        response(data);
    } catch (error) {
        response(error)
    }
};


export const statusDeposit = async ({api_key, signatureId, id}) => {
    baseURL = "https://forestapi.web.id/api/h2h/deposit/status";
    request.id = id;
    request.api_key = api_key;
    request.signatureId = signatureId;

    try {
        if (!signatureId || !api_key) {
            return "Please Input SignatureID or ApiKey";
        };
        const { data } = await requestData.post(baseURL, request);
        return data;
    } catch (error) {
        return error;
    };
};