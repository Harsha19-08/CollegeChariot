import React, { createContext, useState, useContext, useEffect } from 'react';
import { message } from 'antd';

const BusPassContext = createContext();

export const useBusPass = () => {
  return useContext(BusPassContext);
};

export const BusPassProvider = ({ children }) => {
  const [activePass, setActivePass] = useState({
    count: 1,
    totalRoutes: 12,
    daysRemaining: 45,
    status: 'Active',
    expiryDate: '2024-12-31',
    routeNumber: 'R-101',
    boardingPoint: 'Main Gate'
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      title: 'Pass Renewed',
      timestamp: '2 days ago',
      icon: 'CreditCardOutlined'
    },
    {
      id: 2,
      title: 'Route Changed',
      timestamp: '1 week ago',
      icon: 'CarOutlined'
    },
    {
      id: 3,
      title: 'Payment Successful',
      timestamp: '2 weeks ago',
      icon: 'CheckCircleOutlined'
    }
  ]);

  const [passHistory, setPassHistory] = useState([
    {
      passId: 'BP-2023-001',
      type: 'Monthly',
      issueDate: '2023-12-01',
      expiryDate: '2023-12-31',
      status: 'Expired',
      amount: 500
    },
    {
      passId: 'BP-2024-001',
      type: 'Monthly',
      issueDate: '2024-01-01',
      expiryDate: '2024-01-31',
      status: 'Expired',
      amount: 500
    },
    {
      passId: 'BP-2024-002',
      type: 'Monthly',
      issueDate: '2024-02-01',
      expiryDate: '2024-02-29',
      status: 'Expired',
      amount: 500
    },
    {
      passId: 'BP-2024-003',
      type: 'Monthly',
      issueDate: '2024-03-01',
      expiryDate: '2024-03-31',
      status: 'Expired',
      amount: 500
    },
    {
      passId: 'BP-2024-004',
      type: 'Monthly',
      issueDate: '2024-04-01',
      expiryDate: '2024-04-30',
      status: 'Expired',
      amount: 500
    },
    {
      passId: 'BP-2024-005',
      type: 'Monthly',
      issueDate: '2024-05-01',
      expiryDate: '2024-05-31',
      status: 'Expired',
      amount: 500
    },
    {
      passId: 'BP-2024-006',
      type: 'Monthly',
      issueDate: '2024-06-01',
      expiryDate: '2024-06-30',
      status: 'Expired',
      amount: 500
    },
    {
      passId: 'BP-2024-007',
      type: 'Monthly',
      issueDate: '2024-07-01',
      expiryDate: '2024-07-31',
      status: 'Expired',
      amount: 500
    },
    {
      passId: 'BP-2024-008',
      type: 'Monthly',
      issueDate: '2024-08-01',
      expiryDate: '2024-08-31',
      status: 'Expired',
      amount: 500
    },
    {
      passId: 'BP-2024-009',
      type: 'Monthly',
      issueDate: '2024-09-01',
      expiryDate: '2024-09-30',
      status: 'Expired',
      amount: 500
    },
    {
      passId: 'BP-2024-010',
      type: 'Monthly',
      issueDate: '2024-10-01',
      expiryDate: '2024-10-31',
      status: 'Active',
      amount: 500
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    expiryReminder: 7,
    twoFactorAuth: false,
    loginNotifications: true,
    defaultPaymentMethod: 'upi',
    autoRenewal: true,
    lowBalanceAlert: true,
    lowBalanceThreshold: 200
  });

  const [applications, setApplications] = useState([]);

  // Mock API call to submit a new bus pass application
  const handleBusPassSubmission = async (formData) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate a successful submission
      
      // Create a new application object
      const newApplication = {
        id: `APP-${Date.now()}`,
        name: formData.get('name'),
        rollNumber: formData.get('rollNumber'),
        branch: formData.get('branch'),
        year: formData.get('year'),
        phoneNumber: formData.get('phoneNumber'),
        email: formData.get('email'),
        presentAddress: formData.get('presentAddress'),
        permanentAddress: formData.get('permanentAddress'),
        routeNumber: formData.get('routeNumber'),
        boardingPoint: formData.get('boardingPoint'),
        passDuration: formData.get('passDuration'),
        photo: formData.get('photo'),
        status: 'Pending',
        submittedAt: new Date().toISOString(),
        paymentStatus: 'Pending'
      };

      // Add to applications list
      setApplications(prev => [...prev, newApplication]);

      // Add to recent activity
      setRecentActivity(prev => [
        {
          id: Date.now(),
          title: 'New Pass Application Submitted',
          timestamp: 'Just now',
          icon: 'FileTextOutlined'
        },
        ...prev
      ]);

      return {
        success: true,
        data: {
          applicationId: newApplication.id
        }
      };
    } catch (error) {
      console.error('Error submitting application:', error);
      return {
        success: false,
        error: 'Failed to submit application. Please try again.'
      };
    }
  };

  // Mock API call to update settings
  const updateSettings = async (newSettings) => {
    try {
      // In a real app, this would be an API call
      setSettings(newSettings);
      return { success: true };
    } catch (error) {
      console.error('Error updating settings:', error);
      return { success: false, error: 'Failed to update settings' };
    }
  };

  // Mock API call to check if a user already has a pass
  const checkExistingPass = async (rollNumber) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll just check if the roll number is in our mock data
      const hasPass = passHistory.some(pass => pass.status === 'Active');
      return { hasPass };
    } catch (error) {
      console.error('Error checking existing pass:', error);
      return { hasPass: false };
    }
  };

  // Mock API call to get pass details
  const getPassDetails = async (passId) => {
    try {
      // In a real app, this would be an API call
      const pass = passHistory.find(p => p.passId === passId);
      if (!pass) {
        throw new Error('Pass not found');
      }
      return { success: true, data: pass };
    } catch (error) {
      console.error('Error getting pass details:', error);
      return { success: false, error: 'Failed to get pass details' };
    }
  };

  // Mock API call to renew a pass
  const renewPass = async (passId, newDuration) => {
    try {
      // In a real app, this would be an API call
      const pass = passHistory.find(p => p.passId === passId);
      if (!pass) {
        throw new Error('Pass not found');
      }

      // Create a new pass entry
      const newPass = {
        ...pass,
        passId: `BP-${new Date().getFullYear()}-${String(passHistory.length + 1).padStart(3, '0')}`,
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Active',
        amount: 500
      };

      // Add to pass history
      setPassHistory(prev => [...prev, newPass]);

      // Update active pass
      setActivePass({
        ...activePass,
        daysRemaining: 30,
        status: 'Active',
        expiryDate: newPass.expiryDate
      });

      // Add to recent activity
      setRecentActivity(prev => [
        {
          id: Date.now(),
          title: 'Pass Renewed',
          timestamp: 'Just now',
          icon: 'CreditCardOutlined'
        },
        ...prev
      ]);

      return { success: true, data: newPass };
    } catch (error) {
      console.error('Error renewing pass:', error);
      return { success: false, error: 'Failed to renew pass' };
    }
  };

  const value = {
    activePass,
    recentActivity,
    passHistory,
    settings,
    applications,
    handleBusPassSubmission,
    updateSettings,
    checkExistingPass,
    getPassDetails,
    renewPass
  };

  return (
    <BusPassContext.Provider value={value}>
      {children}
    </BusPassContext.Provider>
  );
};

export default BusPassContext; 