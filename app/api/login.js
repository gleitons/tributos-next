export default function handler(req, res) {
    const { method } = req;
    const { password } = req.body;
    console.log(password)
    if (method === 'POST') {
        const serverPass = process.env.PASS;

        if (password === serverPass) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false, message: 'Senha incorreta' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
