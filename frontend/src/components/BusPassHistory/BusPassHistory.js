import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Tag, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useBusPass } from '../../contexts/BusPassContext';
import './BusPassHistory.css';

const BusPassHistory = () => {
  const navigate = useNavigate();
  const { passHistory } = useBusPass();

  const columns = [
    {
      title: 'Pass ID',
      dataIndex: 'passId',
      key: 'passId',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'Monthly' ? 'blue' : 'green'}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate',
      key: 'issueDate',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        if (status === 'Active') color = 'green';
        if (status === 'Expired') color = 'red';
        if (status === 'Pending') color = 'gold';
        return (
          <Tag color={color}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleViewDetails(record.passId)}>
            View Details
          </Button>
          {record.status === 'Active' && (
            <Button type="link" onClick={() => handleRenew(record.passId)}>
              Renew
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handleViewDetails = (passId) => {
    // Navigate to pass details page
    navigate(`/busspass/history/${passId}`);
  };

  const handleRenew = (passId) => {
    // Navigate to renewal page with pre-filled data
    navigate(`/busspass/renew/${passId}`);
  };

  const handleBack = () => {
    navigate('/busspass');
  };

  return (
    <div className="history-container">
      <Card 
        title={
          <Space>
            <Button 
              type="link" 
              icon={<ArrowLeftOutlined />} 
              onClick={handleBack}
              className="back-button"
            >
              Back
            </Button>
            <span>Bus Pass History</span>
          </Space>
        }
        className="history-card"
      >
        <Table 
          columns={columns} 
          dataSource={passHistory} 
          rowKey="passId"
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Card>
    </div>
  );
};

export default BusPassHistory; 