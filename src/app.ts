import express, { Request, Response } from 'express';
import {getGroqChatCompletion} from './components/groq_Components';
import cors from 'cors';
const app = express();
const port = 5000;
app.use(cors()); 
app.use(express.json());

app.post('/api/submit', async (req: Request, res: Response) => {
  const receivedUserName: string = req.body.data;
  console.log('Received data:', receivedUserName);
  if(receivedUserName === "DmitriyH"){
    res.status(201).json({"message": "DmitriyH, the expert who's been stuck in neutral for so long, he's starting to think 'candidate master' is just a myth perpetuated by people who actually try. With a rating that's been plateauing for years, it's a wonder you haven't gotten bored enough to contribute something, anything, to the community. Your 95 friends must be thrilled to be associated with someone whose peak is being an also-ran. Here's to another decade of going through the motions, Dmitriy"});
    return;
  }
  const data = await fetch(`https://codeforces.com/api/user.info?handles=${receivedUserName}&checkHistoricHandles=false`)
  if(!data.ok){
    console.log(`HTTP error! Status: ${data.status}`)
    res.status(400).json({"result": "Bro Please dont trust your brilliant brain and copy paste your user name"});
    return;
  }
  const jsonData = await data.json()
  const user : CodeForce_Interface = jsonData.result[0]
  const result = await getGroqChatCompletion(user);
  res.status(201).json({"message": result});
});


app.get('/api/demo', async (req: Request, res: Response) => {
  res.status(200).json({"message": "hi"});
});

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});