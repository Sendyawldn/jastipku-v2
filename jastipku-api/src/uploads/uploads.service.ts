import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || 'jastipku-bucket';
    
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'minioadmin',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'minioadmin',
      },
      endpoint: process.env.AWS_S3_ENDPOINT || 'http://localhost:9000',
      forcePathStyle: true, // Required for MinIO
    });
  }

  async getPresignedUrl(filename: string, contentType: string) {
    try {
      // Create a unique file key
      const fileExtension = filename.split('.').pop();
      const uniqueFilename = `${uuidv4()}.${fileExtension}`;
      const fileKey = `uploads/${uniqueFilename}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        ContentType: contentType,
      });

      // URL expires in 5 minutes
      const presignedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });

      // Calculate the final public URL
      const publicUrl = `${process.env.AWS_S3_PUBLIC_URL || 'http://localhost:9000/jastipku-bucket'}/${fileKey}`;

      return {
        presignedUrl,
        publicUrl,
        fileKey,
      };
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      throw new InternalServerErrorException('Could not generate upload URL');
    }
  }
}
