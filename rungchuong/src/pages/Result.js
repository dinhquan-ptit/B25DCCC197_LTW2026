import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { playerName, score, rank, correctCount, reason } = state;

  let messageTitle = '';
  if (reason === 'win') {
    messageTitle = 'Chúc mừng! Bạn đã rung chuông vàng (đúng cả 15 câu)';
  } else if (reason === 'wrong') {
    messageTitle = 'Bạn đã bị loại (trả lời sai)';
  } else if (reason === 'timeout') {
    messageTitle = 'Hết giờ!';
  } else if (reason === 'completed') {
    messageTitle = 'Bạn đã hoàn thành 15 câu (Bài 3)';
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', textAlign: 'center', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2 style={{ color: reason === 'win' ? '#28a745' : '#d32f2f' }}>{messageTitle}</h2>
      
      <div style={{ margin: '20px 0', fontSize: '18px', lineHeight: '1.8', textAlign: 'left', padding: '0 30px' }}>
        <p><strong>Người chơi:</strong> {playerName}</p>
        <p><strong>Số câu trả lời đúng:</strong> {correctCount}</p>
        <p><strong>Điểm:</strong> {score}</p>
        <p><strong>Danh hiệu:</strong> {rank}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button
          onClick={() => navigate('/play')}
          style={{ padding: '10px 18px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Chơi lại
        </button>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px 18px', fontSize: '16px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;