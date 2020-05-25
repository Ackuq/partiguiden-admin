import jwt from 'jsonwebtoken';
import { SIGN_IN } from './routes';

const baseApiUrl = process.env.REACT_APP_API_URL || 'localhost:3001';

let token = localStorage.getItem('token') || '';
let refresh = localStorage.getItem('refresh') || '';

export const isAuthenticated = !!token;

const tokenIsValid = (currToken = token) => {
  try {
    const decoded = jwt.decode(currToken, { json: true });
    if (decoded && Date.now() >= decoded.exp * 1000) {
      return false;
    }
  } catch (_error) {
    return false;
  }
  return true;
};

export const refreshToken = async () => {
  if (!tokenIsValid(refresh)) {
    logout();
    return false;
  }
  try {
    const { access } = await apiRequest(
      'refresh/',
      { method: 'POST', body: JSON.stringify({ refresh }) },
      false
    );
    token = access;
    localStorage.setItem('token', access);
    return true;
  } catch (error) {
    logout();
    return false;
  }
};

const apiRequest = async (endpoint: string, options?: RequestInit, useToken = true) => {
  if (useToken) {
    if (!tokenIsValid()) {
      if (!(await refreshToken())) {
        return false;
      }
    }
  }
  return fetch(`${baseApiUrl}/${endpoint}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: useToken ? `Bearer ${token}` : '',
    },
  }).then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw data;
    } else {
      return data;
    }
  });
};

export const login = (username: string, password: string) => {
  return apiRequest(
    'token/',
    {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
    false
  ).then((data) => {
    token = data.access;
    refresh = data.refresh;
    localStorage.setItem('token', token);
    localStorage.setItem('refresh', refresh);
    return token;
  });
};

export const logout = () => {
  token = '';
  localStorage.removeItem('token');
  window.location.replace(SIGN_IN);
};

export const getParties = () => apiRequest('parties/');

export const getSubjects = () => apiRequest('subjects/');
