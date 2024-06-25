import { SetStateAction, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState<{ id: number; text: string; sender: string; }[]>([]);
  const [input, setInput] = useState('');

const handleSend = async () => {
  if (input.trim() !== '') {
    const newUserMessage = {
      id: messages.length, 
      text: input, 
      sender: 'user'
    };
    setMessages(messages => [...messages, newUserMessage]);
    setInput(''); // テキストボックスをクリア

    // OpenAI APIへのリクエストを設定
    const bearerToken = import.meta.env.VITE_OPENAI_API_KEY;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // ここにあなたのOpenAI APIキーを設定してください
        'Authorization': 'Bearer ' + bearerToken
      },
      body: JSON.stringify({
        model: 'gpt-4', // 使用するモデル
        messages: [
          {
            role: 'user', 
            content: input
          }
        ],
        max_tokens: 50, // 生成するトークンの最大数
      })
    });

    if (response.ok) {
      const data = await response.json();
      // APIからの応答をメッセージリストに追加
      const botMessage = { 
        id: messages.length + 1, 
        text: data.choices[0].message.content, 
        sender: 'bot' 
      };
      setMessages(messages => [...messages, botMessage]);
    } else {
      // エラーハンドリング
      console.error('API request failed');
    }
  }
};
  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;