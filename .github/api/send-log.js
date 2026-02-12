// This runs on the server, so the Webhook URL stays hidden!
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    // This is where you put your NEW Webhook URL
    // Better yet: Use an Environment Variable (process.env.DISCORD_URL)
    const webhookURL = "https://discord.com/api/webhooks/1471576235174789335/ML_7HJWuABSh1xRJOCzPppq3rknxkTW3u4_Lh0Cd2vJ3InHYRc1FjDbQVhtvxXfhMC3Z";

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send log' });
    }
}
