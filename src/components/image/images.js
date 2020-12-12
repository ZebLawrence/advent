import React from 'react';

const allImages = () => {

    const imageMap = {};

    for (let index = 1; index <= 190; index++) {
        const importedImage = require(`../../assets/images/Photo- (${index}).jpg`);
        imageMap[`image${index}`] = importedImage;
    }

    return imageMap;
};

export default allImages;
