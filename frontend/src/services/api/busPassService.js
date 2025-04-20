const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export class BusPassApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'BusPassApiError';
    this.statusCode = statusCode;
  }
}

export const busPassService = {
  async submitApplication(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/buspass/apply`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new BusPassApiError(response.status, 'Failed to submit bus pass application');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof BusPassApiError) {
        throw error;
      }
      throw new BusPassApiError(500, 'Internal service error');
    }
  },

  async checkExistingPass(rollNumber) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/buspass/check/${rollNumber}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new BusPassApiError(response.status, 'Failed to check existing pass');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof BusPassApiError) {
        throw error;
      }
      throw new BusPassApiError(500, 'Internal service error');
    }
  },

  async getBusPassDetails(receiptNo) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/buspass/details/${receiptNo}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new BusPassApiError(response.status, 'Failed to fetch bus pass details');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof BusPassApiError) {
        throw error;
      }
      throw new BusPassApiError(500, 'Internal service error');
    }
  },

  async createPaymentIntent(passType, applicationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passType, applicationId }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new BusPassApiError(response.status, 'Failed to create payment intent');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof BusPassApiError) {
        throw error;
      }
      throw new BusPassApiError(500, 'Internal service error');
    }
  }
}; 