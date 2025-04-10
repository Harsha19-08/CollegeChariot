import React, { useState, useContext } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Steps,
  Card,
  Divider,
  Alert,
  Modal
} from 'antd';
import {
  UserOutlined,
  IdcardOutlined,
  BankOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  CarOutlined,
  UploadOutlined,
  CreditCardOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useBusPass } from '../../contexts/BusPassContext';
import { loadStripe } from '@stripe/stripe-js';
import './NewApplication.css';

const { Option } = Select;
const { Step } = Steps;

const stripePromise = process.env.REACT_APP_STRIPE_PUBLIC_KEY 
  ? loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  : null;

const NewApplication = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingPass, setExistingPass] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { handleBusPassSubmission } = useBusPass();

  const steps = [
    {
      title: 'Personal Details',
      content: 'personal-details-form',
    },
    {
      title: 'Address & Contact',
      content: 'address-contact-form',
    },
    {
      title: 'Bus Details',
      content: 'bus-details-form',
    },
    {
      title: 'Photo Upload',
      content: 'photo-upload-form',
    },
    {
      title: 'Review & Payment',
      content: 'review-payment-form',
    },
  ];

  const handlePhotoChange = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get base64 URL for preview
      getBase64(info.file.originFileObj, (url) => {
        setPhotoFile(info.file.originFileObj);
        setPhotoPreview(url);
      });
    }
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      if (currentStep === 0) {
        // Check if user already has a pass
        const response = await fetch(`/api/buspass/check/${form.getFieldValue('rollNumber')}`);
        const data = await response.json();
        if (data.hasPass) {
          setExistingPass(true);
          Modal.confirm({
            title: 'Existing Pass Found',
            content: 'You already have an active pass. Would you like to proceed with renewal instead?',
            okText: 'Yes, Renew Pass',
            cancelText: 'No, Continue New Application',
            onOk() {
              navigate('/busspass/renew');
            },
          });
          return;
        }
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      // Create FormData for file upload
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
      if (photoFile) {
        formData.append('photo', photoFile);
      }

      // Submit application
      const result = await handleBusPassSubmission(formData);
      
      if (result.success) {
        if (!stripePromise) {
          // If Stripe is not initialized, show a message and handle submission without payment
          message.warning('Payment gateway is not configured. Application submitted successfully.');
          navigate('/busspass');
          return;
        }

        try {
          // Redirect to Stripe payment
          const stripe = await stripePromise;
          const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              passType: values.passDuration,
              applicationId: result.data.applicationId,
            }),
          });
          
          if (!response.ok) {
            throw new Error('Payment session creation failed');
          }

          const session = await response.json();
          
          // Redirect to Stripe Checkout
          const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
          });

          if (error) {
            throw error;
          }
        } catch (paymentError) {
          console.error('Payment error:', paymentError);
          message.error('Payment initialization failed. Please try again or contact support.');
          // You might want to handle the submitted application here
          // For example, mark it as "pending payment" in your system
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
              initialValue={user?.name}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item
              name="rollNumber"
              label="Roll Number"
              rules={[{ required: true, message: 'Please enter your roll number' }]}
              initialValue={user?.studentDetails?.rollNumber}
            >
              <Input prefix={<IdcardOutlined />} placeholder="Enter your roll number" />
            </Form.Item>
            <Form.Item
              name="branch"
              label="Branch"
              rules={[{ required: true, message: 'Please select your branch' }]}
              initialValue={user?.studentDetails?.branch}
            >
              <Select placeholder="Select your branch">
                <Option value="IT">IT</Option>
                <Option value="CSE">CSE</Option>
                <Option value="CSIT">CSIT</Option>
                <Option value="CSE(AIML)">CSE(AIML)</Option>
                <Option value="CSE(DS)">CSE(DS)</Option>
                <Option value="ECE">ECE</Option>
                <Option value="EEE">EEE</Option>
                <Option value="Aero">Aero</Option>
                <Option value="Mechanical">Mechanical</Option>
                <Option value="MBA">MBA</Option>
                <Option value="BBA">BBA</Option>
                <Option value="M.Tech">M.Tech</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="year"
              label="Year"
              rules={[{ required: true, message: 'Please select your year' }]}
              initialValue={user?.studentDetails?.year}
            >
              <Select placeholder="Select your year">
                <Option value={1}>1st Year</Option>
                <Option value={2}>2nd Year</Option>
                <Option value={3}>3rd Year</Option>
                <Option value={4}>4th Year</Option>
              </Select>
            </Form.Item>
          </div>
        );
      case 1:
        return (
          <div className="step-content">
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please enter your phone number' },
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' }
              ]}
              initialValue={user?.phoneNumber}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
              initialValue={user?.email}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="presentAddress"
              label="Present Address"
              rules={[{ required: true, message: 'Please enter your present address' }]}
            >
              <Input.TextArea prefix={<HomeOutlined />} placeholder="Enter your present address" />
            </Form.Item>
            <Form.Item
              name="permanentAddress"
              label="Permanent Address"
              rules={[{ required: true, message: 'Please enter your permanent address' }]}
            >
              <Input.TextArea prefix={<HomeOutlined />} placeholder="Enter your permanent address" />
            </Form.Item>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <Form.Item
              name="routeNumber"
              label="Route Number"
              rules={[{ required: true, message: 'Please enter route number' }]}
            >
              <Input prefix={<CarOutlined />} placeholder="Enter route number" />
            </Form.Item>
            <Form.Item
              name="boardingPoint"
              label="Boarding Point"
              rules={[{ required: true, message: 'Please enter boarding point' }]}
            >
              <Input prefix={<BankOutlined />} placeholder="Enter boarding point" />
            </Form.Item>
            <Form.Item
              name="passDuration"
              label="Pass Duration"
              rules={[{ required: true, message: 'Please select pass duration' }]}
            >
              <Select placeholder="Select pass duration">
                <Option value="halfSemester">Half Semester</Option>
                <Option value="oneSemester">One Semester</Option>
                <Option value="twoSemesters">Two Semesters (One Year)</Option>
              </Select>
            </Form.Item>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <Alert
              message="Photo Requirements"
              description="Please upload a recent passport size photograph. The photo should be clear, front-facing, and on a light background."
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />
            <Form.Item
              name="photo"
              label="Profile Photo"
              rules={[{ required: true, message: 'Please upload your photo' }]}
            >
              <Upload
                name="photo"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handlePhotoChange}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  <div>
                    {loading ? <LoadingOutlined /> : <UploadOutlined />}
                    <div style={{ marginTop: 8 }}>Upload Photo</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <Card title="Application Summary" className="summary-card">
              <div className="summary-section">
                <h4>Personal Details</h4>
                <p><strong>Name:</strong> {form.getFieldValue('name')}</p>
                <p><strong>Roll Number:</strong> {form.getFieldValue('rollNumber')}</p>
                <p><strong>Branch:</strong> {form.getFieldValue('branch')}</p>
                <p><strong>Year:</strong> {form.getFieldValue('year')}</p>
              </div>
              <Divider />
              <div className="summary-section">
                <h4>Contact Details</h4>
                <p><strong>Phone:</strong> {form.getFieldValue('phoneNumber')}</p>
                <p><strong>Email:</strong> {form.getFieldValue('email')}</p>
              </div>
              <Divider />
              <div className="summary-section">
                <h4>Bus Details</h4>
                <p><strong>Route Number:</strong> {form.getFieldValue('routeNumber')}</p>
                <p><strong>Boarding Point:</strong> {form.getFieldValue('boardingPoint')}</p>
                <p><strong>Pass Duration:</strong> {form.getFieldValue('passDuration')}</p>
              </div>
            </Card>
            <Alert
              message="Payment Information"
              description="You will be redirected to our secure payment gateway to complete your payment after submitting the application."
              type="info"
              showIcon
              icon={<CreditCardOutlined />}
              style={{ marginTop: 24 }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="new-application">
      <Card className="application-card">
        <Steps current={currentStep} className="application-steps">
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          <Form
            form={form}
            layout="vertical"
            className="application-form"
          >
            {renderStepContent()}
          </Form>
        </div>
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
              loading={loading}
              icon={<CreditCardOutlined />}
            >
              Submit and Proceed to Payment
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NewApplication; 