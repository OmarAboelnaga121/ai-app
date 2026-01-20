import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('ai')
@Controller('ai')
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Post('generate')
    @ApiOperation({ summary: 'Generate AI content' })
    @ApiResponse({ status: 201, description: 'Content successfully generated.' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                prompt: {
                    type: 'string',
                    description: 'The text prompt to generate content from',
                    example: 'Generate a travel itinerary for 3 days in Tokyo'
                }
            },
            required: ['prompt']
        }
    })
    async generate(@Body('prompt') prompt: string) {
        return { response: await this.aiService.generateContent(prompt) };
    }
}
