import {ClientOptions, OpenAI} from 'openai';

export class OpenaiServices {
    private openai: OpenAI;

    constructor(apikey: string) {

        if (!apikey) {
            throw new Error('OpenAI API key is missing. Please set it in your environment variables.');
        }

        const options: ClientOptions = {
            apiKey: apikey,
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
        }
        this.openai = new OpenAI(options);
    }

    async sendMessage(prompt: string): Promise<string> {

        try{
            const response = await this.openai.chat.completions.create({
                model: "gemini-1.5-flash",
                max_tokens: 100,
                messages: [
                    {role: 'system', content: 'You are a helpful assistant.'},
                    {role: 'user', content: 'Give me a recepie for Chicken Masala'}
                ]

            })
            return response.choices[0].message.content || "No response from the AI";
        } catch(error) {
            console.error('Error from openai',error);
            throw new Error('Failed to process your request.');
        }

    }
}