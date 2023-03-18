import mongoose, { Model, Schema } from "mongoose";
import { DatabaseContent } from "./Content";
import { ObjectId } from "mongodb";


const Collections = {
    Content: 'content'
} as const


const schema = new Schema<DatabaseContent>({
    _id: ObjectId
})
export const ContentDbModel = mongoose.model('content', schema, Collections.Content)
