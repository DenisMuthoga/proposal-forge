import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  // Using gemini-2.5-flash which is guaranteed available
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

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
        Generate EXACTLY 1 high-potential, unique SaaS idea for that niche. 
        Return ONLY a pure JSON object containing: "title" (string) and "desc" (1-2 sentence string). 
        Do not include markdown formatting or backticks.
        
        User Niche: ${idea}`;
    } else {
        prompt = `You are a SaaS market expert. Goal: Perform an exhaustive deep-dive validation for this idea and return a comprehensive, data-rich JSON launch blueprint.
        Idea: ${idea}
        Return ONLY valid JSON with this exact structure:
        {
          "marketDemandScore": number (0-10),
          "successProbability": number (0-100),
          "verdict": "Go" | "No Go",
          "granularScores": {
            "technicalComplexity": number (0-10),
            "timeToMarket": number (0-10),
            "scalability": number (0-10),
            "defensibility": number (0-10)
          },
          "marketGap": "A detailed explanation of the underserved market need this fills.",
          "swot": {
            "strengths": [string],
            "weaknesses": [string],
            "opportunities": [string],
            "threats": [string]
          },
          "userPersona": {
            "name": string,
            "painPoints": [string],
            "motivation": string
          },
          "competitors": [ { "name": string, "weakness": string } ],
          "pricing": [ { "tier": string, "price": string, "target": string } ],
          "revenueStreams": [string],
          "features": [ string ],
          "techStack": { "frontend": string, "backend": string, "database": string, "hosting": string },
          "landingPageCopy": { "hero": string, "subheadline": string, "cta": string },
          "launchPlan": [ string ],
          "analysis": "A compelling, data-backed justification of exactly WHY this idea is high-potential (or high-risk), focusing on the specific market gap and timing."
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
        console.error('Unexpected Gemini Response Structure:', JSON.stringify(result, null, 2));
        throw new Error('No content received from Gemini');
    }

    // More robust JSON extraction
    let cleanJSON = text.trim();
    
    // Attempt to find the first '{' or '[' and the last '}' or ']'
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
        console.log('Final cleanJSON length:', cleanJSON.length);
        const parsed = JSON.parse(cleanJSON);

        if (flow === 'brainstorm') {
            const ideaArray = Array.isArray(parsed) ? parsed : (parsed.ideas ? (Array.isArray(parsed.ideas) ? parsed.ideas : [parsed.ideas]) : [parsed]);
            return NextResponse.json({ ideas: ideaArray });
        }
        
        return NextResponse.json({ blueprint: parsed });
    } catch (parseError) {
        console.error('Failed to parse Gemini JSON. Raw text preview:', text.substring(0, 200));
        console.error('Cleaned JSON preview:', cleanJSON.substring(0, 200));
        throw new Error('Malformed analysis data. Please try again.');
    }

  } catch (error) {
    console.error('Generation Failed:', error);
    return NextResponse.json({ error: 'Failed to generate analysis' }, { status: 500 });
  }
}

