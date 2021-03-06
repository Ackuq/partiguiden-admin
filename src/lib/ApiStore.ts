import jwt from 'jsonwebtoken';
import { Party } from '../types/parties';
import { Standpoint } from '../types/standpoints';
import { Subject } from '../types/subjects';
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

export const refreshToken = async (): Promise<boolean> => {
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

    const data =
      contentType && contentType.indexOf('application/json') !== -1
        ? await response.json()
        : await response.text();

    if (!response.ok) {
      throw data;
    } else {
      return data;
    }
  });
};

export const login = (username: string, password: string): Promise<string> => {
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

export const logout = (): void => {
  token = '';
  localStorage.removeItem('token');
  window.location.replace(SIGN_IN);
};

/**** Api requests ****/

/* Party requests */
export const getParties = (): Promise<Array<Party>> => apiRequest('parties/');

export const deleteParty = (id: string): Promise<void> =>
  apiRequest(`parties/${id}`, { method: 'DELETE' });

export const createParty = (data: { name: string; id: string }): Promise<Party> =>
  apiRequest(`parties/`, { method: 'POST', body: JSON.stringify(data) });

/* Subject requests */
export const getSubjects = (): Promise<Array<Subject>> => apiRequest('subjects/');

export const createSubject = (data: {
  name: string;
  related_subject: Array<number>;
}): Promise<Subject> => apiRequest(`subjects/`, { method: 'POST', body: JSON.stringify(data) });

export const deleteSubject = (id: number): Promise<void> =>
  apiRequest(`subjects/${id}`, { method: 'DELETE' });

/* Standpoint requests */
export const getStandpoints = (uncategroized: boolean): Promise<Array<Standpoint>> => {
  const params = new URLSearchParams();
  if (uncategroized) {
    params.append('uncategroized', uncategroized.toString());
  }
  return apiRequest(`standpoints/?${params.toString()}`);
};

export const updatePartyStandpoints = (id: string): Promise<Array<Standpoint>> => {
  const params = new URLSearchParams();
  params.append('party', id);
  return apiRequest(`standpoints/update_standpoints/?${params.toString()}`);
};

export const updateStandpointCategory = (id: string, subject: string | null): Promise<Standpoint> =>
  apiRequest(`standpoints/${id}/`, { method: 'PATCH', body: JSON.stringify({ subject }) });
