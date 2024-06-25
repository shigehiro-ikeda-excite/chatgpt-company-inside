import { SetStateAction, useState } from 'react';
import './App.css';
import React from 'react';

function App() {
  const [messages, setMessages] = useState<{ id: number; text: string; role: string; }[]>([]);
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(1);

  interface TooltipProps {
    children: React.ReactNode;
    title: string;
  }

  const Tooltip = ({ children, title }: TooltipProps) => (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">{title}</span>
    </div>
  );

  const handleSend = async () => {
  if (input.trim() !== '') {
    const newMessages = [...messages, {
      id: messages.length, 
      text: input, 
      role: 'user'
    }];
    setMessages(newMessages);
    setInput(''); // テキストボックスをクリア
    setRows(1); // テキストボックスの行数をリセット

    // OpenAI APIへのリクエストを設定
    const bearerToken = import.meta.env.VITE_OPENAI_API_KEY;
    const sendMessages = newMessages.map((m) => ({
      role: m.role,
      content: m.text
    }));
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // ここにあなたのOpenAI APIキーを設定してください
        'Authorization': 'Bearer ' + bearerToken
      },
      body: JSON.stringify({
        model: 'gpt-4', // 使用するモデル
        messages: sendMessages,
        max_tokens: 2048, // 生成するトークンの最大数
      })
    });

    if (response.ok) {
      const data = await response.json();
      // APIからの応答をメッセージリストに追加
      const botMessage = { 
        id: messages.length + 1, 
        text: data.choices[0].message.content, 
        role: data.choices[0].message.role
      };
      setMessages(messages => [...messages, botMessage]);
    } else {
      // エラーハンドリング
      console.error('API request failed');
    }
  }
};
  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    const target = e.target;
    setInput(target.value);
  
    // 入力内容に基づいてrowsを計算
    // const lineHeight = 24; // 仮の行の高さ(px)
    const lines = (target.value as string).split('\n').length;
    const newRows = Math.max(lines, 1); // 最小でも1行は表示
    setRows(newRows);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault(); // デフォルトの改行を防ぐ
      handleSend();
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              {message.text.split('\n').map((line, index, array) => (
                <React.Fragment key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        <div className="input-area">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={rows}
            placeholder="メッセージを入力してください..."
          />
          <Tooltip title="[command]+[enter]">
            <button onClick={handleSend}>Send</button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default App;