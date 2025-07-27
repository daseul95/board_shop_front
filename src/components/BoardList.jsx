import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchBoardList } from '../api/axios.js';
import Pagination from './Pagination';


function BoardList() {
  const [boards, setBoards] = useState([]);
   const [nowPage, setNowPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
useEffect(() => {
   setLoading(true);
    fetchBoardList(nowPage - 1, 10)
    .then(response => {
      const data = response.data;
        setBoards(data.content);
              setNowPage(data.number + 1);
              setTotalPages(data.totalPages);
      console.log('API 응답:', data);

      if (Array.isArray(data)) {
        setBoards(data);
      } else if (Array.isArray(data.content)) {
        setBoards(data.content);
      } else {
        setBoards([]);
      }
      setLoading(false);
    })
    .catch(err => {
      setError('게시판 목록을 불러오는데 실패했습니다.');
      setLoading(false);
    });
},[nowPage]);

 if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;



    return (
        <div>
      <table className="board-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.map(board => (
              <tr key={board.BoardId}>
                <td>{board.BoardId}</td>
                <td>{board.title}</td>
                <td>{board.content}</td>
                <td>작성일 정보 없음</td>
              </tr>
            ))}
          </tbody>
        </table>

         <Pagination nowPage={nowPage} totalPages={totalPages} onPageChange={setNowPage} />
       </div>
    );

  }

  export default BoardList;