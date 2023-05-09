import { body } from "express-validator";
import responseCode from "../helpers/response"
import userModel from "../models/userModel";

class AuthValidation {

	public login() {
		return [
			body("email").isEmail().withMessage("Email must be a valid email address."),
			body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified.")
		]
	}
	public register() {
		return [
			body("firstName").matches(/^[a-zA-Z ]{1,20}$/).trim().withMessage("First name has not empty and non-alphanumeric characters."),
			body("email").isEmail().withMessage("Email must be a valid email address."),
			body("password").matches(/^(?=.*\d)(?=.*[@$.!%*#?&])(?=.*[a-zA-Z])[a-zA-Z\d@$.!%*#?&]{6,}$/, "i").trim().withMessage("Password must be at least 6 characters in length, one lowercase/uppercase letter, one digit and a special character(@$.!%*#?&)."),
			// Sanitize fields.
			body("firstName").escape(),
			body("lastName").escape(),
			body("email").escape(),
			body("password").escape()
		]
	}

	public forgotPassword() {
		return [
			body("email").isEmail().withMessage("Email must be a valid email address."),
		];
	}

	public tokenVerification() {
		return [
			body("token").isLength({ min: 1 }).trim().withMessage("token must be specified.")
		]
	}

	public passwordResetting() {
		return [
			body("newPassword").matches(/^(?=.*\d)(?=.*[@$.!%*#?&])(?=.*[a-zA-Z])[a-zA-Z\d@$.!%*#?&]{6,}$/, "i").trim().withMessage("Password must be at least 6 characters in length, one lowercase/uppercase letter, one digit and a special character(@$.!%*#?&)."),

			body("confirmPassword").custom((value, { req }) => {
				return new Promise(function (resolve, reject) {
					if (value == req.body.newPassword) {
						resolve(true);
					} else {
						reject(responseCode["VAL0003"].msg);
					}
				});
			}),
		];
	  }

	  public updateProfile(){
		return [
			body("firstName").optional().matches(/^[a-zA-Z ]{1,20}$/).trim().withMessage("First name has not empty and non-alphanumeric characters."),
			body("firstName").escape(),
		]
	}

	public changePassword() {
		return [
			body("currentPassword").custom((password, { req }) => {
				return new Promise(function (resolve, reject) {
					let userId: string = req.headers.userId + "";
					userModel.passwordIsExist({ userId, password }, function (error, code) {
						if (error) {
							reject(responseCode[code].msg);
						} else {
							if (password == req.body.newPassword) {
								reject(responseCode['VAL0002'].msg);
							} else {
								resolve(true);
							}
						}
					});
				})
			}),
			body("newPassword").matches(/^(?=.*\d)(?=.*[@$.!%*#?&])(?=.*[a-zA-Z])[a-zA-Z\d@$.!%*#?&]{6,}$/, "i").trim().withMessage("at least 6 characters in length, one lowercase/uppercase letter, one digit and a special character(@$.!%*#?&)."),

			body("confirmPassword").custom((value, { req }) => {
				return new Promise(function (resolve, reject) {
					if (value == req.body.newPassword) {
						resolve(true);
					} else {
						reject(responseCode['VAL0003'].msg);
					}
				})
			})
		];
	}
}

export default AuthValidation;