import { GoogleGenAI } from "@google/genai";
import { FileType } from '../types';

let genAI: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!genAI) {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
      console.warn("API Key not found in process.env.API_KEY");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const explainConcept = async (fileType: FileType, query: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `
      You are an expert developer assistant.
      The user is asking about ${fileType} files.
      
      User Query: "${query}"
      
      Provide a concise, helpful, and beginner-friendly explanation. 
      If asking how to open, list specific software. 
      If asking about code, briefly explain the syntax.
      Format the response with Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Sorry, I couldn't generate an explanation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the AI. Please check your API key.";
  }
};

export const generateExample = async (fileType: FileType, topic: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `
      Generate a valid, clean, and educational code example for a ${fileType} file.
      Topic: ${topic}
      
      Return ONLY the code block without markdown backticks.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "// Error generating code.";
  }
};