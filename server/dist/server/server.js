"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const Configuration_1 = __importDefault(require("./Configuration"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const DbModels_1 = require("./Models/DbModels");
const santizieDbContentField_1 = require("./util/santizieDbContentField");
// import mongoose from 'mongoose'
const config = (0, Configuration_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
/**
 * @brief The endpoint gets a specific document by its id.
 * @response 200 ok: The item was found, sending as json response
 * @response 404 not found: The item could not be found.
 */
app.get('/content/get/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const getResult = () => DbModels_1.ContentDbModel
        .findById(id)
        .lean();
    let dbContent = yield getResult();
    if (dbContent === null) {
        return res.status(404).json({ err: `Couldnt find document with id ${id}` });
    }
    res.json((0, santizieDbContentField_1.sanitizeDbContentField)(dbContent));
}));
/**
 * @brief The query returns the first 50 elements in the database.
 * @response 200 OK - An array of ids.
 */
app.get('/content/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getResult = () => DbModels_1.ContentDbModel.find({}, '_id')
        .limit(50);
    const result = yield getResult();
    const idsArray = result.map(doc => doc._id);
    res.json(idsArray);
}));
mongoose_1.default.connect(config.ConnectionString)
    .then(console.log)
    .catch(console.error);
app.listen(3000, () => {
    console.log(`Server started on ${3000}`);
});
//# sourceMappingURL=server.js.map