import React from 'react';
import GalleryItem from './GalleryItem';
import NoResults from './NoResults';

const GalleryForm = (props) => {
  const results = props.images;
  let title = "";
  let images;
  if (results.length > 0) {
    images = results.map(image => <GalleryItem url={`http://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} key={image.id}/>);
    title = props.title
  } else {
    images = <NoResults />;
  }

    return (
        <div className="photo-container">
        <h2>{title}</h2>
        <ul>
          {images}
        </ul>
      </div>
    );
}

export default GalleryForm;