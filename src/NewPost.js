import React from 'react';
import { useEffect } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const onTakePhoto = dataUri => {
  // Do stuff with the dataUri photo...
  console.log('takePhoto');
};

const onCameraError = err => {
  console.log(err);
};

const NewPost = () => {
  return (
    <div>
      <Camera
        onTakePhoto={dataUri => {
          onTakePhoto(dataUri);
        }}
        onCameraError={error => {
          onCameraError(error);
        }}
      ></Camera>
    </div>
  );
};

export default NewPost;
