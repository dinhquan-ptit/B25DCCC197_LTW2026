import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TIME_PER_QUESTION } from '../data';
import { calcScore, getRank } from '../utils';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import QuestionCard from '../components/QuestionCard';

const Play = ({ questions, playerName }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [status, setStatus] = useState('answering');
  const [endReason, setEndReason] = useState(null);

  const currentQuestion = questions[currentIndex];
  const currentScore = calcScore(answers);
  useEffect(() => {
    document.title = `Câu ${currentIndex + 1}/15 - Rung chuông vàng`;
    return () => {
      document.title = 'Rung chuông vàng';
    };
  }, [currentIndex]);
  const handleSelectOption = useCallback((index) => {
    if (status !== 'answering') return;
    setSelectedOption(index);
    setStatus('locked');
  }, [status]);

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
        const newAnswers = [
          ...answers,
          { id: currentQuestion.id, level: currentQuestion.level, correct: isCorrect }
        ];
        setAnswers(newAnswers);

        if (isCorrect) {
          if (currentIndex + 1 < questions.length) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedOption(null);
            setTimeLeft(TIME_PER_QUESTION);
            setStatus('answering');
          } else {
            finishGame(newAnswers, 'win');
          }
        } else {
          finishGame(newAnswers, endReason === 'timeout' ? 'timeout' : 'wrong');
        }
      }, 1500);
    }

    return () => clearTimeout(timeoutId);
  }, [status, selectedOption, currentQuestion, currentIndex, questions, answers, endReason]);

  const finishGame = (finalAnswers, reason) => {
    const finalScore = calcScore(finalAnswers);
    const correctCount = finalAnswers.filter((a) => a.correct).length;
    const rank = getRank(finalScore);

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
      />
    </div>
  );
};

export default Play;