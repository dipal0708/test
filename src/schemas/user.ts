import mongoose from "mongoose";

interface IUser {
    name: string;
    email: string;
    password: string;
    type: "master" | "employee" | "agent";
    is_active: boolean;
    created_at: Date;
    change_password: boolean;
}

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {type: String, required: ["true", "Please enter a valid name"]},
    email: {type: String, required: ["true", "Please enter a valid email"], unique: true},
    password: {type: String, required: ["true","Please enter a valid password"]},
    type: {type: String, required: ["true", "Please enter a type"], enum: ["master","employee", "agent"], lowercase: true},
    change_password: {type: Boolean, default: true, required: true},
    is_active: {type: Boolean, default: true, required: true},
    created_at: {type: Date, default: Date(), required: true}
});

export interface IUserSchema extends IUser, mongoose.Document { }
export default mongoose.model<IUserSchema>("users", userSchema);