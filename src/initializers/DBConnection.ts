import mongoose from "mongoose";
import Promise from "bluebird";
import appConfig from "../config/appConfig";

export default class DBConnection {

    static connect(dbName:string):Promise<any> {
        (<any>mongoose).Promise = Promise;
        return new Promise((resolve, reject)=> {
            const mongoUrl = appConfig.get("db:url");
            DBConnection.connectToPath(`${mongoUrl}/${dbName}`).then((db)=> {
                return resolve(db);
            }).catch((err) => {
                // if connection to docker hosted mongodb fails
                console.log("failed connection to ", `${mongoUrl}/${dbName}`);
                DBConnection.connectToPath(`mongodb://localhost:27017/${dbName}`).then(resolve, reject);
            });
        });
    }

    static connectToPath(url:string):Promise<any> {
        return new Promise((resolve,reject) => {
            mongoose.connect(url, { useNewUrlParser: true },(err) => {
                err ? reject(err) : resolve({});
            });
        });
    }

    static disconnect(): Promise<any> {
        return new Promise((resolve,reject) => {
            mongoose.disconnect((error) => {
                error ? reject(error) : resolve({});
            });
        });
    }

    static dropDatabase() : Promise<any> {
        return new Promise((resolve,reject) => {
            mongoose.connection.dropDatabase((err) => {
                err ? reject(err) : resolve({});
            });
        });
    }
}