// utils/cloudinary.ts
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  
    if (!cloudName || !uploadPreset) {
      console.error("Cloudinary configuration missing:", {
        cloudName,
        uploadPreset,
      });
      throw new Error("Cloudinary configuration missing");
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "user_uploads");
  
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Image upload failed:", errorData);
      throw new Error("Image upload failed");
    }
    console.log("Cloudinary Cloud Name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary Upload Preset:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  
    const data = await response.json();
    return data.secure_url;
  };