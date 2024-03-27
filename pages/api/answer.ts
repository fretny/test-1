import axios from "axios";

export const config = {
  runtime: "edge"
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { prompt, apiKey } = (await req.json()) as { prompt: string; apiKey: string; };
    const response = await axios.get('https://worker-late-brook-1e7e.nezyam96.workers.dev/?prompt=' + prompt);
    
    // Check if the response data is a ReadableStream
    if (response.data instanceof ReadableStream) {
      return new Response(response.data);
    } else {
      // If not, convert it to a string
      return new Response(String(response.data));
    }
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
};

export default handler;
