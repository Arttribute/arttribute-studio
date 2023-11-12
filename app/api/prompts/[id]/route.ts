const API_KEY = "sd_wCUBhVtKdcA31jRAAedy7py5Vv4yrF";

export async function GET(request: Request) {
  console.log("get request");
  const { searchParams } = new URL(request.url);
  const prompt_id = searchParams.get("prompt_id");
  const model_id = searchParams.get("model_id");

  const res = await fetch(
    `https://api.astria.ai/tunes/${model_id}/prompts/${prompt_id}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
