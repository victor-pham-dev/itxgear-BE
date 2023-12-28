declare function sendText(msg: string): Promise<any>;
declare function sendPhoto(img: string): Promise<any>;
export declare const TeleBOT: {
    sendText: typeof sendText;
    sendPhoto: typeof sendPhoto;
};
export {};
