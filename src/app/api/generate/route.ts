import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: Request) {
  try {
    const { idea, flow } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'Missing idea' }, { status: 400 });
    }

    let prompt = '';
    
    if (flow === 'brainstorm') {
        prompt = `You are an expert SaaS builder and market analyst. The user gives you a niche/prompt. 
        Generate EXACTLY 3 high-potential SaaS ideas for that niche. 
        Return ONLY a pure JSON array of objects, each containing: "title" (string) and "desc" (1 sentence string). 
        Do not include markdown formatting or backticks.
        
        User Niche: ${idea}`;
    } else {
        prompt = `You are an expert SaaS Go-to-Market strategist. The user gives you an idea for a business or software product.
        You must output ONLY valid JSON describing a complete validation blueprint. NO markdown headers, NO backticks.
        The JSON must perfectly match this structure:
        {
          "marketDemandScore": number (0-100),
          "successProbability": number (0-100),
          "verdict": "Go" | "No Go",
          "competitors": [ { "name": string, "weakness": string } ],
          "pricing": [ { "tier": string, "price": string, "target": string } ],
          "features": [ string ],
          "techStack": { "frontend": string, "backend": string, "database": string },
          "landingPageCopy": { "hero": string, "subheadline": string },
          "launchPlan": [ string (step by step) ],
          "analysis": "A detailed 4-sentence reason for this verdict."
        }
        
        Generate a validation blueprint for this idea: ${idea}`;
    }

    const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 2048,
                responseMimeType: "application/json",
            }
        })
    });

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
        throw new Error('No content received from Gemini');
    }

    const parsed = JSON.parse(text);

    if (flow === 'brainstorm') {
        return NextResponse.json({ ideas: parsed });
    }
    
    return NextResponse.json({ blueprint: parsed });

  } catch (error) {
    console.error('Generation Failed:', error);
    return NextResponse.json({ error: 'Failed to generate analysis' }, { status: 500 });
  }
}

