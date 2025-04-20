import React, { createContext, useContext, useState } from 'react';
import { busPassService, BusPassApiError } from '../services/api/busPassService';
import { message } from 'antd';
import { 
  FileTextOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  CarOutlined 
} from '@ant-design/icons';

const BusPassContext = createContext();

export const BusPassProvider = ({ children }) => {
  // Mock data for development
  const mockRecentActivity = [
    {
      id: 1,
      title: 'Bus Pass Renewed',
      timestamp: '2024-03-14 10:30 AM',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
    },
    {
      id: 2,
      title: 'Route Change Request',
      timestamp: '2024-03-13 02:15 PM',
      icon: <CarOutlined style={{ color: '#1890ff' }} />
    },
    {
      id: 3,
      title: 'Payment Completed',
      timestamp: '2024-03-12 11:45 AM',
      icon: <FileTextOutlined style={{ color: '#722ed1' }} />
    },
    {
      id: 4,
      title: 'Pass Expiry Reminder',
      timestamp: '2024-03-11 09:00 AM',
      icon: <ClockCircleOutlined style={{ color: '#fa8c16' }} />
    }
  ];

  const [currentBusPass, setCurrentBusPass] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePass, setActivePass] = useState({
    count: 0,
    totalRoutes: 15,
    daysRemaining: 0,
    status: 'No Active Pass'
  });

  const handleError = (err) => {
    const errorMessage = err instanceof BusPassApiError 
      ? err.message 
      : 'An unexpected error occurred';
    setError(errorMessage);
    message.error(errorMessage);
    return { success: false, error: errorMessage };
  };

  const handleBusPassSubmission = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await busPassService.submitApplication(formData);
      if (result.success && result.data) {
        setCurrentBusPass(result.data);
        // Update active pass count
        setActivePass(prev => ({
          ...prev,
          count: prev.count + 1,
          status: 'Active'
        }));
      }
      return result;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const checkExistingPass = async (rollNumber) => {
    try {
      const result = await busPassService.checkExistingPass(rollNumber);
      if (result.passDetails) {
        setCurrentBusPass(result.passDetails);
        // Update active pass status
        if (result.passDetails.status === 'active') {
          setActivePass(prev => ({
            ...prev,
            count: prev.count + 1,
            status: 'Active',
            daysRemaining: calculateDaysRemaining(result.passDetails.validUntil)
          }));
        }
      }
      return result.hasPass;
    } catch (err) {
      handleError(err);
      return false;
    }
  };

  const calculateDaysRemaining = (validUntil) => {
    const endDate = new Date(validUntil);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getBusPassDetails = async (receiptNo) => {
    setLoading(true);
    setError(null);
    try {
      const busPass = await busPassService.getBusPassDetails(receiptNo);
      setCurrentBusPass(busPass);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    currentBusPass,
    loading,
    error,
    handleBusPassSubmission,
    checkExistingPass,
    getBusPassDetails,
    clearError,
    recentActivity: mockRecentActivity,
    activePass
  };

  return (
    <BusPassContext.Provider value={value}>
      {children}
    </BusPassContext.Provider>
  );
};

export const useBusPass = () => {
  const context = useContext(BusPassContext);
  if (!context) {
    throw new Error('useBusPass must be used within a BusPassProvider');
  }
  return context;
}; 