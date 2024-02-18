"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:4010',
    'http://localhost:8888',
    'https://itxgear-gw.io.vn',
    'https://itxgear.com',
    'https://www.itxgear.com',
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
};
exports.default = corsOptions;
//# sourceMappingURL=cors.js.map