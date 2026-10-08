const DEFAULT_MODEL = "openai/gpt-4o-mini";

async function generateText({ system, prompt, temperature = 0.7, maxTokens = 700 }) {
  const apiKey = process.env.OMNIROUTE_API_KEY;
  if (!apiKey) {
    const error = new Error("AI generation is not configured. Add OMNIROUTE_API_KEY to backend/.env.");
    error.status = 503;
    throw error;
  }

  const baseUrl = (process.env.OMNIROUTE_BASE_URL || "https://api.omniroute.ai/v1").replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OMNIROUTE_MODEL || DEFAULT_MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt }
      ],
      temperature,
      max_tokens: maxTokens
    })
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error?.message || `OmniRoute returned ${response.status}`);
    error.status = response.status >= 500 ? 502 : response.status;
    throw error;
  }
  const text = result.choices?.[0]?.message?.content;
  if (!text) throw new Error("The AI provider returned an empty response.");
  return text.trim();
}

module.exports = { generateText };
