
import axios from 'axios';


const instance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
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

// 로그인 API도 인스턴스로 호출
export function loginMember(email, password) {
  return instance.post('/member/login', {email, password} );
}

// 토큰 붙여서 API 호출할 때도 인스턴스 사용
instance.get('/board/list')
  .then(response => { console.log("보드 불러옴");
  })
  .catch(error => {
    console.error('에러!', error);
  });

export default instance;  // 필요하면 인스턴스 export

export function fetchBoardList(page = 0, size = 10) {
  return instance.get('/board/list', { params: { page, size } });
}