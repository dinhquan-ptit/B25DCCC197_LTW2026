import React from 'react';

const Timer = ({ timeLeft }) => {
  return (
    <div style={{ fontSize: '18px', fontWeight: 'bold', color: timeLeft <= 5 ? 'red' : 'inherit' }}>
      {`Còn ${timeLeft} giây`}
    </div>
  );
};

export default Timer;