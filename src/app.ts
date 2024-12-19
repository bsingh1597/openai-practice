import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import messageRoutes from './routes/messageRoutes';


export class App{
    private app: express.Application;
    private port: number;

    constructor(port: number){
        this.app = express();
        this.port = port;
        
        // Middleware
        this.app.use(bodyParser.json());
        this.app.use(cors());

        // Routes
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.app.use('/', messageRoutes);
        this.app.get('/', (req, res) => {
            res.send('Welcome to the OpenAI API Service!');
        });
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}