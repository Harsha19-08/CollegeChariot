const API_BASE_URL = process.env.REACT_APP_API_URL || '';

class UserApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'UserApiError';
    this.statusCode = statusCode;
  }
}

export const userService = {
  async login(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new UserApiError(response.status, 'Login failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof UserApiError) {
        throw error;
      }
      throw new UserApiError(500, 'Internal service error');
    }
  },

  async register(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new UserApiError(response.status, 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof UserApiError) {
        throw error;
      }
      throw new UserApiError(500, 'Internal service error');
    }
  },

  async getCurrentUser() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new UserApiError(response.status, 'Failed to fetch user');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof UserApiError) {
        throw error;
      }
      throw new UserApiError(500, 'Internal service error');
    }
  },

  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new UserApiError(response.status, 'Logout failed');
      }
    } catch (error) {
      if (error instanceof UserApiError) {
        throw error;
      }
      throw new UserApiError(500, 'Internal service error');
    }
  }
}; 