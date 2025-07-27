import React, { useState } from 'react';
import { loginMember } from './api/axios.js';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WriteForm from './components/WriteForm'
import BoardList from './components/BoardList';

function App() {
    console.log("✅ App 컴포넌트 마운트됨!");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태


  const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const response = await loginMember(email, password);
       const token = response.data.accessToken || response.data.token;
       if (token) {
         localStorage.setItem('accessToken', token);
         setIsLoggedIn(true);
       } else {
         alert('로그인에 실패했습니다: 토큰이 없습니다.');
       }
     } catch (error) {
       alert('로그인 실패!');
     }
   };
   if (!isLoggedIn) {
       // 로그인 안 된 상태는 로그인 폼 보여줌
       return (
         <form onSubmit={handleSubmit}>
           <input
             type="text"
             placeholder="아이디"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />
           <input
             type="password"
             placeholder="비밀번호"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
           <button type="submit">로그인</button>
         </form>
       );
     }

  return (
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Navigate to="/board/list" />} />
         <Route path="/board/list" element={<BoardList />} />
         <Route path="/board/write" element={<WriteForm />} />
         {/* 필요하면 다른 라우트도 추가 */}
       </Routes>
     </BrowserRouter>
   );
 }

export default App;

