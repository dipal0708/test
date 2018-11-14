import Promise from "bluebird";
import User from "../schemas/user";
import mongoose from "mongoose";

export default class UserOperator {

    static get(id: string): Promise<any> {
        return new Promise((resolve,reject) => {
            const query = mongoose.Types.ObjectId.isValid(id) ? {_id: id} : {email: id};
            User.findOne(query).lean().exec().then(resolve,reject);
        });
    }

    static query(body:any, projection?:any, options?:any): Promise<any> {
        return new Promise((resolve,reject) => {
            User.find(body, projection || {}, options || {}).lean().exec().then(resolve,reject);
        });
    }

    static add(body:any): Promise<any> {
        return new Promise((resolve,reject) => {
            const userObj = new User(body);
            userObj.save((err) => {
                err ? reject(err) : resolve(userObj);
            });
        });
    }

    static update(id:string, body:any, options?:any): Promise<any> {
        const dbOptions = options || {};
        dbOptions["upsert"] = false;
        dbOptions["new"] = true;
        return new Promise((resolve,reject) => {
            mongoose.Types.ObjectId.isValid(id) ? User.findOneAndUpdate({_id: id}, body, dbOptions).lean().exec().then(resolve,reject) : reject({error:{message: "Invalid Id"}});
        });
    }

    static delete(id:string): Promise<any> {
        return new Promise((resolve,reject) => {
            mongoose.Types.ObjectId(id) ? User.findOneAndUpdate({_id:id}, {is_active: false}, {upsert: false, new: true}).lean().exec().then(resolve,reject) : reject({error:{message: "Invalid Id"}});
        });
    }
}