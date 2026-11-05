import React from 'react';

const Helpers = ({
  status,
  usedHelpers,
  onRemoveOneWrong,
  onAddExtraTime,
  isLifebuoyActive,
  onToggleLifebuoy
}) => {
  const isAnswering = status === 'answering';

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
      <button
        type="button"
        disabled={!isAnswering || usedHelpers.removeWrong}
        onClick={onRemoveOneWrong}
        style={{
          padding: '8px 14px',
          cursor: !isAnswering || usedHelpers.removeWrong ? 'not-allowed' : 'pointer',
          backgroundColor: usedHelpers.removeWrong ? '#e0e0e0' : '#17a2b8',
          color: usedHelpers.removeWrong ? '#888' : '#fff',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Loại 1 đáp án
      </button>

      <button
        type="button"
        disabled={!isAnswering || usedHelpers.extraTime}
        onClick={onAddExtraTime}
        style={{
          padding: '8px 14px',
          cursor: !isAnswering || usedHelpers.extraTime ? 'not-allowed' : 'pointer',
          backgroundColor: usedHelpers.extraTime ? '#e0e0e0' : '#ffc107',
          color: usedHelpers.extraTime ? '#888' : '#000',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Thêm 15 giây
      </button>

      <button
        type="button"
        disabled={!isAnswering || usedHelpers.lifebuoy}
        onClick={onToggleLifebuoy}
        style={{
          padding: '8px 14px',
          cursor: !isAnswering || usedHelpers.lifebuoy ? 'not-allowed' : 'pointer',
          backgroundColor: usedHelpers.lifebuoy
            ? '#e0e0e0'
            : isLifebuoyActive
            ? '#fd7e14'
            : '#20c997',
          color: usedHelpers.lifebuoy ? '#888' : '#fff',
          border: 'none',
          borderRadius: '4px',
          fontWeight: isLifebuoyActive ? 'bold' : 'normal'
        }}
      >
        {isLifebuoyActive ? 'Phao đang bật' : 'Phao cứu sinh'}
      </button>
    </div>
  );
};

export default Helpers;