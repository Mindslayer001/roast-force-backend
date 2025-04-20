import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();



export async function getGroqChatCompletion(user: CodeForce_Interface): Promise<string> {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });
  let chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${process.env.prompt} Name: ${user.firstName || ""} ${user.lastName || ""}
  - Handle: ${user.handle}
  - City: ${user.city}
  - Country: ${user.country}
  - Rank: ${user.rank} (Max: ${user.maxRank})
  - Rating: ${user.rating} (Max: ${user.maxRating})
  - Contribution: ${user.contribution}
  - Friends: ${user.friendOfCount}
  - Organization: ${user.organization || "N/A"}
  - Last Online: ${new Date(user.lastOnlineTimeSeconds * 1000).toLocaleString()}
  - Registered: ${new Date(user.registrationTimeSeconds * 1000).toLocaleString()} Make sure the roast is creative, witty, and not repetitive. Keep it under 4-5 sentences.`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
  console.log(chatCompletion.choices[0]?.message?.content || "");
  return(chatCompletion.choices[0]?.message?.content || "");
}