import express from "express";
import appConfig from "./config/appConfig";
import AppInitializer from "./initializers/AppInitializer";
import DBConnection from "./initializers/DBConnection";


const dbName = appConfig.get("db:name");
DBConnection.connect(dbName).then((result) => {
    const port = appConfig.get("port");
    const app = express();
    AppInitializer.init(app);

    app.listen(port, () => {
        console.log(`Server running on localhost:${port}`);
    });

    app.on("uncaughtException", (err) => {
        console.log("inside app.js with uncaughtException, error:- ", err.toString());
    });

    app.on("error", (err) => {
        console.log("inside app.js with error, error:- ", err.toString());
    });
}).catch((err) => {
    console.error("unable to connect to db");
    process.exit(-1);
});

process.on("uncaughtException", (error) => {
    // insert error handler
    console.log("Could not handle error, Reason: " + error.toString());
    process.exit(1);
});