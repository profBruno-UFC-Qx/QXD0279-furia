import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3.ts"
import crypto from "crypto";

export async function uploadFileToStorage(file: Express.Multer.File): Promise<string> {
    const bucketName = process.env.MINIO_BUCKET_NAME as string;
    const fileExtension = file.originalname.split('.').pop();
    const uniqueName = `${crypto.randomUUID()}.${fileExtension}`;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueName,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    await s3Client.send(command);

    return `${process.env.MINIO_ENDPOINT}/${bucketName}/${uniqueName}`;
}