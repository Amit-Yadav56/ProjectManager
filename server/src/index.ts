import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// ROUTE IMPORTS
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

// CONFIGURATIONS
// a. Express-- Fast, minimalist web framework for Node.js to build your REST API
const app = express();

// b. Dotenv-- for getting the environment variables
dotenv.config();

// c. bodyParser-- Middleware to parse incoming request bodies (JSON, URL-encoded data)
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// d. cors-- Enables Cross-Origin Resource Sharing, allowing your frontend to make requests to backend
app.use(cors());

// e. Helmet-- Security middleware that sets various HTTP headers to protect against common vulnerabilities
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// f. Morgan-- HTTP request logger middleware for debugging and monitoring
app.use(morgan("common"));

// Routes
app.get("/", (req, res) => {
  res.send("Connected successfullly");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
