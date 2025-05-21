import React, { useEffect } from 'react';
import { Card, Table, Tag, Space, Button, Spin, Empty, Row, Col, Statistic, Timeline } from 'antd';
import { useBusPass } from '../contexts/BusPassContext';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  StopOutlined,
  EditOutlined,
  DeleteOutlined,
  CarOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import './ManagePass.css';

const ManagePass = () => {
  const { currentBusPass, loading, fetchBusPassData } = useBusPass();

  useEffect(() => {
    fetchBusPassData();
  }, [fetchBusPassData]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#faad14';
      case 'approved': return '#52c41a';
      case 'rejected': return '#f5222d';
      default: return '#d9d9d9';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return <ClockCircleOutlined />;
      case 'approved': return <CheckCircleOutlined />;
      case 'rejected': return <StopOutlined />;
      default: return null;
    }
  };

  const handleEdit = (passId) => {
    console.log('Edit pass:', passId);
  };

  const handleCancel = (passId) => {
    console.log('Cancel pass:', passId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
        <p>Loading pass details...</p>
      </div>
    );
  }

  if (!currentBusPass) {
    return (
      <div className="empty-container">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div className="empty-description">
              <h3>No Active Bus Pass</h3>
              <p>You don't have any active bus pass at the moment.</p>
              <Button type="primary" size="large">
                Apply for New Pass
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="manage-pass-container">
      <Row gutter={[24, 24]}>
        {/* Pass Status Card */}
        <Col xs={24} lg={8}>
          <Card 
            className="status-card"
            title={
              <Space>
                <IdcardOutlined />
                <span>Pass Status</span>
              </Space>
            }
          >
            <div className="status-content">
              <div className="status-icon" style={{ color: getStatusColor(currentBusPass.status) }}>
                {getStatusIcon(currentBusPass.status)}
              </div>
              <h2 className="status-text" style={{ color: getStatusColor(currentBusPass.status) }}>
                {currentBusPass.status.charAt(0).toUpperCase() + currentBusPass.status.slice(1)}
              </h2>
              <div className="pass-id">Pass ID: {currentBusPass._id}</div>
            </div>
          </Card>
        </Col>

        {/* Pass Details Card */}
        <Col xs={24} lg={16}>
          <Card 
            className="details-card"
            title={
              <Space>
                <UserOutlined />
                <span>Pass Details</span>
              </Space>
            }
            extra={
              <Space>
                {currentBusPass.status === 'approved' && (
                  <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(currentBusPass._id)}>
                    Edit
                  </Button>
                )}
                {currentBusPass.status === 'pending' && (
                  <Button danger icon={<DeleteOutlined />} onClick={() => handleCancel(currentBusPass._id)}>
                    Cancel
                  </Button>
                )}
              </Space>
            }
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12}>
                <Statistic
                  title="Route Number"
                  value={currentBusPass.routeNumber}
                  prefix={<CarOutlined />}
                  className="pass-statistic"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Statistic
                  title="Boarding Point"
                  value={currentBusPass.boardingPoint}
                  prefix={<EnvironmentOutlined />}
                  className="pass-statistic"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Statistic
                  title="Pass Duration"
                  value={`${currentBusPass.passDuration} Month${currentBusPass.passDuration > 1 ? 's' : ''}`}
                  prefix={<CalendarOutlined />}
                  className="pass-statistic"
                />
              </Col>
              <Col xs={24} sm={12}>
                <Statistic
                  title="Valid Until"
                  value={currentBusPass.validUntil ? new Date(currentBusPass.validUntil).toLocaleDateString() : 'Not yet approved'}
                  prefix={<CalendarOutlined />}
                  className="pass-statistic"
                />
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Timeline Card */}
        <Col xs={24}>
          <Card 
            className="timeline-card"
            title={
              <Space>
                <ClockCircleOutlined />
                <span>Pass Timeline</span>
              </Space>
            }
          >
            <Timeline mode="left">
              <Timeline.Item 
                color="green"
                label={new Date(currentBusPass.createdAt).toLocaleDateString()}
              >
                Application Submitted
              </Timeline.Item>
              {currentBusPass.paymentStatus === 'completed' && (
                <Timeline.Item 
                  color="blue"
                  label={new Date(currentBusPass.paymentDate).toLocaleDateString()}
                >
                  Payment Completed
                </Timeline.Item>
              )}
              {currentBusPass.status === 'approved' && (
                <Timeline.Item 
                  color="green"
                  label={new Date(currentBusPass.approvalDate).toLocaleDateString()}
                >
                  Pass Approved
                </Timeline.Item>
              )}
              {currentBusPass.status === 'rejected' && (
                <Timeline.Item 
                  color="red"
                  label={new Date(currentBusPass.approvalDate).toLocaleDateString()}
                >
                  Pass Rejected
                  {currentBusPass.rejectionReason && (
                    <p className="rejection-reason">Reason: {currentBusPass.rejectionReason}</p>
                  )}
                </Timeline.Item>
              )}
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ManagePass;