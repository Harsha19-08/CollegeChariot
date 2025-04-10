import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBusPass } from '../../contexts/BusPassContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Steps, 
  Form, 
  Input, 
  Select, 
  Button, 
  Upload, 
  message, 
  Card, 
  Row, 
  Col, 
  Divider,
  Typography,
  Space,
  Radio,
  DatePicker,
  Alert
} from 'antd';
import { 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  HomeOutlined, 
  CarOutlined, 
  CameraOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { loadStripe } from '@stripe/stripe-js';
import './NewApplication.css';

const { Title, Text } = Typography;
const { Step } = Steps;
const { Option } = Select;

const NewApplication = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleBusPassSubmission, checkExistingPass } = useBusPass();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [existingPass, setExistingPass] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Initialize Stripe
  const stripePromise = process.env.REACT_APP_STRIPE_PUBLIC_KEY 
    ? loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    : null;

  useEffect(() => {
    // Check if user already has an active pass
    const checkPass = async () => {
      if (user?.rollNumber) {
        const { hasPass } = await checkExistingPass(user.rollNumber);
        if (hasPass) {
          setExistingPass(true);
        }
      }
    };
    checkPass();
  }, [user, checkExistingPass]);

  const steps = [
    {
      key: '0',
      title: 'Personal Details',
      icon: <UserOutlined />,
      status: currentStep === 0 ? 'process' : currentStep > 0 ? 'finish' : 'wait'
    },
    {
      key: '1',
      title: 'Address & Contact',
      icon: <HomeOutlined />,
      status: currentStep === 1 ? 'process' : currentStep > 1 ? 'finish' : 'wait'
    },
    {
      key: '2',
      title: 'Bus Details',
      icon: <CarOutlined />,
      status: currentStep === 2 ? 'process' : currentStep > 2 ? 'finish' : 'wait'
    },
    {
      key: '3',
      title: 'Photo Upload',
      icon: <CameraOutlined />,
      status: currentStep === 3 ? 'process' : currentStep > 3 ? 'finish' : 'wait'
    },
    {
      key: '4',
      title: 'Review & Payment',
      icon: <CreditCardOutlined />,
      status: currentStep === 4 ? 'process' : currentStep > 4 ? 'finish' : 'wait'
    }
  ];

  // Get the fields for the current step
  const getCurrentStepFields = () => {
    switch (currentStep) {
      case 0:
        return ['name', 'rollNumber', 'branch', 'year'];
      case 1:
        return ['phoneNumber', 'email', 'presentAddress', 'permanentAddress'];
      case 2:
        return ['routeNumber', 'boardingPoint', 'passDuration'];
      case 3:
        return ['photo'];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    try {
      // Get fields for current step
      const fieldsToValidate = getCurrentStepFields();
      
      // Validate only the current step's fields
      await form.validateFields(fieldsToValidate);
      
      // If validation passes, move to next step
      setCurrentStep(currentStep + 1);
    } catch (error) {
      // Show specific field errors
      if (error.errorFields) {
        error.errorFields.forEach(field => {
          message.error({
            content: `${field.errors[0]}`,
            key: field.name[0],
            duration: 3
          });
        });
      }
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePhotoUpload = (info) => {
    if (info.file.status === 'done') {
      setPhotoUrl(info.file.response.url);
      message.success(`${info.file.name} file uploaded successfully`);
      // Set the photo field value to the URL
      form.setFieldsValue({ photo: info.file.response.url });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // Create FormData object
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
      
      // Add photo URL if exists
      if (photoUrl) {
        formData.append('photo', photoUrl);
      }

      // Submit application
      const result = await handleBusPassSubmission(formData);
      
      if (result.success) {
        // If Stripe is configured, handle payment
        if (stripePromise) {
          await handlePayment(result.data.applicationId);
        } else {
          // If Stripe is not configured, just show success message
          message.success('Application submitted successfully!');
          navigate('/busspass');
        }
      } else {
        message.error(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Submission error:', error);
      message.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (applicationId) => {
    setPaymentLoading(true);
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 500,
          currency: 'inr',
          applicationId
        }),
      });

      const session = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (error) {
        setPaymentError(error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('Payment processing failed. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <Title level={4}>Personal Details</Title>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: 'Please enter your full name' },
                { min: 3, message: 'Name must be at least 3 characters' },
                { pattern: /^[a-zA-Z\s]*$/, message: 'Name can only contain letters and spaces' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item
              name="rollNumber"
              label="Roll Number"
              rules={[
                { required: true, message: 'Please enter your roll number' },
                { pattern: /^[0-9]{2}[A-Z0-9]{2}[A-Z0-9]{2}[A-Z0-9]{2}$/, message: 'Please enter a valid roll number format (e.g., 22R21A2H1)' }
              ]}
            >
              <Input placeholder="Enter your roll number" />
            </Form.Item>
            <Form.Item
              name="branch"
              label="Branch"
              rules={[{ required: true, message: 'Please select your branch' }]}
            >
              <Select placeholder="Select your branch">
                <Option value="CSE">Computer Science Engineering</Option>
                <Option value="ECE">Electronics & Communication Engineering</Option>
                <Option value="EEE">Electrical & Electronics Engineering</Option>
                <Option value="MECH">Mechanical Engineering</Option>
                <Option value="CIVIL">Civil Engineering</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="year"
              label="Year"
              rules={[{ required: true, message: 'Please select your year' }]}
            >
              <Select placeholder="Select your year">
                <Option value="1">First Year</Option>
                <Option value="2">Second Year</Option>
                <Option value="3">Third Year</Option>
                <Option value="4">Fourth Year</Option>
              </Select>
            </Form.Item>
          </div>
        );
      case 1:
        return (
          <div className="step-content">
            <Title level={4}>Address & Contact</Title>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please enter your phone number' },
                { pattern: /^[6-9]\d{9}$/, message: 'Please enter a valid Indian mobile number' },
                { len: 10, message: 'Phone number must be exactly 10 digits' }
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" maxLength={10} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
                { pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: 'Please enter a valid email format' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="presentAddress"
              label="Present Address"
              rules={[
                { required: true, message: 'Please enter your present address' },
                { min: 10, message: 'Address must be at least 10 characters long' },
                { max: 200, message: 'Address cannot exceed 200 characters' }
              ]}
            >
              <Input.TextArea 
                rows={4} 
                placeholder="Enter your present address"
                maxLength={200}
                showCount
              />
            </Form.Item>
            <Form.Item
              name="permanentAddress"
              label="Permanent Address"
              rules={[
                { required: true, message: 'Please enter your permanent address' },
                { min: 10, message: 'Address must be at least 10 characters long' },
                { max: 200, message: 'Address cannot exceed 200 characters' }
              ]}
            >
              <Input.TextArea 
                rows={4} 
                placeholder="Enter your permanent address"
                maxLength={200}
                showCount
              />
            </Form.Item>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <Title level={4}>Bus Details</Title>
            <Form.Item
              name="routeNumber"
              label="Route Number"
              rules={[{ required: true, message: 'Please select your route number' }]}
            >
              <Select placeholder="Select your route number">
                <Option value="R-101">Route 101</Option>
                <Option value="R-102">Route 102</Option>
                <Option value="R-103">Route 103</Option>
                <Option value="R-104">Route 104</Option>
                <Option value="R-105">Route 105</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="boardingPoint"
              label="Boarding Point"
              rules={[{ required: true, message: 'Please select your boarding point' }]}
            >
              <Select placeholder="Select your boarding point">
                <Option value="Main Gate">Main Gate</Option>
                <Option value="Back Gate">Back Gate</Option>
                <Option value="Bus Stand">Bus Stand</Option>
                <Option value="Market">Market</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="passDuration"
              label="Pass Duration"
              rules={[{ required: true, message: 'Please select pass duration' }]}
            >
              <Radio.Group>
                <Radio value="1">1 Month</Radio>
                <Radio value="3">3 Months</Radio>
                <Radio value="6">6 Months</Radio>
                <Radio value="12">12 Months</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <Title level={4}>Photo Upload</Title>
            <Form.Item
              name="photo"
              label="Passport Size Photo"
              rules={[{ required: true, message: 'Please upload your photo' }]}
            >
              <Upload
                name="photo"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/upload"
                onChange={handlePhotoUpload}
              >
                {photoUrl ? (
                  <img src={photoUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  <div>
                    <CameraOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Alert
              message="Photo Requirements"
              description="Please upload a recent passport-size photo (3x4 cm) with a white background. The photo should be clear and without any filters."
              type="info"
              showIcon
            />
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <Title level={4}>Review & Payment</Title>
            <Card className="summary-card">
              <Title level={5}>Application Summary</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Name:</Text>
                  <Text>{form.getFieldValue('name')}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Roll Number:</Text>
                  <Text>{form.getFieldValue('rollNumber')}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Branch:</Text>
                  <Text>{form.getFieldValue('branch')}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Year:</Text>
                  <Text>{form.getFieldValue('year')}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Phone:</Text>
                  <Text>{form.getFieldValue('phoneNumber')}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Email:</Text>
                  <Text>{form.getFieldValue('email')}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Present Address:</Text>
                  <Text>{form.getFieldValue('presentAddress')}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Permanent Address:</Text>
                  <Text>{form.getFieldValue('permanentAddress')}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Route Number:</Text>
                  <Text>{form.getFieldValue('routeNumber')}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Boarding Point:</Text>
                  <Text>{form.getFieldValue('boardingPoint')}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Pass Duration:</Text>
                  <Text>{form.getFieldValue('passDuration')} Month(s)</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Amount:</Text>
                  <Text>₹500</Text>
                </Col>
              </Row>
            </Card>
            {paymentError && (
              <Alert
                message="Payment Error"
                description={paymentError}
                type="error"
                showIcon
                style={{ marginTop: 16 }}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (existingPass) {
    return (
      <div className="existing-pass-alert">
        <Alert
          message="Active Pass Exists"
          description="You already have an active bus pass. Please renew your existing pass instead of applying for a new one."
          type="warning"
          showIcon
          action={
            <Button type="primary" onClick={() => navigate('/busspass/renew')}>
              Renew Pass
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="new-application">
      <Card className="application-card">
        <Steps 
          current={currentStep}
          items={steps}
          responsive={true}
          size="small"
        />
        <div className="steps-content">
          <Form
            form={form}
            layout="vertical"
            className="application-form"
            initialValues={{
              name: user?.name || '',
              rollNumber: user?.rollNumber || '',
              email: user?.email || '',
              phoneNumber: user?.phoneNumber || ''
            }}
          >
            {renderStepContent()}
            <div className="steps-action">
              {currentStep > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button 
                  type="primary" 
                  onClick={handleSubmit}
                  loading={loading || paymentLoading}
                >
                  {paymentLoading ? 'Processing Payment...' : 'Submit & Pay'}
                </Button>
              )}
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default NewApplication; 