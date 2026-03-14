import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is missing from environment variables');
    return NextResponse.json({ error: 'AI configuration error' }, { status: 500 });
  }

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
        prompt = `You are a SaaS market expert. Goal: Validate this idea and return a comprehensive launch JSON blueprint.
        Idea: ${idea}
        Return ONLY valid JSON with this structure:
        {
          "marketDemandScore": number (0-10),
          "successProbability": number (0-100),
          "verdict": "Go" | "No Go",
          "competitors": [ { "name": string, "weakness": string } ],
          "pricing": [ { "tier": string, "price": string, "target": string } ],
          "features": [ string ],
          "techStack": { "frontend": string, "backend": string, "database": string },
          "landingPageCopy": { "hero": string, "subheadline": string },
          "launchPlan": [ string ],
          "analysis": "A compelling 3-sentence justification of exactly WHY this idea is high-potential, focusing on the specific market gap it fills and why now is the time to build it."
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

    // More robust JSON extraction
    let cleanJSON = text.trim();
    
    // If it looks like markdown, try to extract the content between backticks
    if (cleanJSON.includes('```')) {
        const match = cleanJSON.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
            cleanJSON = match[1].trim();
        }
    }

    // Attempt to find the first '{' or '[' and the last '}' or ']'
    // to handle cases where there might be preamble or postscript text
    const firstBrace = cleanJSON.indexOf('{');
    const firstBracket = cleanJSON.indexOf('[');
    const lastBrace = cleanJSON.lastIndexOf('}');
    const lastBracket = cleanJSON.lastIndexOf(']');

    let startIndex = -1;
    let endIndex = -1;

    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
        startIndex = firstBrace;
        endIndex = lastBrace;
    } else if (firstBracket !== -1) {
        startIndex = firstBracket;
        endIndex = lastBracket;
    }

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        cleanJSON = cleanJSON.substring(startIndex, endIndex + 1);
    }
    
    try {
        const parsed = JSON.parse(cleanJSON);

        if (flow === 'brainstorm') {
            return NextResponse.json({ ideas: Array.isArray(parsed) ? parsed : (parsed.ideas || []) });
        }
        
        return NextResponse.json({ blueprint: parsed });
    } catch (parseError) {
        console.error('Failed to parse Gemini JSON. Raw text:', text);
        console.error('Cleaned JSON attempt:', cleanJSON);
        throw new Error('Malformed analysis data. Please try again.');
    }

  } catch (error) {
    console.error('Generation Failed:', error);
    return NextResponse.json({ error: 'Failed to generate analysis' }, { status: 500 });
  }
}

