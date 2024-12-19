import { Router, Request, Response } from 'express';
import { OpenaiServices } from '../services/OpenaiServices';

const router = Router();

const openAIService = new OpenaiServices(process.env.API_TOKEN || '');

interface MessageRequest {
    message: string;
}

interface OpenaiResponse {
    message: string;
}

function isMessageRequest(obj: any): obj is MessageRequest {
    return obj && typeof obj.message === 'string';
}

router.post("/message", async (req: Request<{} ,{} ,MessageRequest>, res: Response<OpenaiResponse | {error:String}>) => {
    const reqBody = req.body;
    console.log(reqBody);
    if(!isMessageRequest(reqBody)) {
        res.status(400).send({message: "Message is required"});
        return;
    }
    try{
        const reply = await openAIService.sendMessage(reqBody.message);
        const response: OpenaiResponse = {message: reply};
        res.send(response);
    } catch(error) {
        res.status(500).send({ error: 'Failed to process your request.' });
    }
});

export default router;