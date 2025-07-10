const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const charSets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
};

function generatePassword(length, sets) {
    let characters = '';
    if (sets.upper) characters += charSets.upper;
    if (sets.lower) characters += charSets.lower;
    if (sets.numbers) characters += charSets.numbers;
    if (sets.symbols) characters += charSets.symbols;

    if (characters.length === 0) return '';

    const bytes = crypto.randomBytes(length);
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters[bytes[i] % characters.length];
    }
    return password;
}

app.post('/generate', (req, res) => {
    const { length, sets } = req.body;
    if (!length || typeof sets !== 'object') {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const password = generatePassword(length, sets);
    res.json({ password });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
