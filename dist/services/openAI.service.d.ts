import { ConfigService } from "@nestjs/config";
export declare class OpenAIService {
    private configService;
    openai: any;
    constructor(configService: ConfigService);
}
