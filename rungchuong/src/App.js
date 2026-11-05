import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Layout from './components/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import History from './pages/History';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';

const LOCAL_STORAGE_KEY = 'ltw_rcv_history';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  // 3. Tải câu hỏi từ public/data/questions.json
  useEffect(() => {
    const controller = new AbortController();

    axios
      .get('/data/questions.json', { signal: controller.signal })
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError('Không tải được câu hỏi');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const handleAddHistoryRecord = (record) => {
    setHistory((prev) => [record, ...prev]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Home
              playerName={playerName}
              setPlayerName={setPlayerName}
              history={history}
            />
          }
        />
        <Route
          path="play"
          element={
            !playerName.trim() ? (
              <Navigate to="/" replace />
            ) : loading ? (
              <p>Đang tải câu hỏi...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Play
                questions={questions}
                playerName={playerName}
                onAddHistoryRecord={handleAddHistoryRecord}
              />
            )
          }
        />
        <Route path="result" element={<Result />} />
        <Route
          path="history"
          element={
            <History
              history={history}
              onClearHistory={handleClearHistory}
            />
          }
        />
        <Route
          path="questions"
          element={
            loading ? (
              <p>Đang tải câu hỏi...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <QuestionBank questions={questions} />
            )
          }
        />
        <Route
          path="questions/:id"
          element={
            loading ? (
              <p>Đang tải câu hỏi...</p>
            ) : (
              <QuestionDetail questions={questions} />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;