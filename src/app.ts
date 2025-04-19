import express, { Request, Response } from 'express';
import {getGroqChatCompletion} from './components/groq_Components';
import cors from 'cors';
import {supabase} from './components/Supabase_components';
const app = express();
app.use(
  cors()
);
app.use(express.json());

app.post('/api/submit', async (req: Request, res: Response) => {
  const receivedUserName: string = req.body.data;
  console.log('Received data:', receivedUserName);
  const {data,error} = await supabase.rpc('get_recent_roast', {user_handle: receivedUserName, cooldown: 120}) as { data: getRecentRoast | null, error: any };;
  if(error){
    console.log("Error in supabase", error);
    res.status(400).json({"result": "Error in supabase"});
    return;
  }
  const userDetailsFromDB: getRecentRoast | null = data??null;
  console.log("User Details from DB", userDetailsFromDB);
  const codeForceProfileData = await fetch(`https://codeforces.com/api/user.info?handles=${receivedUserName}&checkHistoricHandles=false`)
  if(!codeForceProfileData.ok){
    console.log(`HTTP error! Status: ${codeForceProfileData.status}`)
    res.status(400).json({"result": "Bro Please dont trust your brilliant brain and copy paste your user name"});
    return;
  }
  const jsonData = await codeForceProfileData.json()
  const user : CodeForce_Interface = jsonData.result[0]
  let result;
  const userid:number = userDetailsFromDB?userDetailsFromDB.user_id : 0;
  if(userDetailsFromDB?.roast === "ok"){ 
    result = await getGroqChatCompletion(user);
    const {data,error} = await supabase.rpc('set_recent_roast', {roast: result, user_id: userid }) as { data: setRecentRoast | null, error: any };;
  }
  else{
    result = data?.roast; 
  }
  const timer:string = new Date(Date.now() + ((userDetailsFromDB? userDetailsFromDB.time : 0) * 1000)).toISOString();
  console.log("Timer", timer);
    res.status(201).json({"username":receivedUserName,"postText": result, "avatarUrl":user.titlePhoto, "timer": timer, "new_user": userDetailsFromDB?.new_user});
});


app.get('/history', async (req: Request, res: Response) => {
  res.status(200).json({"message": "hi"});
});

app.listen(process.env.Port, () => {
  console.log(`Express server running`);
});