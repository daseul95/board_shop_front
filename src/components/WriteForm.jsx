import React, { useState } from 'react';
import { postBoard } from '../api/axios';
import { useNavigate } from 'react-router-dom';


const WriteForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postBoard(title, content);
      // 작성 완료 후 목록 페이지로 이동
      navigate('/board/list');
    } catch (err) {
      console.error('작성 실패:', err);
      alert('작성 중 오류가 발생했습니다.');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        required
      />
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        required
      />
      <br />
      <button type="submit" onClick={handleSubmit} >작성</button>
    </form>
  );
}

export default WriteForm;