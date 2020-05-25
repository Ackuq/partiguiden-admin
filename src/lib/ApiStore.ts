import jwt from 'jsonwebtoken';
import { SIGN_IN } from './routes';

const baseApiUrl = process.env.REACT_APP_API_URL as string;

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
    const contentType = response.headers.get('content-type');

    const data = (await (contentType && contentType.indexOf('application/json') !== -1))
      ? response.json()
      : response.text();
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

export const deleteParty = (id: number) => apiRequest(`parties/${id}`, { method: 'DELETE' });
export const createParty = (data: { name: string; abbreviation: string }) =>
  apiRequest(`parties/`, { method: 'POST', body: JSON.stringify(data) });

export const getSubjects = () => apiRequest('subjects/');

export const createSubject = (data: { name: string; related_subject: Array<number> }) =>
  apiRequest(`subjects/`, { method: 'POST', body: JSON.stringify(data) });

export const deleteSubject = (id: number) => apiRequest(`subjects/${id}`, { method: 'DELETE' });
