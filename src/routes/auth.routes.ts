import { Router } from "express";
import { singIn, singUp, deleteUser } from "../controllers/user.controller";
const router = Router();

router.post("/signup", singUp);
router.post("/signin", singIn);
router.get(`/deleteUser`, deleteUser);
export default router;
