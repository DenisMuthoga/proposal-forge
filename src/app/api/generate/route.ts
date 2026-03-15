import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'GEMINI_API_KEY_NOT_FOUND_IN_VERCEL_SETTINGS' }, { status: 500 });
  }

  try {
    const { idea, flow } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'Missing idea' }, { status: 400 });
    }

    let prompt = '';
    
    if (flow === 'brainstorm') {
        prompt = `You are an expert SaaS builder and market analyst. The user gives you a niche/prompt. 
        Generate EXACTLY 1 high-potential, unique SaaS idea for that niche. 
        Ensure the idea is highly realistic, grounded in current market needs, and written in simple, clear language.
        Return ONLY a pure JSON object containing: "title" (string) and "desc" (1-2 sentence string). 
        Do not include markdown formatting or backticks.
        
        User Niche: ${idea}`;
    } else {
        prompt = `You are a SaaS market expert. Goal: Perform an extremely accurate, exhaustive deep-dive validation for this idea.
        The analysis must be based on realistic, grounded data and presented in simple, easy-to-understand language for a first-time founder. 
        Avoid corporate jargon. Be direct and actionable.
        
        Idea: ${idea}
        
        Return ONLY valid JSON with this exact structure:
        {
          "marketDemandScore": number (0-10, be realistic),
          "successProbability": number (0-100, be extremely accurate based on competition/complexity),
          "verdict": "Go" | "No Go",
          "granularScores": {
            "technicalComplexity": number (0-10),
            "timeToMarket": number (0-10),
            "scalability": number (0-10),
            "defensibility": number (0-10)
          },
          "marketGap": "A simple, clear explanation of the underserved market need this fills.",
          "swot": {
            "strengths": [string],
            "weaknesses": [string],
            "opportunities": [string],
            "threats": [string]
          },
          "userPersona": {
            "name": string,
            "painPoints": [string],
            "motivation": "A simple statement on what drives this user."
          },
          "competitors": [ { "name": string, "weakness": "Simple explanation of why they are beatable" } ],
          "pricing": [ { "tier": string, "price": string, "target": string } ],
          "revenueStreams": [string],
          "marketSize": {
            "tam": { "value": string, "label": "Total Addressable Market", "desc": "Simple explanation" },
            "sam": { "value": string, "label": "Serviceable Addressable Market", "desc": "Simple explanation" },
            "som": { "value": string, "label": "Serviceable Obtainable Market", "desc": "Simple explanation" }
          },
          "features": [ string ],
          "techStack": { "frontend": string, "backend": string, "database": string, "hosting": string },
          "landingPageCopy": { "hero": string, "subheadline": string, "cta": string },
          "launchPlan": [ "Simple, actionable step" ],
          "analysis": "A compelling, data-backed justification of WHY this works, written in exceptionally clear and simple language, highlighting the specific market gap and current timing."
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
                maxOutputTokens: 8192,
                responseMimeType: "application/json",
            }
        })
    });

    const result = await response.json();
    
    if (result.error) {
        console.error('Gemini API Error Response:', JSON.stringify(result.error, null, 2));
        throw new Error(result.error.message || 'Gemini API call failed');
    }

    let text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
        throw new Error('No content received from Gemini');
    }

    let cleanJSON = text.trim();
    const firstBrace = cleanJSON.indexOf('{');
    const lastBrace = cleanJSON.lastIndexOf('}');

    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanJSON = cleanJSON.substring(firstBrace, lastBrace + 1);
    }
    
    const parsed = JSON.parse(cleanJSON);

    if (flow === 'brainstorm') {
        const ideaArray = Array.isArray(parsed) ? parsed : (parsed.ideas ? (Array.isArray(parsed.ideas) ? parsed.ideas : [parsed.ideas]) : [parsed]);
        return NextResponse.json({ ideas: ideaArray });
    }
    
    return NextResponse.json({ blueprint: parsed });

  } catch (error: any) {
    console.error('Generation Failed:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate analysis' }, { status: 500 });
  }
}
