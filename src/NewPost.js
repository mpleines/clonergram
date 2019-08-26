import React, { useState, useEffect } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const NewPost = () => {
  const [photo, setPhoto] = useState('');
  const { photoTaken, setPhotoTaken } = useState(false);

  const onTakePhoto = dataUri => {
    setPhoto(dataUri);
  };

  useEffect(() => {
    console.log('photo taken');
  }, [photo]);

  return (
    <div>
      {!photoTaken ? (
        <Camera
          onTakePhoto={dataUri => {
            this.onTakePhoto(dataUri);
          }}
        />
      ) : (
        <p>photo</p>
      )}
    </div>
  );
};

export default NewPost;
