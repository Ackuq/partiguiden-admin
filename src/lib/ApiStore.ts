import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Party } from '../types/parties';
import { Standpoint } from '../types/standpoints';
import { Subject, SubjectListEntry } from '../types/subjects';
import { SIGN_IN } from './routes';
import snackbarRef from './snackbarRef';

const baseApiUrl = process.env.REACT_APP_API_URL as string;

enum TokenKey {
  ACCESS = 'token',
  REFRESH = 'refresh',
}

const getToken = (key: TokenKey) => {
  return localStorage.getItem(key) || '';
};

const tokenIsValid = (currToken = getToken(TokenKey.ACCESS)) => {
  /* Local check that checks whether this token is expired or not */
  try {
    const decoded = jwtDecode<JwtPayload>(currToken);

    if (decoded && Date.now() >= (decoded?.exp ?? 0) * 1000) {
      return false;
    }
  } catch (_error) {
    return false;
  }
  return true;
};

export const logout = (): void => {
  localStorage.removeItem(TokenKey.ACCESS);
  localStorage.removeItem(TokenKey.REFRESH);
  window.location.replace(SIGN_IN);
};

const makeRequest = (endpoint: string, options?: RequestInit, useToken?: boolean) => {
  return fetch(`${baseApiUrl}/${endpoint}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: useToken ? `Bearer ${getToken(TokenKey.ACCESS)}` : '',
    },
  }).then(async (response) => {
    const contentType = response.headers.get('content-type');

    const data =
      contentType && contentType.indexOf('application/json') !== -1
        ? await response.json()
        : await response.text();

    if (!response.ok) {
      snackbarRef.current?.updateSnack({ severity: 'error', text: response.statusText });
      throw data;
    } else {
      return data;
    }
  });
};

export const refreshToken = async (): Promise<boolean> => {
  if (!tokenIsValid(getToken(TokenKey.REFRESH))) {
    logout();
    return false;
  }
  try {
    const { access } = await makeRequest(
      'refresh/',
      { method: 'POST', body: JSON.stringify({ refresh: getToken(TokenKey.REFRESH) }) },
      false
    );
    localStorage.setItem(TokenKey.ACCESS, access);
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
        throw new Error('Could not authenticate');
      }
    }
  }
  return makeRequest(endpoint, options, useToken);
};

export const isAuthenticated = (): boolean => !!getToken(TokenKey.ACCESS);

export const login = (username: string, password: string): Promise<string> => {
  return apiRequest(
    'token/',
    {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    },
    false
  ).then((data) => {
    const { access } = data;
    const { refresh } = data;
    localStorage.setItem(TokenKey.ACCESS, access);
    localStorage.setItem(TokenKey.REFRESH, refresh);
    snackbarRef.current?.updateSnack({ severity: 'success', text: 'Logged in successfully' });
    return access;
  });
};

/** ** Api requests *** */

/* Party requests */
export const getParties = (): Promise<Array<Party>> => apiRequest('parties/');

export const deleteParty = (id: string): Promise<void> =>
  apiRequest(`parties/${id}`, { method: 'DELETE' });

export const updateParty = (id: string, data: { name: string }): Promise<Party> =>
  apiRequest(`parties/${id}/`, { method: 'PUT', body: JSON.stringify(data) });

export const createParty = (data: { name: string; id: string }): Promise<Party> =>
  apiRequest(`parties/`, { method: 'POST', body: JSON.stringify(data) });

/* Subject requests */
export const getSubjects = (): Promise<Array<SubjectListEntry>> => apiRequest('subjects/');

interface SubjectData {
  name: string;
  related_subjects_ids: Array<number>;
}

export const createSubject = (data: SubjectData): Promise<Subject> =>
  apiRequest(`subjects/`, { method: 'POST', body: JSON.stringify(data) });

export const updateSubject = (id: number, data: SubjectData): Promise<Subject> =>
  apiRequest(`subjects/${id}/`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteSubject = (id: number): Promise<void> =>
  apiRequest(`subjects/${id}/`, { method: 'DELETE' });

/* Standpoint requests */
export const getStandpoints = (uncategorized: boolean): Promise<Array<Standpoint>> => {
  const params = new URLSearchParams();
  if (uncategorized) {
    params.append('uncategorized', uncategorized.toString());
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

export const deleteStandpoint = (id: string): Promise<void> =>
  apiRequest(`standpoints/${id}`, { method: 'DELETE' });
