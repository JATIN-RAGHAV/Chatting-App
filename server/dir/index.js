"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./routes/route"));
const config_1 = require("./config");
const app = (0, express_1.default)();
// Configure CORS to allow requests from any origin
const corsOptions = {
    origin: '*', // Allow requests from any origin
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((req, res, next) => {
    console.log(req.body);
    console.log(req.headers);
    next();
});
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(route_1.default);
mongoose_1.default.connect(config_1.mongodbUrl);
app.listen(config_1.PORT, () => console.log(`Server running on port ${config_1.PORT}`));
