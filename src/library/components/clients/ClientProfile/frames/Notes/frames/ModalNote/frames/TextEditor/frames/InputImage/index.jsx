import React from 'react';

import st from './index.module.scss';

const InputImage = ({ imageRef, inputRef, blocks, setBlocks, activeItem, setActiveItem }) => {
  const handleInputChange = (e) => {
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (() => {
      let newStructure = [...blocks];
      newStructure.splice(activeItem, 1, { imageFile: file, image: reader.result, text: '' });
      newStructure.splice(activeItem + 1, 0, { text: '' });
      setActiveItem(activeItem + 1);
      setBlocks(newStructure);
      inputRef.current.focus();
    })
    imageRef.current.value = null;
  }
  

  return (
    <input type="file" className={st.input} ref={imageRef} onChange={(e) => handleInputChange(e)} />
  );
}

export default InputImage;
