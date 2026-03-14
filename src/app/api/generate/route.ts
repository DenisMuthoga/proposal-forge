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
        prompt = `You are a SaaS analyst. Goal: Validate this idea and return a JSON blueprint.
        Idea: ${idea}
        Return ONLY valid JSON with this structure:
        {
          "marketDemandScore": number,
          "successProbability": number,
          "verdict": "Go" | "No Go",
          "competitors": [ { "name": string, "weakness": string } ],
          "pricing": [ { "tier": string, "price": string, "target": string } ],
          "features": [ string ],
          "techStack": { "frontend": string, "backend": string, "database": string },
          "landingPageCopy": { "hero": string, "subheadline": string },
          "launchPlan": [ string ],
          "analysis": "3-sentence justification."
        }`;
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
    
    if (result.error) {
        console.error('Gemini API Error Response:', result.error);
        throw new Error(result.error.message || 'Gemini API call failed');
    }

    let text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
        console.error('Unexpected Gemini Response Structure:', JSON.stringify(result, null, 2));
        throw new Error('No content received from Gemini');
    }

    // Clean up potential markdown formatting from Gemini
    const cleanJSON = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
        const parsed = JSON.parse(cleanJSON);

        if (flow === 'brainstorm') {
            return NextResponse.json({ ideas: parsed });
        }
        
        return NextResponse.json({ blueprint: parsed });
    } catch (parseError) {
        console.error('Failed to parse Gemini JSON:', cleanJSON);
        throw new Error('Malformed analysis data. Please try again.');
    }

  } catch (error) {
    console.error('Generation Failed:', error);
    return NextResponse.json({ error: 'Failed to generate analysis' }, { status: 500 });
  }
}

