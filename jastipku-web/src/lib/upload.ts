import api from "./axios";
import axios from "axios";

export async function uploadToCloudStorage(file: File): Promise<string> {
  // 1. Get Presigned URL
  const { data } = await api.get("/uploads/presigned-url", {
    params: {
      filename: file.name,
      contentType: file.type,
    },
  });

  const { presignedUrl, publicUrl } = data;

  // 2. Upload file directly to S3 / MinIO
  await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  // 3. Return the final public URL
  return publicUrl;
}
