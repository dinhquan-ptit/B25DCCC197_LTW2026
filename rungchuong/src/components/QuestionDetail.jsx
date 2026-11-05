import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, POINTS, LETTERS } from '../data';

function QuestionDetail({ questions }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <h2>Không tìm thấy câu hỏi</h2>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Câu hỏi số {question.id} – {question.topic} ({LEVELS[question.level]}, {POINTS[question.level]} điểm)
      </h2>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{question.question}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {question.options.map((option, idx) => {
          const isCorrect = idx === question.answer;
          return (
            <div
              key={idx}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: isCorrect ? '#c8e6c9' : '#fff',
                fontWeight: isCorrect ? 'bold' : 'normal'
              }}
            >
              {LETTERS[idx]}. {option} {isCorrect && '(Đáp án đúng)'}
            </div>
          );
        })}
      </div>

      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
}

export default QuestionDetail;