import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export const generate = async (prompt: string) => {
    try {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set. Please provide a valid Gemini API key in your environment.');
    }
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

        // Exponential backoff retries for transient errors like 429/5xx
        let lastErr: any;
        for (let attempt = 1; attempt <= 4; attempt++) {
          try {
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            return text;
          } catch (err: any) {
            lastErr = err;
            const status = (err as any)?.status;
            const retryable = status === 429 || (status >= 500 && status < 600);
            if (!retryable || attempt === 4) break;
            const delay = 500 * Math.pow(2, attempt - 1); // 500ms, 1s, 2s
            await sleep(delay);
          }
        }
        throw lastErr;
    } catch (error) {
        console.error('Error generating response with Gemini:', error);
        throw error;
    }
}

export const generateWithImage = async (prompt: string, image?: File) => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set. Please provide a valid Gemini API key in your environment.');
  }
  const { GoogleGenAI } = await import('@google/genai');
  const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const imagePart = image
      ? {
          inlineData: {
            mimeType: image.type,
            data: Buffer.from(await image.arrayBuffer()).toString("base64"),
          },
        }
      : null;

    const contents = [imagePart, { text: prompt }].filter(Boolean) as any[];

    const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents
    });
    if (result.text) {
        return result.text;
    }
    console.error(result);
    console.error("No text in the response");
    throw new Error("No text in the response");
}

export const generateImage = async (prompt: string): Promise<Blob> => {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set. Please provide a valid Gemini API key in your environment.');
  }
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const contents = prompt;

  // Set responseModalities to include "Image" so the model can generate an image
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: contents,
    config: {
      // Use string literals to avoid importing enum types at top-level
      responseModalities: ['TEXT', 'IMAGE'] as any,
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    // Based on the part type, either show the text or return the image as blob
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data || '';
      const buffer = Buffer.from(imageData, "base64");
      return new Blob([buffer], { type: 'image/png' });
    }
  }
  
  throw new Error("No image generated in the response");
}

async function saveWaveFile(
   filename: string,
   pcmData: Buffer,
   channels = 1,
   rate = 24000,
   sampleWidth = 2,
) {
  const wav = (await import('wav')).default as any;
   return new Promise((resolve, reject) => {
      const writer = new wav.FileWriter(filename, {
            channels,
            sampleRate: rate,
            bitDepth: sampleWidth * 8,
      });

      writer.on('finish', resolve);
      writer.on('error', reject);

      writer.write(pcmData);
      writer.end();
   });
}

export async function generateAudio(prompt: string, characters: { name: string, voice: string }[]): Promise<string> {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  // const fname= 'output.wav';
  // const audio=fs.readFileSync(fname);
  // return audio;
   const speakerVoiceConfigs = characters.map((character) => ({
      speaker: character.name,
      voiceConfig: {
         prebuiltVoiceConfig: { voiceName: character.voice }
      }
   }));


   const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      // @ts-ignore
      contents: [{ parts: [{ text: prompt }] }],
      config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
               multiSpeakerVoiceConfig: {
                  speakerVoiceConfigs: speakerVoiceConfigs,
               }
            }
      }
   });

   const data = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
   const audioBuffer = Buffer.from(data || '', 'base64');

   const id = crypto.randomUUID();

   const fileName = `output-${id}.wav`;
   await saveWaveFile(path.join(process.cwd(), "temp", fileName), audioBuffer);
   
   return id;
}

// console.log(await generate("Hello, how are you?"))                                                                                                                                                                                                                                                                                                                                          