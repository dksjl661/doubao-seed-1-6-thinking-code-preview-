const fetch = require('node-fetch');

async function testChat() {
    const url = 'http://localhost:3000/api/chat';

    const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello! Can you tell me a joke?' }
    ];

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: messages })
        });

        const data = await response.json();

        if (data.error) {
            console.log('❌ API Error:', data.error);
            console.log('💡 Tip: Check your OpenAI API key in the .env file');
        } else {
            console.log('✅ API Test Successful!');
            console.log('User:', messages[1].content);
            console.log('Bot:', data.message.content);
        }
    } catch (error) {
        console.log('❌ Network Error:', error.message);
        console.log('💡 Tip: Make sure the server is running and you have internet access');
    }
}

testChat();