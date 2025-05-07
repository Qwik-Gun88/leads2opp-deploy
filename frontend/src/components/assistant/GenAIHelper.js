// src/components/assistant/GenAIHelper.js

export async function generateContentWithValidation({ type, context, ask }) {
    const validatingQuestions = {
      email: [
        "What is the main message of the email?",
        "Who is the audience?",
        "What is the tone (e.g., friendly, professional)?"
      ],
      call: [
        "What is the purpose of the call?",
        "What is the prospect’s pain point?",
        "What is your goal by the end of the call?"
      ],
      text: [
        "What is the goal of the message?",
        "How urgent is this message?"
      ],
      sequence: [
        "How many steps should the sequence have?",
        "What channels should it include? (email, call, text)",
        "What type of contacts are you targeting?"
      ]
    };
  
    const answers = await ask(validatingQuestions[type]); // You’ll create this modal/flow to ask these
  
    const prompt = `
  You are an AI assistant. Generate a ${type} based on:
  Context: ${context}
  Details: ${answers.join(', ')}
  
  Make the output clear, compelling, and ready to use.
    `;
  
    const res = await fetch("/api/generate-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
  
    const data = await res.json();
    return data.content;
  }
  