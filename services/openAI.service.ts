import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import OpenAI from "openai";

@Injectable()
export class OpenAIService {
  public openai;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>("OPENAI_API_KEY");
    if (!apiKey) {
      throw new Error("The OPENAI_API_KEY environment variable is missing");
    }

    this.openai = new OpenAI({ apiKey });
  }
}
