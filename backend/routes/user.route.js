import { Router } from "express";
import { signUpUser, loginUser } from "../controller/user.controller.js";

const router = Router();
router.route("/signup").post(signUpUser); // /api/v1/user/signup yo ma req aaye paxi signupuser controller ma jane
router.route("/login").post(loginUser); // /api/v1/user/login yo ma req aaye paxi signupuser controller ma jane

export default router;
