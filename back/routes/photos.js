import express from 'express';
import Photos from '../models/photos.js';

const router = express.Router();

router.get('/get_all_photos', async (req, res) => {
    try {
        console.log('get_all_photos2')
        const xt = await Photos.find({});
        // console.log(xt)
        if(xt.length !== 0) {
            res.status(200).json({ xt })
        }
        else {
            res.status(206).json({ message: 'Массив пустой' });
        }
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ message: 'Провал' });
    }
});

router.post('/add_photo', async (req, res) => {
    try {
        console.log('add_photos')
        console.log(req.body)
        const id = req.body.data.id;
        const image = req.body.data.imageSrc;
        const description = req.body.data.description;

        

        const newUser = await Photos.create({ id, image, description });

        res.status(200).json({ message: 'круть' });
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ message: 'Провал' });
    }
});

router.patch('/update_photo', async (req, res) => {
    try {
        console.log('update_photo')
        const id = req.body.data.id;
        const image = req.body.data.imageSrc;
        const description = req.body.data.description;
        console.log(req.body.data.oldId)
        await Photos.create({ id, image, description });
        await Photos.deleteOne({ "image": image });
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ message: 'Провал' });
    }
});

router.delete('/delete_photo', async (req, res) => {
    try {
        console.log('delete_photo')
        // id = req.body.id;
        console.log(req.body.id)
        await Photos.deleteOne({ "id": req.body.id });
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ message: 'Провал' });
    }
});

export default router;