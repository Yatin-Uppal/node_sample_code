
import express, { Router } from 'express';
import AuthController from "../controllers/authController";
import * as multer from 'multer';
const upload = multer.default();

/* GET home page. */

class Auth {
    private authController: AuthController;
    private router: Router;


    constructor() {
        this.authController = new AuthController();
        this.router = express.Router();
    }
    public route(): any {

        this.router.post("/login", this.authController.login());
        this.router.post("/register", this.authController.register());
        this.router.post("/forgot-password", this.authController.forgotPassword());
        this.router.post("/verify-token", this.authController.tokenVerification());
        this.router.post("/reset-password", this.authController.passwordResetting());
        this.router.delete("/logout", this.authController.logout());
        this.router.put("/profile", this.authController.updateProfile());
        this.router.get("/stats", this.authController.getDashboardStats());
        this.router.put("/change-password", this.authController.changePassword());
        this.router.get("/get-user", this.authController.getUserDetail());

        return this.router;
    }
}

export default Auth;
