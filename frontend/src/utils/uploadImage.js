import { API_PATHS } from "./apiPaths";
import API from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const response = await API.post(API_PATHS.AUTH.UPLOAD_IMAGE, formData, {
      // headers: {
      //     'Content-Type': 'multipart/form-data',
      // },
    });
    return response.data;
  } catch (error) {
    console.log("Error Uploading the image: ", error);
    throw error;
  }
};
export default uploadImage;
