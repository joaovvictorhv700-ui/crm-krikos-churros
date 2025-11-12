import React, { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('dashboard');
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>CRM Kriko's Churros</h1>
      <nav>
        <button onClick={() => setPage('dashboard')}>Dashboard</button>
        <button onClick={() => setPage('produtos')}>Produtos</button>
        <button onClick={() => setPage('clientes')}>Clientes</button>
        <button onClick={() => setPage('pedidos')}>Pedidos</button>
      </nav>
      <hr />
      <div>{page === 'dashboard' && <p>Bem-vindo ao CRM da Kriko's Churros!</p>}</div>
    </div>
  );
}