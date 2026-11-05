import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  const isButtonDisabled = !playerName || playerName.trim() === '';
  let recordText = null;
  if (history && history.length > 0) {
    const highestRecord = [...history].sort((a, b) => b.score - a.score)[0];
    recordText = `Kỷ lục: ${highestRecord.score} điểm – ${highestRecord.name}`;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Rung chuông vàng</h1>

      {recordText && (
        <div style={{ margin: '12px 0', fontSize: '18px', color: '#d9534f', fontWeight: 'bold' }}>
          {recordText}
        </div>
      )}

      <div style={{ textAlign: 'left', background: '#f8f9fa', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Luật chơi:</h3>
        <ul>
          <li>Trả lời lần lượt 15 câu hỏi về HTML, CSS, JavaScript và React.</li>
          <li>Mỗi câu có 20 giây suy nghĩ.</li>
          <li>Trả lời sai hoặc hết giờ bị loại ngay (trừ khi dùng phao cứu sinh).</li>
          <li>Đúng cả 15 câu thì rung chuông vàng với 300 điểm.</li>
        </ul>
      </div>

      <form onSubmit={handleStart}>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Nhập tên người chơi..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{ padding: '10px 14px', width: '70%', fontSize: '16px' }}
          />
        </div>
        <button
          type="submit"
          disabled={isButtonDisabled}
          style={{
            padding: '10px 24px',
            fontSize: '16px',
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            backgroundColor: isButtonDisabled ? '#ccc' : '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Vào thi
        </button>
      </form>
    </div>
  );
};

export default Home;