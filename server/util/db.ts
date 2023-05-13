import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from 'dotenv'
import getConfigFromEnv from "../Configuration";
dotenv.config()

const config = getConfigFromEnv()


const client = new MongoClient(config.ConnectionString, { serverApi: ServerApiVersion.v1 });
