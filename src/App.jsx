import React, { useState } from 'react';
import { loginMember } from './api/axios.js';
import BoardList from './components/BoardList';

function App() {
    console.log("✅ App 컴포넌트 마운트됨!");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit 호출, 이메일:', email, '비밀번호:', password);


    try {
      const response = await loginMember(email,password);
      console.log('로그인 성공:', response.data);
      const token = response.data.accessToken || response.data.token;
      if (token) {
            localStorage.setItem('accessToken', token); // 토큰 저장
            setIsLoggedIn(true);
          } else {
            alert('로그인에 실패했습니다: 토큰이 없습니다.');
          }
        } catch (error) {
          alert('로그인 실패!');
        }
      };


  if (isLoggedIn) {
      return <BoardList />;
    }


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

export default App;

