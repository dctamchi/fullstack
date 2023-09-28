import express from "express";
import homecontroller from "../controllers/homecontroller"

let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/", homecontroller.getHomePage);

    router.get('/hoidanit', homecontroller.getAboutPage);

    router.get('/crud', homecontroller.getCRUD);
    router.post('/post-crud', homecontroller.postCRUD);
    router.get("/get-crud", homecontroller.displayCRUD);
    router.get("/edit-crud", homecontroller.editcrud);
    router.get("/delete-crud", homecontroller.deletecrud);
    router.post("/put-crud", homecontroller.putcrud);

    return app.use("/",router);
}

module.exports= initWebRoutes;