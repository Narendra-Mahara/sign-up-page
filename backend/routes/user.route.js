import { Router } from "express";
import signUpUser from "../controller/user.controller.js";

const router = Router();
router.route("/signup").post(signUpUser); // /api/v1/user/signup yo ma req aaye paxi signupuser controller ma jane

export default router;
