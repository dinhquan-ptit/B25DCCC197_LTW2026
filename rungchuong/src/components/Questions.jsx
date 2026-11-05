import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOPICS, LEVELS } from '../data';

function Questions({ questions }) {
  const [selectedTopic, setSelectedTopic] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc theo chủ đề và từ khóa (không phân biệt hoa thường)
  const filteredQuestions = questions.filter((q) => {
    const matchTopic = selectedTopic === 'Tất cả' || q.topic === selectedTopic;
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTopic && matchSearch;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
        <div>
          <label>Chủ đề: </label>
          <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
            <option value="Tất cả">Tất cả</option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tìm kiếm: </label>
          <input
            type="text"
            placeholder="Nhập nội dung tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <p style={{ fontWeight: 'bold' }}>Có {filteredQuestions.length} câu hỏi</p>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ width: '50px' }}>STT</th>
            <th style={{ width: '120px' }}>Chủ đề</th>
            <th style={{ width: '120px' }}>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => (
            <tr key={q.id}>
              <td align="center">{index + 1}</td>
              <td align="center">{q.topic}</td>
              <td align="center">{LEVELS[q.level]}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Questions;