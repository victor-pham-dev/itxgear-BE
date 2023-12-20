/// <reference types="node" />
import { S3 } from 'aws-sdk';
export declare class S3Service {
    s3Uploader: S3;
}
export declare class FileService extends S3Service {
    findFile(fileName: string): Promise<Buffer>;
    uploadToS3(params: S3.PutObjectRequest): Promise<unknown>;
}
