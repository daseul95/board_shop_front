
import axios from 'axios';


const instance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');   // 토큰 키 이름 확인 필요
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 로그인 함수
export function loginMember(email, password) {
  return instance.post('/member/login', { email, password });
}

// ✅ 게시글 목록 불러오기
export function fetchBoardList(page = 0, size = 10) {
  return instance.get('/board/list', {
    params: { page, size },
  });
}

// ✅ 게시글 작성
export function postBoard(title, content) {
  return instance.post('/board/writedone', {
    title,
    content,
  });
}

// ✅ 인스턴스 export (다른 곳에서 직접 axios 호출하고 싶을 경우)
export default instance;