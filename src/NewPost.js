import React, { useState, useEffect } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const NewPost = () => {
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');

  const onTakePhoto = dataUri => {
    setPhoto(dataUri);
  };

  useEffect(() => {
    console.log('photo taken');
  }, [photo]);

  return (
    <div>
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>
      <Camera
        onTakePhoto={dataUri => {
          this.onTakePhoto(dataUri);
        }}
      />
      <img src={photo} alt="new photo" />
    </div>
  );
};

export default NewPost;
