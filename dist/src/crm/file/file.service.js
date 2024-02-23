"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = exports.S3Service = void 0;
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk");
class S3Service {
    constructor() {
        this.s3Uploader = new AWS.S3({
            accessKeyId: '552EY3XAVT9WZ4BE96G7',
            secretAccessKey: 'LA5C3u44FN2sa4cvKype5zhA2xxDC3FgnMCysq3O',
            endpoint: 's3.cloudfly.vn',
            s3ForcePathStyle: true,
        });
    }
}
exports.S3Service = S3Service;
class FileService extends S3Service {
    findFile(fileName) {
        const filePath = path.join('./files', fileName);
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    uploadToS3(params) {
        return new Promise((resolve, reject) => {
            this.s3Uploader.upload(params, (error, data) => {
                if (error) {
                    reject();
                }
                resolve({
                    data: data?.Location,
                    message: 'Upload thành công',
                    success: true,
                });
            });
        });
    }
    deleteFileFromS3(bucket, fileName) {
        const params = {
            Bucket: bucket,
            Key: fileName,
        };
        return new Promise((resolve, reject) => {
            this.s3Uploader.deleteObject(params, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve({
                        message: 'Xoá file thành công',
                        success: true,
                    });
                }
            });
        });
    }
}
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map