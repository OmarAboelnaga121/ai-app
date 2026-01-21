import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {

    private genAI: GoogleGenerativeAI;
    private model: GenerativeModel;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not defined in environment variables');
        }
        this.genAI = new GoogleGenerativeAI(apiKey);

        this.model = this.genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-lite',
            systemInstruction: "You are a helpful AI assistant. Use well-structured Markdown to format your responses. Use headers, bold text, and lists where appropriate to make information easy to read. Avoid large blocks of unformatted text.",
        }, { apiVersion: 'v1beta' });
    }

    async generateContent(prompt: string): Promise<string> {
        const result = await this.model.generateContent(prompt);
        return result.response.text();
    }
}
