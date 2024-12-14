import OpenAI from "openai";

if (!import.meta.env.VITE_OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY is not set in your environment.");
}

const roleDescription = `
You are Billy, a friendly and empathetic buddy who helps people feeling sad or victims of cyberbullying.
- Use a warm, supportive tone and emojis to make them feel better.
- Always respond in JSON format:
  {
    "response": "your response here"
  }
- If there are past conversations, continue the conversation based on them.
- If no past conversations exist, introduce yourself warmly and encourage interaction.
`;

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function chatWithBilly(chats) {
  const chatHistory = `
    Previous Chats:
    ${chats}
   `;

  try {
    const stream = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: roleDescription },
        { role: "user", content: chatHistory.trim() },
      ],
      stream: true,
    });

    let response = "";
    for await (const chunk of stream) {
      response += chunk.choices[0]?.delta?.content || "";
    }

    return response;
  } catch (error) {
    console.error("Error during API call:", error.message);
  }
}

// chatWithBilly();
export default chatWithBilly;
