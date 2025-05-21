import React, { useEffect } from 'react';
import { Card, Table, Tag, Space, Spin, Empty } from 'antd';
import { useBusPass } from '../contexts/BusPassContext';
import { ClockCircleOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';

const ViewStatus = () => {
  const { currentBusPass, loading, fetchBusPassData } = useBusPass();

  // Fetch latest data when component mounts
  useEffect(() => {
    fetchBusPassData();
  }, [fetchBusPassData]);

  const columns = [
    {
      title: 'Application ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Type',
      dataIndex: 'passDuration',
      key: 'passDuration',
      render: (duration) => (
        <Tag color="blue">{`${duration} Month Pass`}</Tag>
      ),
    },
    {
      title: 'Route Number',
      dataIndex: 'routeNumber',
      key: 'routeNumber',
    },
    {
      title: 'Boarding Point',
      dataIndex: 'boardingPoint',
      key: 'boardingPoint',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        let icon = null;
        
        switch(status) {
          case 'pending':
            color = 'gold';
            icon = <ClockCircleOutlined />;
            break;
          case 'approved':
            color = 'green';
            icon = <CheckCircleOutlined />;
            break;
          case 'rejected':
            color = 'red';
            icon = <StopOutlined />;
            break;
          default:
            color = 'default';
        }
        
        return (
          <Tag color={color} icon={icon}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: 'Applied On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    }
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Application Status">
        {currentBusPass ? (
          <Table 
            dataSource={[currentBusPass]}
            columns={columns}
            rowKey="_id"
            pagination={false}
          />
        ) : (
          <Empty
            description="No active bus pass application found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
        <div style={{ marginTop: '16px' }}>
          <p>
            <strong>Note:</strong> Your application will be reviewed within 24-48 hours. 
            You will receive a notification once the status is updated.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ViewStatus;