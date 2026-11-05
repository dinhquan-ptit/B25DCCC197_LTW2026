import React from 'react';
import { LEVELS, LETTERS } from '../data';

const QuestionCard = ({ question, index, total, selectedOption, status, onSelectOption }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
      <div style={{ fontSize: '18px', color: '#555', marginBottom: '8px' }}>
        {`Câu ${index + 1}/${total} · ${question.topic} · ${LEVELS[question.level]}`}
      </div>
      <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>{question.question}</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {question.options.map((option, idx) => {
          let btnColor = '#f5f5f5';
          let textColor = '#000';

          if (status === 'locked') {
            if (selectedOption === idx) btnColor = '#ffeb3b';
          } else if (status === 'revealed') {
            if (idx === question.answer) {
              btnColor = '#4caf50';
              textColor = '#fff';
            } else if (selectedOption === idx) {
              btnColor = '#f44336';
              textColor = '#fff';
            }
          }

          return (
            <button
              key={idx}
              disabled={status !== 'answering'}
              onClick={() => onSelectOption(idx)}
              style={{
                padding: '16px',
                fontSize: '16px',
                textAlign: 'left',
                backgroundColor: btnColor,
                color: textColor,
                border: '1px solid #ccc',
                borderRadius: '6px',
                cursor: status === 'answering' ? 'pointer' : 'default',
                fontWeight: selectedOption === idx || (status === 'revealed' && idx === question.answer) ? 'bold' : 'normal'
              }}
            >
              <strong>{LETTERS[idx]}.</strong> {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;