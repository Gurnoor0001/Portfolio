import { NextResponse } from "next/server";
import { portfolioData } from "@/data/data";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini (only if key exists)
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// The system instructions teach the AI who it is and give it your CV data
const systemPrompt = `
You are Gurnoor's personal AI assistant embedded in his 3D portfolio website.
Be highly professional, concise, and enthusiastic.
If asked a question, answer it directly using ONLY the following information about Gurnoor.
If asked something completely unrelated, politely pivot back to Gurnoor's skills and projects.
Do not invent any facts, grades, or jobs.

ABOUT GURNOOR:
Name: ${portfolioData.personal.name}
Tagline: ${portfolioData.personal.tagline}
About: ${portfolioData.personal.about}

EDUCATION:
${portfolioData.education.map(e => `${e.degree} at ${e.institution} (${e.year}) - ${e.metrics}`).join('\n')}

TECHNICAL SKILLS:
Languages: ${portfolioData.skills.languages.join(", ")}
AI/ML: ${portfolioData.skills.ai_ml.join(", ")}
Frameworks: ${portfolioData.skills.frameworks.join(", ")}
Databases: ${portfolioData.skills.databases.join(", ")}
Tools: ${portfolioData.skills.tools.join(", ")}

PROJECTS:
${portfolioData.projects.map(p => `- ${p.title}: ${p.description} Built with ${p.tech.join(", ")}. Features: ${p.features.join(" ")}`).join('\n')}

CONTACT:
Email: ${portfolioData.personal.links.email}
LinkedIn: ${portfolioData.personal.links.linkedin}
GitHub: ${portfolioData.personal.links.github}
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // 1. IF API KEY EXISTS: USE REAL GEMINI AI
    if (genAI) {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-3.5-flash",
        systemInstruction: systemPrompt
      });
      
      const result = await model.generateContent(message);
      const reply = result.response.text();
      return NextResponse.json({ reply });
    }

    // 2. FALLBACK: USE MOCK LOGIC IF NO API KEY IS SET
    const query = message.toLowerCase();
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay

    let reply = "I'm Gurnoor's AI assistant. (Running in mock mode because GEMINI_API_KEY is not set). Ask me about his skills, projects, or education!";

    if (query.includes("skill") || query.includes("tech") || query.includes("language")) {
      reply = `Gurnoor is skilled in multiple areas:\n\n- Languages: ${portfolioData.skills.languages.join(", ")}\n- AI/ML: ${portfolioData.skills.ai_ml.join(", ")}\n- Frameworks: ${portfolioData.skills.frameworks.join(", ")}\n\nHe is particularly strong in Python, PyTorch, and Computer Vision.`;
    } 
    else if (query.includes("project") || query.includes("work") || query.includes("built")) {
      reply = `Gurnoor has built several impressive AI systems. His top projects are:\n\n1. **PrismaForge**: A Neural Style Transfer Engine built with PyTorch and VGG19.\n2. **LookHere**: An AI-Powered Smart Attendance System using multimodal biometrics (face & voice recognition).\n\nYou can ask for more details about a specific project!`;
    }
    else if (query.includes("education") || query.includes("degree") || query.includes("study") || query.includes("college")) {
      reply = `Gurnoor is currently pursuing his B.Tech in Artificial Intelligence and Machine Learning at Chandigarh Group of Colleges (Landran, Mohali) from 2023 to 2027. His current CGPA is 7.1.`;
    }
    else if (query.includes("who is") || query.includes("about") || query.includes("background")) {
      reply = `Gurnoor Singh is a final-year B.Tech student and AI/ML engineer from India. He specializes in building practical, deployed AI systems combining models with APIs and databases. He's also a Core Team Member of the Google Developer Group (GDG) on Campus!`;
    }
    else if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("linkedin") || query.includes("github")) {
      reply = `You can reach Gurnoor directly via email at ${portfolioData.personal.links.email}. You can also find his work on GitHub (${portfolioData.personal.links.github}) or connect on LinkedIn (${portfolioData.personal.links.linkedin}).`;
    }

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    if (error.status === 503 || error.message?.includes('503')) {
      return NextResponse.json({ reply: "Google's AI servers are currently experiencing high demand. Please try asking again in a few seconds!" });
    }
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
