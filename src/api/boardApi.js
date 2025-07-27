import instance from './axios.js

export function postBoard(title, content) {
  return instance.post('/board/writedone', { title, content });
}