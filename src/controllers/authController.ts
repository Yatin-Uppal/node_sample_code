import { validationResult } from "express-validator";
import apiResponse from "../helpers/apiResponse";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import AuthValidation from "../validation/authValidation"
import { authenticateJWT } from "../middlewares/jwt";
import { Request, Response } from "express";
import randomstring from "randomstring"

class AuthController {

    private authValidation: AuthValidation;

    constructor() {
        this.authValidation = new AuthValidation();
    }

    public login(): any {
        return [
            this.authValidation.login(),
            async (request: Request, response: Response | any) => {
                try {
                    const errors = validationResult(request);
                    if (!errors.isEmpty()) {
                        return apiResponse.validationErrorWithData(response, "GEN0003", errors.array());
                    } else {
                        const ReqBody: any = request.body;
                        userModel.emailIsExist(ReqBody.email, true, function (error: boolean, code: string, data: any) {
                            if (!error) {
                                userModel.login({ email: ReqBody.email, password: ReqBody.password }, function (error: boolean, code: string, user: any) {
                                    if (!error && user) {
                                        let userData = user;
                                        //Prepare JWT token for authentication
                                        const jwtPayload = userData;
                                        // const jwtData = {
                                        // 	expiresIn: process.env.JWT_TIMEOUT_DURATION,
                                        // };
                                        const secret = process.env.JWT_SECRET;
                                        //Generated JWT token with Payload and secret.
                                        userData.token = jwt.sign(jwtPayload, secret);
                                        response.cookie('token', userData.token, { httpOnly: true, sameSite: 'none', secure: true });
                                        return apiResponse.successResponseWithData(response, code, userData);
                                    } else {
                                        return apiResponse.unauthorizedResponse(response, code);
                                    }
                                });
                            } else {
                                return apiResponse.unauthorizedResponse(response, code);
                            }
                        });
                    }
                } catch (error) {
                    return apiResponse.ErrorResponse(response, error);
                }
            }];
    }
    /**
     * Register function
     * @returns userdata
     */


    public register(): any {
        return [
            this.authValidation.register(),
            async (request: Request, response: Response) => {
                try {
                    // Extract the validation errors from a request.
                    const errors = validationResult(request);
                    if (!errors.isEmpty()) {
                        // Display sanitized values/errors messages.
                        return apiResponse.validationErrorWithData(response, "GEN0003", errors.array());
                    } else {
                        const userData: any = request.body;

                        userModel.registration(userData, function (error) {
                            if (!error) {
                                return apiResponse.successResponse(response, "AUTH0001");
                            }

                            return apiResponse.unauthorizedResponse(response, "AUTH0002");
                        })


                    }
                } catch (error) {
                    //throw error in json response with status 500.
                    return apiResponse.ErrorResponse(response, "GEN0004");
                }
            }
        ]
    }

    public forgotPassword(): any {
        return [
            this.authValidation.forgotPassword(),
            async (request: Request, response: Response) => {
                try {
                    const errors = validationResult(request);
                    if (!errors.isEmpty()) {
                        return apiResponse.validationErrorWithData(response, "GEN0003", errors.array());
                    } else {
                        let reqBody: any = request.body
                        const email = (reqBody.email || '').trim();
                        userModel.emailIsExist(email, true, async function (error, code, data) {
                            if (!error) {
                                userModel.forgotPassword(email, function (error: boolean, code: string, user: any) {
                                    if (!error && user) {
                                        let userData = user;
                                        let userID = userData.id;
                                        //Prepare JWT token for authentication
                                        const jwtPayload = { userID };
                                        const jwtOption = {
                                            expiresIn: '1200s'
                                            //process.env.JWT_TIMEOUT_DURATION,
                                        };
                                        const secret = process.env.JWT_SECRET;
                                        //Generated JWT token with Payload and secret.
                                        const resetToken = jwt.sign(jwtPayload, secret, jwtOption);
                                        //const resetToken = crypto.randomBytes(32).toString("hex");
                                        // code for sending email
                                        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                                        const link = `${process.env.FE_PASSWORD_RESET_URL}/${resetToken}`;
                                    } else {
                                        return apiResponse.ErrorResponse(response, code);
                                    }
                                });
                            } else {
                                return apiResponse.ErrorResponse(response, "AUTH0005");
                            }
                        })
                    }
                } catch (error) {
                    return apiResponse.ErrorResponse(response, error);
                }
            }
        ]
    }

    public tokenVerification(): any {
        return [
            this.authValidation.tokenVerification(),
            async (request: Request, response: Response) => {
                try {
                    const reqBody: any = request.body;
                    const token = (reqBody.token || '').trim();
                    const secret = process.env.JWT_SECRET;
                    if (token.length) {
                        const tokenVerify = await jwt.verify(token, secret, (err, data) => {
                            if (err) {
                                return apiResponse.ErrorResponse(response, "AUTH0017");
                            }
                            else {
                                return apiResponse.successResponse(response, "AUTH0015");
                            }
                        })
                    } else {
                        return apiResponse.ErrorResponse(response, "AUTH0017");
                    }
                } catch (error) {
                    return apiResponse.ErrorResponse(response, "GEN0004");
                }
            },
        ];
    }

