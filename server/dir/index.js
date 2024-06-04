"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const route_1 = __importDefault(require("./routes/route"));
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Middleware to set the MIME type for JavaScript files
app.use((req, res, next) => {
    if (req.path.endsWith('.js')) {
        res.type('application/javascript');
    }
    next();
});
// Serve static files from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, '/../public')));
// Use the defined routes
app.use(route_1.default);
// Route to serve the index.html file for all other routes
app.use("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/index.html'));
});
mongoose_1.default.connect(config_1.mongodbUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));
app.listen(config_1.PORT, () => console.log(`Server running on port ${config_1.PORT}`));
