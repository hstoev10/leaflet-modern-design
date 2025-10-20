import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createGoogleGenerativeAI } from "npm:@ai-sdk/google";
import { streamText } from "npm:ai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!GOOGLE_AI_API_KEY) {
      throw new Error('GOOGLE_AI_API_KEY is not configured');
    }

    const google = createGoogleGenerativeAI({
      apiKey: GOOGLE_AI_API_KEY,
    });

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages: [
        {
          role: 'system',
          content: 'Ти си полезен асистент за уебсайт с брошури на превозни средства. Отговаряй на въпроси за превозни средства, брошури и помагай на потребителите.',
        },
        ...messages,
      ],
    });

    return result.toDataStreamResponse({
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
