import React from 'react';

export default function Pagination({ nowPage, totalPages, onPageChange }) {
  const startPage = Math.max(nowPage - 4, 1);
  const endPage = Math.min(nowPage + 9, totalPages);

  const pages = [];
  for(let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '8px' }}>
        {pages.map(page => (
          <li key={page}>
            <button
              style={{
                padding: '6px 12px',
                backgroundColor: page === nowPage ? '#4A90E2' : '#eee',
                color: page === nowPage ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}