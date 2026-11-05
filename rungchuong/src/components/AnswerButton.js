import React from 'react';
import { LETTERS } from '../data';

const AnswerButton = ({ index, option, selectedOption, status, onSelect }) => {
  let btnColor = '#f5f5f5';
  let textColor = '#000';

  if (status === 'locked') {
    if (selectedOption === index) {
      btnColor = '#ffeb3b'; // Màu vàng (đang chốt)
    }
  } else if (status === 'revealed') {
    if (selectedOption === index) {
      btnColor = '#f44336'; // Chọn sai tô đỏ (nếu đúng sẽ bị ghi đè phía dưới)
      textColor = '#fff';
    }
  }

  return (
    <button
      disabled={status !== 'answering'}
      onClick={() => onSelect(index)}
      style={{
        padding: '16px',
        fontSize: '16px',
        textAlign: 'left',
        backgroundColor: btnColor,
        color: textColor,
        border: '1px solid #ccc',
        borderRadius: '6px',
        cursor: status === 'answering' ? 'pointer' : 'default',
        fontWeight: selectedOption === index ? 'bold' : 'normal'
      }}
    >
      <strong>{LETTERS[index]}.</strong> {option}
    </button>
  );
};

export default AnswerButton;