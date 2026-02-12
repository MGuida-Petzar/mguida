export default async function handler(req, res) {
    // Only allow POST requests from your site
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // This pulls from the secret "vault" we will set up in Vercel
    const webhookURL = process.env.DISCORD_URL;

    if (!webhookURL) {
        return res.status(500).json({ error: 'Server configuration missing' });
    }

    try {
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: "Failed to reach Discord" });
    }
}
