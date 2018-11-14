import express from "express";
import UserController from "../controllers/UserController";

export default class HttpRoutes {
    static init(app: express.Application) {
        app.get("/", (req, res) => {
            res.status(200).send("<h2> Welcome to Node Sample Server </h2> <br> <h3>A Template for NodeJS Servers designed for Mobclixs Technologies Pvt. Ltd.</h3>");
        });

        app.get("/v1/users", UserController.query);
        app.get("/v1/users/:id", UserController.get);
        app.post("/v1/users",UserController.post);
        app.put("/v1/users/:id", UserController.put);
        app.delete("/v1/users/:id", UserController.delete);
        app.delete("/v1/users", UserController.delete);
    }
}