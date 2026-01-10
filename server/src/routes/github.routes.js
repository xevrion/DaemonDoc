import Router from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { addRepoActivity, getGithubRepos, githubWebhookHandler } from "../controllers/github.controller.js";

const router = Router();

router.get("/getGithubRepos",authenticate, getGithubRepos);
router.post("/addRepoActivity",authenticate, addRepoActivity);
router.post("/webhookhandler",githubWebhookHandler)

export default router;
