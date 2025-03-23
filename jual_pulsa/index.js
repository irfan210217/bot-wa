import express from "express";
import router from "./app/routes.js";

const app = express();

app.use(router);

app.listen(5000, () => {
    console.log("server running");
})