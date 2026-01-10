import User from "../schema/user.schema.js";
import { decrypt } from "./oauthcontroller.js";
import axios from "axios";

export const getGithubRepos = async (req, res) => {
  try {
    const userId = req.userId;
   
    const user = await User.findById(userId);
   
    if (!user || !user.githubAccessToken) {
      return res.status(404).json({ message: "GitHub access token not found" });
    }
  
    const accessToken = decrypt(user.githubAccessToken);

    const reposRes = await axios.get(
      "https://api.github.com/user/repos?per_page=100",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const reposData = reposRes.data
    .filter(repo => !repo.fork && repo.permissions?.push)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      default_branch: repo.default_branch,
    }));

    res.status(200).json({reposData});
  } catch (error) {
    res.status(500).json({ message: "Error fetching GitHub repositories", error });
  }
};