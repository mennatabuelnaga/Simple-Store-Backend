"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:".concat(PORT)
}));
app.get('/', function (req, res) {
    res.send('AHLAN!');
});
// Initialise all the routers
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
app.listen(PORT, function () {
    console.log("starting app on port ".concat(PORT));
});
exports.default = app;
