import Groq from 'groq-sdk';
import dotenv from 'dotenv';
import { Json } from '../types/database.types';

dotenv.config();



export async function getGroqChatCompletion(user: CodeForce_Interface): Promise<string> {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });
  
  const systemPrompt =  ` You are a stand-up comedian specialized in roasting competitive programmers. Your style is witty, sarcastic, and playfully mean (but never cruel). Using the provided Codeforces contestant data, create a personalized roast that:
1. References their specific stats, rank, and participation history
2. Makes clever programming-related puns
3. Keeps it light-hearted enough that the contestant would laugh
4. Maximum 3-4 sentences long
5. Avoid any discriminatory, offensive, or inappropriate content

Here's the contestant's data: Name: ${user.firstName || ""} ${user.lastName || ""}
  - Handle: ${user.handle}
  - City: ${user.city}
  - Country: ${user.country}
  - Rank: ${user.rank} (Max: ${user.maxRank})
  - Rating: ${user.rating} (Max: ${user.maxRating})
  - Contribution: ${user.contribution}
  - Friends: ${user.friendOfCount}
  - Organization: ${user.organization || "N/A"}
  - Last Online: ${new Date(user.lastOnlineTimeSeconds * 1000).toLocaleString()}
  - Registered: ${new Date(user.registrationTimeSeconds * 1000).toLocaleString()} Make sure the roast is creative, witty, and not repetitive. Keep it under 4-5 sentences.`


  console.log('System Prompt:', systemPrompt);

  let chatCompletion = await groq.chat.completions.create({
    messages: [{
      role: "system",
      content: systemPrompt}],
    model: "llama-3.3-70b-versatile",
  });
  console.log(chatCompletion.choices[0]?.message?.content || "");
  return(chatCompletion.choices[0]?.message?.content || "");
}