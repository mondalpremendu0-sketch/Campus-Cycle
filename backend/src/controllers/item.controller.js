const AppError = require('../utils/error.utils');
const Item = require('../model/item.model');
const { uploadFile } = require('../services/imagekit.service');
const {nanoid} = require('nanoid');




const createItemController =async (req, res,next) => {
    const { title, description, price, category,condition } = req.body;
    const images = req.file;
    console.log(images);
    
    if (!title || !description || !price || !category || !condition) {
        return next(new AppError("All fields are required", 400));
    }

    const user = req.user;
    try {
        const imgString = images.buffer.toString('base64');
        const imgurl = await uploadFile(imgString, `item-${nanoid()}`);
        console.log(imgurl);
        

    const newItem = await Item.create({
        title,
        description,
        price,
        category,
        condition,
        images: imgurl,
        seller: user._id
    });

    res.status(201).json({
        success: true,
        item: newItem
    });
}catch(err){
    return next(new AppError("Failed to create item", 500));

}



}





module.exports = {
    createItemController  
}
