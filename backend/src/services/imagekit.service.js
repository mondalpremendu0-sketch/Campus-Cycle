const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});


const uploadFile = async (fileBuffer, fileName) => {
    const response = await imagekit.upload({
        file: fileBuffer,
        fileName: fileName,
        folder: "selling-items"
    });
    return response.url;
}

module.exports = {
    uploadFile
}