"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB_DEV = _a.POSTGRES_DB_DEV, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, ENV = _a.ENV;
var options;
if (ENV === 'test') {
    options = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    };
}
if (ENV === 'dev') {
    options = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB_DEV,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    };
}
var client = new pg_1.Pool(options);
exports.default = client;
