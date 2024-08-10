import axios from "axios";
import { type ClassValue, clsx } from "clsx"
import { forEach } from "lodash";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const uploadFileCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ecommerce_TD"); // Thay bằng upload preset của bạn
    formData.append('folder', "Ecommerce_24");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dp22ufhkr/upload", // Thay bằng cloudinary name của bạn
      formData,
    );
    return response.data.url
  } catch (error) {
    // handle error here
    console.error(error);
  }
};
const uploadMultipleFileCloudinary = async (files: FileList): Promise<string[]> => {
  if (!files) {
    return [];
  }
  const imageUrls = await Promise.all(
    Array.from(files).map(file => uploadFileCloudinary(file))
  );
  return imageUrls;
};
const upLoadFiles = async (
  files: { dataURL: string; file: File }[] | File
) => {
  if (files) {
    const CLOUND_NAME = 'dp22ufhkr';
    const PRESET_NAME = 'ecommerce_TD';
    const FOLDER_NAME = 'Ecommerce_24';

    const api = `https://api.cloudinary.com/v1_1/${CLOUND_NAME}/image/upload`;
    const uploadSingleFile = async (file: File) => {
      const formData = new FormData();
      formData.append("upload_preset", PRESET_NAME as string);
      formData.append("folder", FOLDER_NAME as string);
      formData.append("file", file);
      const { data } = await axios.post(api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.url;
    };
    if (files instanceof File) {
      return uploadSingleFile(files);
    } else {
      const urls: string[] = [];
      for (const fileObj of files) {
        const url = await uploadSingleFile(fileObj.file);
        urls.push(url);
      }
      return urls;
    }
  }
};
export { upLoadFiles, uploadFileCloudinary, uploadMultipleFileCloudinary };