    public passwordResetting(): any {
        return [
            this.authValidation.passwordResetting(),
            async (request: Request, response: Response) => {
                try {
                    const errors = validationResult(request);
                    const reqBody: any = request.body;
                    const token = (reqBody.token || '').trim();
                    const secret = process.env.JWT_SECRET;
                    const userData = await jwt.verify(token, secret);
                    if (userData) {
                        let newPassword = reqBody.newPassword;
                        userModel.updatePassword(userData, newPassword, async function (error, code, data) {
                            if (error) {
                                return apiResponse.ErrorResponse(response, code);
                            } else {
                                return apiResponse.successResponse(response, code);
                            }
                        });
                    } else {
                        return apiResponse.unauthorizedResponse(response, "AUTH0017");
                    }
                } catch (error) {
                    return apiResponse.ErrorResponse(response, "AUTH0017");
                }
            },
        ];
    }

    public logout(): any {
        return [
            //authenticateJWT,
            async (request: Request, response: Response) => {
                try {
                    // Extract the validation errors from a request.
                    const errors = validationResult(request);
                    if (!errors.isEmpty()) {
                        // Display sanitized values/errors messages.
                        return apiResponse.validationErrorWithData(response, "GEN0003", errors.array());
                    } else {
                        if (request.cookies.token) {
                            response.clearCookie('token');
                            return apiResponse.successResponse(response, 'AUTH0021');
                        } else {
                            return apiResponse.ErrorResponse(response, 'AUTH0022');
                        }
                    }
                } catch (error) {
                    return apiResponse.ErrorResponse(response, error);
                }
            }];
    }

    public changePassword(): any {
        return [
            authenticateJWT,
            this.authValidation.changePassword(),
            async (request: Request, response: Response) => {
                try {
                    const errors = validationResult(request);
                    if (!errors.isEmpty()) {
                        // Display sanitized values/errors messages.
                        return apiResponse.validationErrorWithData(response, "GEN0003", errors.array());
                    } else {
                        const userId = request.headers.userId + "";
                        if (userId) {
                            let password = request.body.newPassword;
                            userModel.changePassword({ userId, password }, async function (error: boolean, code: string, data: any) {
                                if (error) {
                                    return apiResponse.ErrorResponse(response, code);
                                } else {
                                    return apiResponse.successResponseWithData(response, code, data);
                                }
                            });
                        } else {
                            return apiResponse.unauthorizedResponse(response, "AUTH0017");
                        }
                    }
                } catch (error) {
                    return apiResponse.ErrorResponse(response, error);
                }
            },
        ];
    }

    public updateProfile(): any {
        return [
            authenticateJWT,
            this.authValidation.updateProfile(),
            async (request: Request, response: Response) => {
                try {
                    const errors = validationResult(request);
                    if (!errors.isEmpty()) {
                        // Display sanitized values/errors messages.
                        return apiResponse.validationErrorWithData(response, "GEN0003", errors.array());
                    } else {
                        const userId: string = request.headers.userId + '';
                        let data = request.body;
                        userModel.updateProfile(userId, data, async function (error: boolean, code: string, data: any) {
                            if (error) {
                                return apiResponse.ErrorResponse(response, code);
                            } else {
                                return apiResponse.successResponseWithData(response, code, data);
                            }
                        });
                    }
                } catch (error) {
                    return apiResponse.ErrorResponse(response, error);
                }
            },
        ];
    }

    public getUserDetail(): any {
        return [
            authenticateJWT,
            async (request: Request, response: Response) => {
                try {
                    const errors = validationResult(request);
                    if (!errors.isEmpty()) {
                        // Display sanitized values/errors messages.
                        return apiResponse.validationErrorWithData(response, "GEN0003", errors.array());
                    } else {
                        let userId: string = request.headers.userId + "";
                        userModel.getUserDetail(userId, function (error: boolean, code: string, data: any) {
                            if (error) {
                                return apiResponse.ErrorResponse(response, code);
                            } else {
                                return apiResponse.successResponseWithData(response, code, data);
                            }
                        });
                    }
                } catch (error) {
                    return apiResponse.ErrorResponse(response, "GEN0004");
                }
            }
        ]
    }

    public getDashboardStats(): any {
        return [
            authenticateJWT,
            async (request: Request, response: Response) => {
                try {
                    const errors = validationResult(request);
                    if (!errors.isEmpty()) {
                        // Display sanitized values/errors messages.
                        return apiResponse.validationErrorWithData(response, "GEN0003", errors.array());
                    } else {
                        // Extract the validation errors from a request
                        const errors = validationResult(request);
                        if (!errors.isEmpty()) {
                            // Display sanitized values/errors messages.
                            return apiResponse.validationErrorWithData(response, "GEN0003", errors.array());
                        } else {
                            userModel.getDashboardStats(async function (error: boolean, code: string, data: any) {
                                if (error) {
                                    return apiResponse.ErrorResponse(response, code);
                                } else {
                                    return apiResponse.successResponseWithData(response, code, data);
                                }
                            });
                        }
                    }
                } catch (error) {
                    return apiResponse.ErrorResponse(response, error);    
                }
            }
        ];
    }
}

export default AuthController;