import React from 'react';

const GalleryItem = (props) => {
    return (
        <li>
            <img src={props.url} alt="" />
        </li>
    );
}

export default GalleryItem;