import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

export const decodeToken = (token: string) => {
    return jwt.decode(token);

}
// export const verifyToken = (token: string) => {
//     return jwt.verify(token, process.env.JWT_SECRET);
// }

export const createToken = (user: object) => {
    return jwt.sign({user}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
}

// export const getToken = (headers: { authorization: string }) => {
//     if (headers && headers.authorization) {
//         let parted = headers.authorization.split(' ');
//         if (parted.length === 2) {
//             return parted[1];
//         } else {
//             return null;
//         }
//     } else {
//         return null;
//     }
// }

// export const checkToken = (req: Request, res: Response, next: NextFunction) => {
//     let token = getToken(req.headers);
//     if (token) {
//         verifyToken(token)
//             .then((decoded: any) => {
//                 req.body.user = decoded.user;
//                 next();
//             })
//             .catch((err: any) => {
//                 res.status(401).json({message: 'Invalid Token'});
//             });
//     } else {
//         res.status(401).json({message: 'No token provided'});
//     }
// }

// export const checkTokenAdmin = (req: Request, res: Response, next: NextFunction) => {
//     let token = getToken(req.headers);
//     if (token) {
//         verifyToken(token)
//             .then((decoded: any) => {
//                 if(decoded.user.role === 'admin'){
//                     req.body.user = decoded.user;
//                     next();
//                 }else{
//                     res.status(401).json({message: 'Invalid Token'});
//                 }
//             })
//             .catch((err: any) => {
//                 res.status(401).json({message: 'Invalid Token'});
//             });
//     } else {
//         res.status(401).json({message: 'No token provided'});
//     }
//     }
