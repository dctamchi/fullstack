import express from "express";
import homecontroller from "../controllers/homecontroller"

let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/", homecontroller.getHomePage);

    router.get('/hoidanit', homecontroller.getAboutPage);
    return app.use("/",router);
}

module.exports= initWebRoutes;