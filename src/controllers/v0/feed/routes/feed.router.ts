// import { Router, Request, Response } from 'express';
// import { FeedItem } from '../models/FeedItem';
// import { requireAuth } from '../../users/routes/auth.router';
// import * as AWS from '../../../../aws';
// // import { Sequelize } from 'sequelize-typescript';

// const captionError = {
//     httpCode: 400,
//     message: 'Caption is required or malformed' 
// };

// const urlError = {
//     httpCode: 400,
//     message: 'File url is required'
// };

// const getError = (caption: string | undefined, fileName: string | undefined) => {
//     if (!caption) {
//         return captionError;
//     }

//     if (!fileName) {
//         return urlError;
//     }
// };

// const router: Router = Router();

// // Get all feed items
// router.get('/', async (req: Request, res: Response) => {
//     const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
//     items.rows.map((item) => {
//             if(item.url) {
//                 item.url = AWS.getGetSignedUrl(item.url);
//             }
//     });
//     res.send(items);
// });

// //@TODO
// //Add an endpoint to GET a specific resource by Primary Key
// // update a specific resource
// router.patch('/:id', 
//     requireAuth, 
//     async (req: Request, res: Response) => {
//         const {caption, fileName} = req.body;

//         const errorMessageObject = getError(caption, fileName);
//         if (errorMessageObject) {
//             return res.status(errorMessageObject.httpCode).send({message: errorMessageObject.message});
//         }

//         const item = await FeedItem.findByPk(req.params.id);
//         if (!item) {
//             return res.status(404).send("File Not Found");
//         }

//         item.caption = caption;
//         item.url = fileName;
//         const savedItem = await item.save();

//         res.status(200).send({url: savedItem.url, caption: savedItem.url});
// });

// // router.get('/:fileName',
// //     requireAuth, 
// //     async (req: Request, res: Response) => {
// //         const { fileName } = req.params;

// //         const item = await FeedItem.f(fileName);
// //         if (!item) {
// //             return res.status(404).send("File Not Found");
// //         }

// //         const signedUrl = AWS.getGetSignedUrl(item.url);

// //         res.status(200).send({signedUrl, caption: item.url});
// // });

// // Get a signed url to put a new item in the bucket
// router.get('/signed-url/:fileName', 
//     requireAuth, 
//     async (req: Request, res: Response) => {
//         const { fileName } = req.params;
//         const url = AWS.getPutSignedUrl(fileName);
//         res.status(201).send({url: url});
// });

// router.get('/:fileName', 
//     requireAuth, 
//     async (req: Request, res: Response) => {
//         const { fileName } = req.params;
//         const url = AWS.getGetSignedUrl(fileName);
//         res.status(201).send({url: url});
// });

// // Post meta data and the filename after a file is uploaded 
// // NOTE the file name is the key name in the s3 bucket.
// // body : {caption: string, fileName: string};
// router.post('/', 
//     requireAuth, 
//     async (req: Request, res: Response) => {
 
//     const {caption, fileName} = req.body;

//     const errorMessageObject = getError(caption, fileName);

//     if (errorMessageObject) {
//         return res.status(errorMessageObject.httpCode).send({message: errorMessageObject.message});
//     }

//     const item = new FeedItem({
//             caption: caption,
//             url: fileName
//     });

//     const saved_item = await item.save();

//     saved_item.url = AWS.getGetSignedUrl(saved_item.url);
//     res.status(201).send(saved_item);
// });

// export const FeedRouter: Router = router;