const { generateText } = require("../services/omniRouteService");

async function generateContent(req, res, next) {
  try {
    const { brand, audience, platform, format, goal, tone } = req.body;
    if (!brand || !audience || !platform || !format || !goal) {
      return res.status(400).json({ message: "Brand, audience, platform, format, and goal are required." });
    }
    const content = await generateText({
      system: "You are a thoughtful marketing creative. Write specific, original, ready-to-edit campaign copy. Respect the requested platform and format. Do not invent product claims. Return the deliverable only, with a short headline when useful.",
      prompt: `Brand: ${String(brand).slice(0, 160)}\nAudience: ${String(audience).slice(0, 300)}\nPlatform: ${String(platform).slice(0, 80)}\nFormat: ${String(format).slice(0, 80)}\nGoal: ${String(goal).slice(0, 800)}\nTone: ${String(tone || "Clear and confident").slice(0, 100)}`,
      temperature: 0.75,
      maxTokens: 800
    });
    res.json({ content });
  } catch (error) { next(error); }
}

module.exports = { generateContent };
