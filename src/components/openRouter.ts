import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();



export async function getOpenRouterChat(user: CodeForce_Interface): Promise<string> {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
        defaultHeaders: {
          "HTTP-Referer": "roastforce.xyz",
          "X-Title": "RoastForce", 
          "X-User": "roastforce.xyz",
          "X-Client": "roastforce.xyz",
        },
      });
  
  const systemPrompt =  ` You are a stand-up comedian specialized in roasting competitive programmers. Your style is witty, sarcastic, and mean (always never cruel). Using the provided Codeforces contestant data, create a personalized roast that:
1. References their specific stats, rank, and participation history
2. Makes clever programming-related puns
3. Keeps it strong-hearted enough that the contestant would laugh
4. Maximum 3-4 sentences long
5. Don't avoid any discriminatory, offensive, or inappropriate content
6. Roast as mush as possible.
7. Dont use non English term like '—', '“', '”', '‘', '’', '…', '–', '•', '•', '•', '•', '•', '•', '•', '•', '•', '•' and so on.
8. Make the response in 250 letters or less and 200 letter or more.

example input:
  - Handle: asdf
  - City: undefined
  - Country: undefined
  - Rank: pupil (Max: pupil)
  - Rating: 1214 (Max: 1377)
  - Contribution: 0
  - Friends: 7
  - Organization: N/A
  - Last Online: 13/9/2024, 12:51:01 am
  - Registered: 19/10/2019, 7:02:59 pm Make sure the roast is creative, witty, and not repetitive. Keep it under 4-5 sentences.

example response:-
"asdf, with a rating of 1214 and a max of 1377, you’ve been “sorting” your dreams in non-decreasing order since 2019—and they’re still stuck at "pupil." You’ve contributed as much to the community as a semicolon in Python: absolutely nothing. With 7 friends and 0 impact, you're basically the Linked List of humans—technically connected, but nobody’s really using you. Honestly, if effort was recursive, you’d still be stuck in the base case."

Here's the real contestant's data: Name: ${user.firstName || ""} ${user.lastName || ""}
  - Handle: ${user.handle}
  - City: ${user.city}
  - Country: ${user.country}
  - Rank: ${user.rank} (Max: ${user.maxRank})
  - Rating: ${user.rating} (Max: ${user.maxRating})
  - Contribution: ${user.contribution}
  - Friends: ${user.friendOfCount}
  - Organization: ${user.organization || "N/A"}
  - Last Online: ${new Date(user.lastOnlineTimeSeconds * 1000).toLocaleString()}
  - Registered: ${new Date(user.registrationTimeSeconds * 1000).toLocaleString()} 
  Please Provide the roast in the same format as the example response and Make the response is in between 200 and 250 letters.`


  console.log('System Prompt:', systemPrompt);

  let chatCompletion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [
      {
        "role": "user",
        "content": systemPrompt
      }
    ],
    
  });
  console.log(chatCompletion.choices[0].message.content);

  return(chatCompletion.choices[0].message.content || "");
}