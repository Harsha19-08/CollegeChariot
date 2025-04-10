import React, { createContext, useState, useContext } from 'react';
import { 
  FileTextOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  CarOutlined 
} from '@ant-design/icons';

export const BusPassContext = createContext();

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

  const [activePass] = useState({
    count: 2,
    totalRoutes: 15,
    daysRemaining: 45,
    status: 'Active'
  });

  const [recentActivity] = useState(mockRecentActivity);
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleBusPassSubmission = async (formData) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, data: { message: 'Bus pass application submitted successfully' } };
    } catch (error) {
      console.error('Bus pass submission error:', error);
      return { success: false, error: 'Failed to submit bus pass application' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    activePass,
    recentActivity,
    loading,
    handleBusPassSubmission
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