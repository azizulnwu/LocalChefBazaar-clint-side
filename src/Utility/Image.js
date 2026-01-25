 
import axios from "axios";
import React from "react";

const ImageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGEBB_API_KEY
    }`,formData 
  );
//  console.log(data?.data?.
// display_url)
return data?.data?.


display_url;
};

export default ImageUpload;
