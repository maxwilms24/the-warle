import { GoogleGenAI } from "@google/genai";
import { War } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getWarContext = async (war: War): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide a concise, engaging historical "Did you know?" fact about the casualties of the ${war.name} (${war.years}). 
      Explain specifically why the death toll was so high or low (e.g., disease, technology, specific battles). 
      Keep it under 3 sentences. Do not mention the exact total number of deaths if possible, but you can use comparatives.`,
      config: {
        systemInstruction: "You are an expert military historian providing brief context for a daily trivia game.",
        temperature: 0.7,
      },
    });
    return response.text || "Historical data unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not retrieve historical context at this time.";
  }
};

export const getHint = async (war: War, currentGuess: number): Promise<string> => {
    try {
        const direction = currentGuess < war.deaths ? "higher" : "lower";
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `The user is playing a guessing game about the death toll of the ${war.name}. 
            The actual number is ${war.deaths}. The user guessed ${currentGuess}.
            Give a cryptic but helpful hint implying the number is ${direction}. 
            For example, compare it to the population of a city or another event.
            Do not reveal the number. Max 20 words.`,
        });
        return response.text || "Think about the scale of the armies involved.";
    } catch (error) {
        return "Think about the duration and intensity of the conflict.";
    }
}

export const getDailyContent = async (war: War): Promise<{ image: string | null }> => {
  try {
    // Generate Image only, description is now static in WARS constant
    const imageResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
          parts: [{ text: `A historical oil painting style illustration of the ${war.name} (${war.years}). Dark, atmospheric, no text.` }]
      },
      config: {
          imageConfig: {
              aspectRatio: "16:9",
          }
      }
    });

    let image = null;
    if (imageResponse.candidates?.[0]?.content?.parts) {
        for (const part of imageResponse.candidates[0].content.parts) {
            if (part.inlineData) {
                image = `data:image/png;base64,${part.inlineData.data}`;
                break;
            }
        }
    }

    return {
      image: image
    };
  } catch (error) {
    console.error("Error generating daily content:", error);
    return {
      image: null
    };
  }
};