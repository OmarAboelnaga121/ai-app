"use server";
const API_BASE_URL = 'http://localhost:3000';

export interface GenerateResponse {
    response: string;
}

export async function generateContent(prompt: string): Promise<GenerateResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/ai/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('AI Generation Error:', error);
        throw error;
    }
}
