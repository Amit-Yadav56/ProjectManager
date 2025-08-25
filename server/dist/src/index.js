"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// ROUTE IMPORTS
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// CONFIGURATIONS
// a. Express-- Fast, minimalist web framework for Node.js to build your REST API
const app = (0, express_1.default)();
// b. Dotenv-- for getting the environment variables
dotenv_1.default.config();
// c. bodyParser-- Middleware to parse incoming request bodies (JSON, URL-encoded data)
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// d. cors-- Enables Cross-Origin Resource Sharing, allowing your frontend to make requests to backend
app.use((0, cors_1.default)());
// e. Helmet-- Security middleware that sets various HTTP headers to protect against common vulnerabilities
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
// f. Morgan-- HTTP request logger middleware for debugging and monitoring
app.use((0, morgan_1.default)("common"));
// Routes
app.get("/", (req, res) => {
    res.send("Connected successfullly");
});
app.use("/projects", projectRoutes_1.default);
app.use("/tasks", taskRoutes_1.default);
app.use("/users", userRoutes_1.default);
// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
