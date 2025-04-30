import express from "express";
import { getDashboardDataController } from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router();
dashboardRouter.get("/", getDashboardDataController);
export default dashboardRouter;
