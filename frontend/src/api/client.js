const API = '/api';

const getToken = () => localStorage.getItem('token');

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (body) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),
  updateProfile: (body) =>
    request('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }),

  getPublicLeads: () => request('/leads/public'),
  getLeads: (params) => {
    const q = new URLSearchParams(params).toString();
    return request(`/leads?${q}`);
  },
  getLead: (id) => request(`/leads/${id}`),
  purchaseLead: (id) => request(`/leads/${id}/purchase`, { method: 'POST' }),
  toggleFavourite: (id) => request(`/leads/${id}/favourite`, { method: 'POST' }),
  createLead: (body) => request('/leads', { method: 'POST', body: JSON.stringify(body) }),
  updateLead: (id, body) =>
    request(`/leads/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteLead: (id) => request(`/leads/${id}`, { method: 'DELETE' }),

  getMyPurchases: (params) => {
    const q = new URLSearchParams(params).toString();
    return request(`/purchases/my?${q}`);
  },
  getPurchaseStats: () => request('/purchases/stats'),
  updatePurchase: (id, body) =>
    request(`/purchases/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  getAllPurchases: () => request('/purchases/all'),

  getAdminStats: () => request('/admin/stats'),
  getUsers: () => request('/admin/users'),
  updateUser: (id, body) =>
    request(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  getAdminLeads: () => request('/admin/leads'),

  getNotifications: () => request('/notifications'),
  markRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' }),
  markAllRead: () => request('/notifications/read-all', { method: 'PUT' }),

  subscribe: (email) =>
    request('/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) }),
};
