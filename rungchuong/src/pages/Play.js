import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION, EXTRA_TIME } from '../data';
import { calcScore, getRank } from '../utils';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import QuestionCard from '../components/QuestionCard';
import Helpers from '../components/Helpers';

const Play = ({ questions, playerName, onAddHistoryRecord }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [status, setStatus] = useState('answering');
  const [endReason, setEndReason] = useState(null);

  // Quản lý quyền trợ giúp
  const [usedHelpers, setUsedHelpers] = useState({
    removeWrong: false,
    extraTime: false,
    lifebuoy: false
  });
  const [isLifebuoyActive, setIsLifebuoyActive] = useState(false);
  const [hiddenOptionIndex, setHiddenOptionIndex] = useState(null);

  const currentQuestion = questions[currentIndex];
  const currentScore = calcScore(answers);
  useEffect(() => {
    document.title = `Câu ${currentIndex + 1}/15 – ${currentScore} điểm`;
    return () => {
      document.title = 'Rung chuông vàng';
    };
  }, [currentIndex, currentScore]);
  const handleSelectOption = useCallback(
    (index) => {
      if (status !== 'answering') return;
      if (index === hiddenOptionIndex) return; // Không cho chọn đáp án đã bị ẩn

      setSelectedOption(index);
      setStatus('locked');
    },
    [status, hiddenOptionIndex]
  );
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        handleSelectOption(Number(e.key) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSelectOption]);
  useEffect(() => {
    if (status !== 'answering') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSelectedOption(null);
          setEndReason('timeout');
          setStatus('locked');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);
  useEffect(() => {
    let timeoutId;

    if (status === 'locked') {
      timeoutId = setTimeout(() => {
        setStatus('revealed');
      }, 2000);
    } else if (status === 'revealed') {
      timeoutId = setTimeout(() => {
        const isCorrect = selectedOption === currentQuestion.answer;
        const savedByLifebuoy = !isCorrect && isLifebuoyActive;

        const newAnswers = [
          ...answers,
          {
            id: currentQuestion.id,
            level: currentQuestion.level,
            correct: isCorrect,
            usedLifebuoy: savedByLifebuoy
          }
        ];
        setAnswers(newAnswers);
        if (isLifebuoyActive) {
          setIsLifebuoyActive(false);
        }

        if (isCorrect || savedByLifebuoy) {
          if (currentIndex + 1 < questions.length) {
            // Còn câu tiếp theo
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
            setHiddenOptionIndex(null);
            setTimeLeft(TIME_PER_QUESTION);
            setStatus('answering');
          } else {
            const allCorrect = newAnswers.every((a) => a.correct);
            finishGame(newAnswers, allCorrect ? 'win' : 'completed');
          }
        } else {
          finishGame(newAnswers, endReason === 'timeout' ? 'timeout' : 'wrong');
        }
      }, 1500);
    }

    return () => clearTimeout(timeoutId);
  }, [
    status,
    selectedOption,
    currentQuestion,
    currentIndex,
    questions,
    answers,
    endReason,
    isLifebuoyActive
  ]);
  const handleRemoveOneWrong = () => {
    if (usedHelpers.removeWrong || status !== 'answering') return;
    const wrongIndices = currentQuestion.options
      .map((_, idx) => idx)
      .filter((idx) => idx !== currentQuestion.answer);

    const randomIndex = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
    setHiddenOptionIndex(randomIndex);
    setUsedHelpers((prev) => ({ ...prev, removeWrong: true }));
  };
  const handleAddExtraTime = () => {
    if (usedHelpers.extraTime || status !== 'answering') return;
    setTimeLeft((prev) => prev + EXTRA_TIME);
    setUsedHelpers((prev) => ({ ...prev, extraTime: true }));
  };
  const handleToggleLifebuoy = () => {
    if (usedHelpers.lifebuoy || status !== 'answering') return;
    setIsLifebuoyActive(true);
    setUsedHelpers((prev) => ({ ...prev, lifebuoy: true }));
  };
  const finishGame = (finalAnswers, reason) => {
    const finalScore = calcScore(finalAnswers);
    const correctCount = finalAnswers.filter((a) => a.correct).length;
    const rank = getRank(finalScore);

    // Lưu vào lịch sử
    const historyRecord = {
      id: Date.now(),
      name: playerName,
      score: finalScore,
      rank,
      correctCount,
      playedAt: new Date().toLocaleString('vi-VN')
    };
    onAddHistoryRecord(historyRecord);

    navigate('/result', {
      replace: true,
      state: {
        playerName,
        score: finalScore,
        rank,
        correctCount,
        reason
      }
    });
  };

  if (!currentQuestion) return <p>Đang tải câu hỏi...</p>;

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <Timer timeLeft={timeLeft} />
      </div>

      <Helpers
        status={status}
        usedHelpers={usedHelpers}
        onRemoveOneWrong={handleRemoveOneWrong}
        onAddExtraTime={handleAddExtraTime}
        isLifebuoyActive={isLifebuoyActive}
        onToggleLifebuoy={handleToggleLifebuoy}
      />

      <ScoreBoard
        score={currentScore}
        currentQuestionIndex={currentIndex}
        answers={answers}
      />

      <QuestionCard
        question={currentQuestion}
        index={currentIndex}
        total={questions.length}
        selectedOption={selectedOption}
        status={status}
        onSelectOption={handleSelectOption}
        hiddenOptionIndex={hiddenOptionIndex}
      />
    </div>
  );
};

export default Play;