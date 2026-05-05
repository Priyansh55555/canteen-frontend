import { useState } from 'react';

export const useImageField = (initialUrl = null) => {
  const [file, setFile] = useState(null);
  const [remove, setRemove] = useState(false);
  const [preview, setPreview] = useState(initialUrl);

  const handleUpload = (uploadedFile) => {
    console.log("uploaded file", uploadedFile)
    setFile(uploadedFile);
    setRemove(false);
    setPreview(URL.createObjectURL(uploadedFile));
  };

  const handleRemove = () => {
    setFile(null);
    setRemove(true);
    setPreview(null);
  };

  const reset = (newUrl = null) => {
    setFile(null);
    setRemove(false);
    setPreview(newUrl);
  };

  return {
    file,
    remove,
    preview,
    handleUpload,
    handleRemove,
    reset,
  };
};

export default useImageField;
