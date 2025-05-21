import React, { useEffect } from 'react';
import { Card, Table, Tag, Space, Spin, Empty, Row, Col, Statistic } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  DollarCircleOutlined,
  CreditCardOutlined,
  TransactionOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useBusPass } from '../contexts/BusPassContext';
import './PaymentHistory.css';

const PaymentHistory = () => {
  const { paymentHistory, loading, fetchBusPassData } = useBusPass();

  useEffect(() => {
    fetchBusPassData();
  }, [fetchBusPassData]);

  const getTotalAmount = () => {
    return paymentHistory.reduce((total, payment) => total + payment.amount, 0);
  };

  const getSuccessfulPayments = () => {
    return paymentHistory.filter(payment => payment.paymentStatus === 'completed').length;
  };

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
      render: (id) => (
        <span className="transaction-id">{id}</span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => (
        <Space>
          <CalendarOutlined />
          {new Date(date).toLocaleDateString()}
        </Space>
      ),
    },
    {
      title: 'Pass Type',
      dataIndex: 'passDuration',
      key: 'passDuration',
      render: (duration) => (
        <Tag color="blue" icon={<CreditCardOutlined />}>
          {`${duration} Month Pass`}
        </Tag>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="amount">
          <DollarCircleOutlined /> ₹{amount.toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => {
        const isCompleted = status === 'completed';
        return (
          <Tag 
            color={isCompleted ? 'green' : 'gold'} 
            icon={isCompleted ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          >
            {isCompleted ? 'Completed' : 'Processing'}
          </Tag>
        );
      },
    },
    {
      title: 'Route Details',
      key: 'route',
      render: (_, record) => (
        <div className="route-details">
          <div>Route: {record.routeNumber}</div>
          <div className="boarding-point">{record.boardingPoint}</div>
        </div>
      ),
    }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Loading payment history...</p>
      </div>
    );
  }

  return (
    <div className="payment-history-container">
      {/* Summary Statistics */}
      <Row gutter={[24, 24]} className="statistics-row">
        <Col xs={24} sm={8}>
          <Card className="statistic-card total-payments">
            <Statistic
              title="Total Payments"
              value={paymentHistory.length}
              prefix={<TransactionOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="statistic-card successful-payments">
            <Statistic
              title="Successful Payments"
              value={getSuccessfulPayments()}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="statistic-card total-amount">
            <Statistic
              title="Total Amount"
              value={getTotalAmount()}
              prefix="₹"
            />
          </Card>
        </Col>
      </Row>

      {/* Payment History Table */}
      <Card 
        title={
          <Space>
            <TransactionOutlined />
            <span>Payment History</span>
          </Space>
        }
        className="history-card"
      >
        {paymentHistory && paymentHistory.length > 0 ? (
          <Table 
            dataSource={paymentHistory}
            columns={columns}
            rowKey="_id"
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            className="payment-table"
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="empty-description">
                <h3>No Payment Records</h3>
                <p>You haven't made any payments yet.</p>
              </div>
            }
          />
        )}
      </Card>

      <div className="note-section">
        <Card className="note-card">
          <p>
            <strong>Note:</strong> Payment records are maintained for the last 12 months. 
            For older records, please contact support.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PaymentHistory;