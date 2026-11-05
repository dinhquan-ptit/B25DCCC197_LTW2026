import React from 'react';

const History = ({ history, onClearHistory }) => {
  const sortedHistory = [...history].sort((a, b) => b.score - a.score);

  const totalPlays = sortedHistory.length;
  const highestScore = totalPlays > 0 ? sortedHistory[0].score : 0;
  const averageScore =
    totalPlays > 0
      ? Math.round(sortedHistory.reduce((sum, h) => sum + h.score, 0) / totalPlays)
      : 0;

  return (
    <div>
      <h2>Lịch sử các lượt chơi</h2>

      {totalPlays === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <>
          <div style={{ marginBottom: '16px', lineHeight: '1.8' }}>
            <p><strong>Số lượt chơi:</strong> {totalPlays}</p>
            <p><strong>Điểm cao nhất:</strong> {highestScore}</p>
            <p><strong>Điểm trung bình:</strong> {averageScore}</p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={onClearHistory}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Xóa lịch sử
            </button>
          </div>

          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th>STT</th>
                <th>Người chơi</th>
                <th>Số câu đúng</th>
                <th>Điểm</th>
                <th>Danh hiệu</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {sortedHistory.map((item, idx) => (
                <tr key={item.id}>
                  <td align="center">{idx + 1}</td>
                  <td>{item.name}</td>
                  <td align="center">{item.correctCount}</td>
                  <td align="center"><strong>{item.score}</strong></td>
                  <td align="center">{item.rank}</td>
                  <td align="center">{item.playedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default History;