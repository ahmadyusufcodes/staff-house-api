import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const location = path.join(__dirname, '../../../public/uploads');
const extLocation = "http://localhost:5000/uploads/";
const upload = (req: Request, res: Response, next: NextFunction) => {
    const keys = Object.keys(req.body);
    const key = keys.includes('images') ? 'images' : 'image';
    const images = req.body[key];
    if (!images) return next();
    if (key === 'images') {
        const imagesData = images.map(( image: string ) => image.replace(/^data:image\/\w+;base64,/, ''));
        const imagesName = images.map(( image: string, index: number) => `${Date.now()}${index}-${image.substring(0, 10).replace(/[^a-zA-Z0-9]/g, '')}.png`);
        imagesData.forEach((image: string, index: number) => {
            fs.writeFile(`${location}/${imagesName[index]}`, image, { encoding: 'base64' }, (err) => {
                if (err) return next(err);
            });
        });
        req.body.images = imagesName.map((image: string) => extLocation + image);
        return next();
    }
    const imageName = `${Date.now()}-${images.substring(0, 10).replace(/[^a-zA-Z0-9]/g, '')}.png`;
    const imageData = images.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFile(`${location}/${imageName}`, imageData, { encoding: 'base64' }, (err) => {
        if (err) return next(err);
    }
    );
    req.body[key] = extLocation + imageName;
    return next();
};

const handleUpload = (req: Request, res: Response, next: NextFunction) => {
    next();
};

export { 
    upload,
    handleUpload
 };