// API base — altere para o endereço do seu backend Render
const API = 'https://crm-krikos-churros.onrender.com/api'; // substitua pelo seu link

// Produtos
export async function fetchProducts() {
  return fetch(API + '/products').then(r => r.json());
}
export async function createProduct(p) {
  return fetch(API + '/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p)
  }).then(r => r.json());
}
export async function updateProductPrice(id, price) {
  return fetch(API + '/products/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ price })
  }).then(r => r.json());
}

// Clientes
export async function fetchCustomers() {
  return fetch(API + '/customers').then(r => r.json());
}
export async function createCustomer(c) {
  return fetch(API + '/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(c)
  }).then(r => r.json());
}

// Pedidos
export async function fetchOrders() {
  return fetch(API + '/orders').then(r => r.json());
}
export async function createOrder(o) {
  return fetch(API + '/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(o)
  }).then(r => r.json());
}
