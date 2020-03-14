import jwt from 'jsonwebtoken';
import { SIGN_IN } from './routes';

class ApiStore {
  baseApiUrl = process.env.REACT_APP_API_URL;

  token = localStorage.getItem('token');

  refresh = localStorage.getItem('refresh');

  checkToken = (token = this.token) => {
    try {
      const { exp } = jwt.decode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      }
    } catch (_error) {
      return false;
    }
    return true;
  };

  refreshToken = async () => {
    if (this.checkToken(this.refresh)) {
      this.logout();
      return false;
    }
    try {
      const { access } = await this.apiRequest(
        'refresh/',
        { method: 'POST', body: JSON.stringify({ refresh: this.refresh }) },
        false
      );
      this.token = access;
      localStorage.setItem('token', access);
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  };

  apiRequest = (endpoint, options, useToken = true) => {
    if (useToken) {
      if (!this.checkToken()) {
        if (!this.refreshToken()) {
          return false;
        }
      }
    }
    return fetch(`${this.baseApiUrl}/${endpoint}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: useToken ? `Bearer ${this.token}` : undefined
      }
    }).then(async response => {
      const data = await response.json();
      if (!response.ok) {
        throw data;
      } else {
        return data;
      }
    });
  };

  login = (username, password) => {
    return this.apiRequest(
      'token/',
      {
        method: 'POST',
        body: JSON.stringify({ username, password })
      },
      false
    ).then(data => {
      const { access, refresh } = data;
      this.token = access;
      this.refresh = refresh;
      localStorage.setItem('token', access);
      localStorage.setItem('refresh', refresh);
      return access;
    });
  };

  logout = () => {
    this.token = null;
    localStorage.removeItem('token');
    window.location.replace(SIGN_IN);
  };

  getParties = () => {
    return this.apiRequest('parties/').then(data => {
      console.log(data);
    });
  };
}

const singelton = new ApiStore();

export default singelton;
