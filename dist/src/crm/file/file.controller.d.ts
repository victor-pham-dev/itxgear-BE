/// <reference types="multer" />
import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file: Express.Multer.File, bucket: string): Promise<unknown>;
    deleteImage(bucket: string, fileName: string): Promise<any>;
}
