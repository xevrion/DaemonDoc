import Router from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getGithubRepos } from "../controllers/github.controller.js";

const router = Router();

router.get("/getGithubRepos",authenticate, getGithubRepos);

export default router;
