import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import apiResponse from "../helpers/apiResponse";

const authenticateJWT = (request: Request, response: Response, next: NextFunction) => {
    let authHeader: string | any = request.cookies.token || request.headers.token || null;

    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return apiResponse.unauthorizedResponse(response, "GEN0005");
            }
            request.headers.userId = user.id;
            next();
        });
    } else {
        const guestUserPaths = process.env.GUID_BASE_PATHS.split(',');
        if(request.headers.guid && guestUserPaths.indexOf(request.baseUrl) !== -1) {
            next();
        } else {
            return apiResponse.unauthorizedResponse(response, "GEN0005");
        }
    }
}

export {authenticateJWT};