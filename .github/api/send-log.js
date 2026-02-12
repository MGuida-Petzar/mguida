export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // This pulls the URL from your Vercel Dashboard "Environment Variables"
    const webhookURL = process.env.DISCORD_URL;

    if (!webhookURL) {
        return res.status(500).json({ error: 'Webhook URL not configured on server' });
    }

    try {
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
