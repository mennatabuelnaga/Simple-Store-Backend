"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var order_1 = require("../models/order");
var server_1 = __importDefault(require("../server"));
var request = (0, supertest_1.default)(server_1.default);
var o_store = new order_1.OrderStore();
var user_1 = require("../models/user");
var product_1 = require("../models/product");
var u_store = new user_1.UserStore();
var p_store = new product_1.ProductStore();
describe('User Model', function () {
    it('create method should add a record', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, u_store.create({
                        first_name: 'first1',
                        last_name: 'last1',
                        password: 'pass1',
                    })];
                case 1:
                    result = _a.sent();
                    console.log(result.id);
                    expect(result.password).not.toEqual('password');
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method should return a list', function () { return __awaiter(void 0, void 0, void 0, function () {
        var usr, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, u_store.create({
                        first_name: 'first2',
                        last_name: 'last2',
                        password: 'passw2',
                    })];
                case 1:
                    usr = _a.sent();
                    return [4 /*yield*/, u_store.index()];
                case 2:
                    result = _a.sent();
                    // one from endpoint test
                    expect(result.length).toBeGreaterThan(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return the correct model', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, u_store.show('1')];
                case 1:
                    result = _a.sent();
                    expect(result.id).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Order Model', function () {
    it('create an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var created_order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, o_store.create(1)];
                case 1:
                    created_order = _a.sent();
                    expect(Number(created_order.user_id)).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return the correct model', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, o_store.show('1')];
                case 1:
                    result = _a.sent();
                    // console.log("SHOW RESULT", result)
                    expect(result.id).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ordersByUser', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, o_store.ordersByUser(1)];
                case 1:
                    result = _a.sent();
                    expect(result).toContain({ id: 1 }, { id: 2 });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Product Model', function () {
    it('create a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product1, created_prod1, product2, created_prod2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    product1 = {
                        name: 'p1',
                        price: 5
                    };
                    return [4 /*yield*/, p_store.create(product1)];
                case 1:
                    created_prod1 = _a.sent();
                    expect(created_prod1.price).toEqual(5);
                    product2 = {
                        name: 'p2',
                        price: 10
                    };
                    return [4 /*yield*/, p_store.create(product2)];
                case 2:
                    created_prod2 = _a.sent();
                    expect(created_prod2.name).toEqual("p2");
                    return [2 /*return*/];
            }
        });
    }); });
    it('show method should return the correct model', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, p_store.show('1')];
                case 1:
                    result = _a.sent();
                    // console.log("SHOW RESULT", result)
                    expect(result.id).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method should return a list', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, p_store.index()];
                case 1:
                    result = _a.sent();
                    // one from endpoint test
                    expect(result.length).toBeGreaterThan(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
