import express from "express";
import UserOperator from "../operators/UserOperator";

export default class UserController {

    static get(req:express.Request,res:express.Response) {
        const id = req.params.id || "";
        UserOperator.get(id).then((result) => {
            result !== null ? res.status(200).send(result) : res.status(404).send({error: {message: "User not found"}});
        }).catch((err) => {
            res.status((err.error && err.error.code) || 400).send(err);
        });
    }

    static query(req:express.Request, res: express.Response) {
        const query = req.query || {};
        console.log(query);
        UserOperator.query(query,{password: 0}).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status((err.error && err.error.code) || 400).send(err);
        });
    }

    static post(req:express.Request,res:express.Response) {
        const body = req.body || {};
        UserOperator.add(body).then((result) => {
            res.status(201).send(result);
        }, (err) => {
            res.status((err.error && err.error.code) || 400).send(err);
        });
    }

    static put(req:express.Request,res:express.Response) {
        const id = req.params.id || "";
        const body = req.body || {};
        UserOperator.update(id,body).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status((err.error && err.error.code) || 400).send(err);
        });
    }

    static delete(req:express.Request,res:express.Response) {
        UserOperator.delete(req.params.id || "").then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status((err.error && err.error.code) || 400).send(err);
        });
    }
}