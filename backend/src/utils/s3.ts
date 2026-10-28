import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    endpoint: process.env.MINIO_ENDPOINT,
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY as string,
        secretAccessKey: process.env.MINIO_SECRET_KEY as string,
    },
    forcePathStyle: true,
});