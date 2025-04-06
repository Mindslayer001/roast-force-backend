import express, { Request, Response } from 'express';
import {getGroqChatCompletion} from './components/groq_Components';
import cors from 'cors';
const app = express();
app.use(
  cors({
    origin: "exquisite-stroopwafel-30fed5.netlify.app", // frontend URL (like Vite)
    methods: ['GET', 'POST'],
    credentials: true, // if you're using cookies or sessions
  })
);
app.use(express.json());

app.post('/api/submit', async (req: Request, res: Response) => {
  const receivedUserName: string = req.body.data;
  console.log('Received data:', receivedUserName);
  const data = await fetch(`https://codeforces.com/api/user.info?handles=${receivedUserName}&checkHistoricHandles=false`)
  if(!data.ok){
    console.log(`HTTP error! Status: ${data.status}`)
    res.status(400).json({"result": "Bro Please dont trust your brilliant brain and copy paste your user name"});
    return;
  }
  const jsonData = await data.json()
  const user : CodeForce_Interface = jsonData.result[0]
  const result = await getGroqChatCompletion(user);
  res.status(201).json({"username":receivedUserName,"postText": result, "avatarUrl":user.titlePhoto});
});


app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({"message": "hi"});
});

app.listen(process.env.Port, () => {
  console.log(`Express server running`);
});