import { Hono } from "hono";
import { HealthCheckController } from "../controller/health.check.controller";


export const healthCheckRoute = new Hono();

healthCheckRoute.get("/health",HealthCheckController.healthcheck);