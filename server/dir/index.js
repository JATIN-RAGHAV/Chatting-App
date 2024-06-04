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
// Configure CORS
const corsOptions = {
    origin: 'https://jatin-raghav.vercel.app/', // Allow only this origin
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
app.use('/', (req, res, next) => {
    res.sendFile('index.html', { root: __dirname });
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(route_1.default);
mongoose_1.default.connect(config_1.mongodbUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));
app.listen(config_1.PORT, () => console.log(`Server running on port ${config_1.PORT}`));
