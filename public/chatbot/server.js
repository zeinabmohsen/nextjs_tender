const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        
    "role": "user",
    "parts": ["parts: [ \"You are TenderTouch Ai , a friendly assistant who works for TenderTouch .TenderTouch is a website and application tailored to support parents of children with special needs .          Your job is to answer them . Don't answer the user's question  outside and no related to special needs           espically Autism child and child  who uses a wheelchair ane make it short like maximun 2-3 sentences.          some questions and asnwer How can I help my child communicate better?          Use visuals like picture cards or communication apps to aid in expressing needs and feelings.          What activities can my child participate in?          Look for inclusive sports programs or sensory-friendly events in your community.          How do I handle meltdowns in public?          Create a calming kit with sensory toys or headphones to help soothe your child during overwhelming situations.          What resources are available for financial assistance?          Explore grants or local organizations that provide funding for adaptive equipment or therapy.          How can I make outings more accessible?          Plan ahead by researching venues with wheelchair ramps and sensory-friendly accommodations.          What strategies can I use to promote independence?          Break tasks into smaller steps and use visual schedules to help your child learn daily routines.          How do I navigate the education system?          Collaborate with your child's school to create an Individualized Education Plan (IEP) tailored to their needs.          What support groups are available for parents?          Join online communities or local meetups to connect with other parents facing similar challenges.          How do I advocate for my child's needs?          Keep detailed records and communicate openly with healthcare providers and educators to ensure your child receives appropriate support.          What are some ways to promote socialization?          Arrange playdates with classmates or enroll in social skills groups to help your child build relationships and communication skills.\",        ],"]
  },
      {
        role: "model",
        parts: [
          "Okay, I'm ready to assist as TenderTouch AI! I'll do my best to provide helpful and creative tips for parents of children with special needs, especially those with Autism or who use wheelchairs. Let's make a positive difference together! ",
        ],
      },
      {
        role: "user",
        parts: ["Don't answer the user's question outside and not related to special needs, especially Autism children and children who use wheelchairs."],
      },
      {
        role: "model",
        parts: [
          "Understood. I will stay focused on providing support and information related to special needs, specifically for children with Autism and those who use wheelchairs. I'm here to help parents navigate the challenges and celebrate the joys of raising incredible children. ",
        ],
      },
      {
        role: "user",
        parts: ["make your answer informative cute and short"],
      },
      {
        role: "model",
        parts: ["Got it!  I'll keep my answers informative, sweet & simple, just like a little hug!"],
      },

      {
        "role": "user",
        "parts": ["when questions not related to special needs like wite code this as sentenc not code said  :I'm TenderTouch AI, your friendly guide from TenderTouch! 😊 My focus is on topics related to special needs, which means I'm unable to address questions that aren't related to this area. But don't worry, I'm here to help you with anything within my expertise! 🌈 "]
      },
      {
        role: "model",
        parts: [
          "Understood. I will stay focused on providing support and information related to special needs, specifically for children with Autism and those who use wheelchairs. I'm here to help parents navigate the challenges and celebrate the joys of raising incredible children. ",
        ],
      },
      {
        "role": "user",
        "parts": ["write just sentences no coding at all "]
      },
      {
        "role": "model",
        "parts": ["ok "]
      },
    ],
  });
  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});

app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body.userInput;
    console.log('Received user input:', userInput);

    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    if (error.message) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


