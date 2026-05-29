import dotenv from "dotenv";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
dotenv.config();


const client = new ModelClient(
    "https://models.inference.ai.azure.com",
    new AzureKeyCredential(process.env.GITHUB_TOKEN)
);
async function aiDetect(text) {
    const response = await client.path("/chat/completions").post({
        body: {
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are a tag extractor for a developer activity tracker.
                    Return ONLY a raw JSON array of tags. No explanation, no markdown.
                    Use short tags like: JavaScript, Python, MongoDB, AWS Lambda,
                    React Native, Node.js, Express.js, Auth, API, Backend, 
                    Frontend, Debugging, Testing, DevOps.`
                },
                {
                    role: "user",
                    content: `Extract tags from this coding session note: "${text}"`
                }
            ],
            max_tokens: 150
        }
    });

    const raw = response.body.choices[0].message.content.trim();
    const clean = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
}

export { aiDetect };