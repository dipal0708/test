import express from "express";
import bodyParser from "body-parser";
import HttpRoutes from "./HttpRoutes";

export default class AppInitializer {

    private static initializeExpressApp(app: express.Application) {
        app.use(bodyParser.urlencoded({limit: "30mb", extended: true, parameterLimit:50000}));
        app.use(bodyParser.json({limit: "30mb"}));
    }

    static init(app: express.Application) {
        AppInitializer.initializeExpressApp(app);
        HttpRoutes.init(app);
    }
}