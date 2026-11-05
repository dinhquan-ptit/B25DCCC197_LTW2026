import React from 'react';

const ScoreBoard = ({ score, currentQuestionIndex, answers }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>
        {`Điểm: ${score}`}
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {Array.from({ length: 15 }, (_, i) => {
          const answer = answers[i];
          const isCorrect = answer && answer.correct;
          const isCurrent = i === currentQuestionIndex;

          return (
            <div
              key={i}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isCorrect ? '#4caf50' : '#e0e0e0',
                color: isCorrect ? '#fff' : '#000',
                border: isCurrent ? '3px solid #000' : '1px solid #bbb',
                fontWeight: isCurrent ? 'bold' : 'normal',
                borderRadius: '4px'
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBoard;