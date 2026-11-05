import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Layout from './components/Layout';
import Questions from './components/Questions';
import QuestionDetail from './components/QuestionDetail';
import NotFound from './components/NotFound';

function App() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get('/data/questions.json', { signal: controller.signal })
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return; // Request bị hủy thì bỏ qua
        }
        setError('Không tải được câu hỏi');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Route con index (Trang chủ tạm để h2 tiêu đề) */}
        <Route index element={<h2>Trang chủ</h2>} />

        {/* Các route của bài sau tạm để h2 */}
        <Route path="play" element={<h2>Màn hình thi</h2>} />
        <Route path="result" element={<h2>Kết quả</h2>} />
        <Route path="history" element={<h2>Lịch sử</h2>} />

        {/* Routes của Bài 1 */}
        <Route
          path="questions"
          element={
            loading ? (
              <p>Đang tải câu hỏi...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Questions questions={questions} />
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

        {/* Route bắt tất cả các đường dẫn khác */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;