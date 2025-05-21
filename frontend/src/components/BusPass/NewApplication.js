import React, { useState, useContext, useEffect } from 'react';
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
  Modal,
  Space,
  Spin
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
  LoadingOutlined,
  CheckCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useBusPass } from '../../contexts/BusPassContext';
import { loadRazorpay } from '../../utils/razorpay';
import './NewApplication.css';

const { Option } = Select;
const { Step } = Steps;

// Get configuration from environment variables
const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const MAX_FILE_SIZE = parseInt(process.env.REACT_APP_MAX_FILE_SIZE) || 5242880;
const SUPPORTED_IMAGE_TYPES = process.env.REACT_APP_SUPPORTED_IMAGE_TYPES?.split(',') || ['image/jpeg', 'image/png'];

// const stripePromise = process.env.REACT_APP_STRIPE_PUBLIC_KEY 
//   ? loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
//   : null;

const NewApplication = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoError, setPhotoError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stepValidation, setStepValidation] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { handleBusPassSubmission } = useBusPass();

  const steps = [
    {
      title: 'Personal Details',
      content: 'personal-details-form',
      fields: ['name', 'rollNumber', 'department', 'year']
    },
    {
      title: 'Address & Contact',
      content: 'address-contact-form',
      fields: ['address', 'city', 'pincode', 'phone', 'email']
    },
    {
      title: 'Bus Details',
      content: 'bus-details-form',
      fields: ['routeNumber', 'boardingPoint', 'passDuration']
    },
    {
      title: 'Photo Upload',
      content: 'photo-upload-form',
      fields: ['photo']
    },
    {
      title: 'Review & Payment',
      content: 'review-payment-form',
      fields: []
    }
  ];

  // Load saved form data from localStorage
  useEffect(() => {
    const savedFormData = localStorage.getItem('busPassFormData');
    const savedPhotoPreview = localStorage.getItem('busPassPhotoPreview');
    
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      form.setFieldsValue(parsedData);
    }
    
    if (savedPhotoPreview) {
      setPhotoPreview(savedPhotoPreview);
      setStepValidation(prev => ({ ...prev, 3: true }));
    }

    // Pre-fill form with user data if available and no saved data exists
    if (user && !savedFormData) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone
      });
    }
  }, [user, form]);

  // Save form data to localStorage whenever it changes
  const saveFormData = (values) => {
    localStorage.setItem('busPassFormData', JSON.stringify(values));
  };

  // Update form values and save to localStorage
  const handleFormValuesChange = (changedValues, allValues) => {
    saveFormData(allValues);
  };

  const validateStep = async (step) => {
    try {
      const fields = steps[step].fields;
      await form.validateFields(fields);
      setStepValidation(prev => ({ ...prev, [step]: true }));
      return true;
    } catch (error) {
      setStepValidation(prev => ({ ...prev, [step]: false }));
      return false;
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file provided'));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoChange = async (info) => {
    setPhotoError('');
    
    try {
      const file = info.fileList?.[0]?.originFileObj || info.file?.originFileObj;
      
      if (!file) {
        setPhotoError('No file selected');
        return;
      }

      // Validate file size using environment variable
      if (file.size > MAX_FILE_SIZE) {
        setPhotoError(`Photo size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
        return;
      }

      // Validate file type using environment variable
      if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
        setPhotoError(`Only ${SUPPORTED_IMAGE_TYPES.map(type => type.split('/')[1].toUpperCase()).join('/')} files are allowed!`);
      return;
    }

      const base64Url = await getBase64(file);
      setPhotoFile(file);
      setPhotoPreview(base64Url);
      localStorage.setItem('busPassPhotoPreview', base64Url);
        setStepValidation(prev => ({ ...prev, 3: true }));
    } catch (error) {
      console.error('Error processing photo:', error);
      setPhotoError('Error processing photo. Please try again.');
    }
  };

  const handleNext = async () => {
    try {
      const isValid = await validateStep(currentStep);
      if (!isValid) {
        message.error('Please fill in all required fields correctly');
        return;
      }

      if (currentStep === 0) {
        // Check for existing pass
        try {
          const rollNumber = form.getFieldValue('rollNumber');
          const response = await fetch(`${API_URL}/api/buspass/check/${rollNumber}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include'
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
        if (data.hasPass) {
          Modal.confirm({
            title: 'Existing Pass Found',
            content: 'You already have an active pass. Would you like to proceed with renewal instead?',
            okText: 'Yes, Renew Pass',
              cancelText: 'No, Continue New',
            onOk() {
              navigate('/busspass/renew');
              }
          });
          return;
          }
        } catch (error) {
          console.error('Error checking existing pass:', error);
          // Continue with the form even if the check fails
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

  const handlePayment = async (applicationId, amount) => {
    try {
      // Create payment order with correct URL
      const response = await fetch(`${API_URL}/api/buspass/create-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          applicationId,
          amount
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const { orderId, amount: orderAmount, currency } = await response.json();

      // Load Razorpay script
      const razorpay = await loadRazorpay();

      // Create Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency,
        name: 'College Chariot',
        description: 'Bus Pass Payment',
        order_id: orderId,
        handler: async function(response) {
          try {
            // Verify payment with correct URL
            const verifyResponse = await fetch(`${API_URL}/api/buspass/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                applicationId
              })
            });

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed');
            }

            const verificationData = await verifyResponse.json();

            // Update application status in context
            if (verificationData.success) {
              // Add to recent activity
              const newActivity = {
                id: Date.now(),
                title: 'Payment Completed',
                timestamp: new Date().toLocaleString(),
                icon: <FileTextOutlined style={{ color: '#722ed1' }} />
              };

              // Update the bus pass context
              const updatedPassDetails = {
                passId: applicationId,
                status: 'Pending Approval',
                type: form.getFieldValue('passDuration') + ' Month',
                issueDate: new Date().toISOString(),
                amount: calculateAmount(form.getFieldValue('passDuration')),
                routeNumber: form.getFieldValue('routeNumber'),
                boardingPoint: form.getFieldValue('boardingPoint')
              };

              // Update context with new pass details
              handleBusPassSubmission({
                ...updatedPassDetails,
                recentActivity: newActivity
              });
            }

            // Show success message and redirect
            message.success('Payment successful! Your application is pending approval.');
            
            // Clear form data from localStorage since we're done
            localStorage.removeItem('busPassFormData');
            localStorage.removeItem('busPassPhotoPreview');

            // Redirect to the bus pass dashboard
            navigate('/busspass/');

            // Refresh the page to ensure dashboard data is updated
            window.location.reload();
          } catch (error) {
            console.error('Payment verification error:', error);
            message.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: form.getFieldValue('name'),
          email: form.getFieldValue('email'),
          contact: form.getFieldValue('phone')
        },
        theme: {
          color: '#1890ff'
        }
      };

      // Open Razorpay payment modal
      const rzp = new razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      message.error('Payment initialization failed. Please try again.');
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Get current form values
      const allValues = form.getFieldsValue(true);
      console.log("All form values:", allValues);

      // Validate all fields from all steps
      await form.validateFields([
        'name', 'rollNumber', 'department', 'year',
        'address', 'city', 'pincode', 'phone', 'email',
        'routeNumber', 'boardingPoint', 'passDuration'
      ]);

      if (!photoFile) {
        message.error('Please upload a photo');
        setLoading(false);
        return;
      }

      // Calculate amount based on pass duration
      const amount = calculateAmount(allValues.passDuration);

      // Create FormData for file upload
      const formData = new FormData();

      // Append all form fields with their values
      formData.append('name', allValues.name);
      formData.append('rollNumber', allValues.rollNumber);
      formData.append('department', allValues.department);
      formData.append('year', allValues.year);
      formData.append('email', allValues.email);
      formData.append('phone', allValues.phone);
      formData.append('address', allValues.address);
      formData.append('city', allValues.city);
      formData.append('pincode', allValues.pincode);
      formData.append('routeNumber', allValues.routeNumber);
      formData.append('boardingPoint', allValues.boardingPoint);
      formData.append('passDuration', allValues.passDuration);
      formData.append('amount', amount.toString());
      formData.append('photo', photoFile);

      // Log all form data for debugging
      console.log("Submitting form data:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Submit application
      const response = await fetch(`${API_URL}/api/buspass/apply`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to submit application');
      }

      // Handle payment
      await handlePayment(responseData.applicationId, amount);

    } catch (error) {
      console.error('Error submitting application:', error);
      if (error.errorFields) {
        // Form validation error
        message.error('Please fill in all required fields correctly');
      } else {
        message.error(error.message || 'Failed to submit application');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateAmount = (duration) => {
    const prices = {
      '0':1,
      '1': 3500,  // 1 month - ₹3,500
      '3': 10000, // 3 months - ₹10,000
      '6': 17500, // 6 months - ₹17,500
      '12': 35000 // 12 months - ₹35,000
    };
    return prices[duration] || 0;
  };

  const renderPhotoUploadStep = () => {
    return (
      <div className="photo-upload-container">
        <Card className="upload-card">
          <Alert
            message="Photo Requirements"
            description={
              <ul>
                <li>Recent passport-size photo</li>
                <li>Clear, front-facing photo</li>
                <li>Light background</li>
                <li>File size: Maximum 5MB</li>
                <li>File type: JPG or PNG only</li>
              </ul>
            }
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />
          
          <Form.Item
            name="photo"
            rules={[{ required: true, message: 'Please upload your photo!' }]}
          >
            <div className="upload-section">
              <Upload
                name="photo"
                listType="picture-card"
                className="photo-uploader"
                showUploadList={false}
                maxCount={1}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess("ok");
                  }, 0);
                }}
                beforeUpload={(file) => {
                  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                  const isLt5M = file.size / 1024 / 1024 < 5;

                  if (!isJpgOrPng) {
                    message.error('You can only upload JPG/PNG files!');
                  }
                  if (!isLt5M) {
                    message.error('Image must smaller than 5MB!');
                  }

                  return false;
                }}
                onChange={(info) => {
                  if (info.file.status !== 'uploading') {
                    handlePhotoChange(info);
                  }
                }}
              >
                {photoPreview ? (
                  <div className="photo-preview">
                    <img src={photoPreview} alt="Preview" style={{ width: '100%' }} />
                  </div>
                ) : (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload Photo</div>
                  </div>
                )}
              </Upload>
              
              {photoError && (
                <Alert message={photoError} type="error" style={{ marginTop: 16 }} />
              )}
              
              {photoPreview && (
                <div className="upload-success">
                  <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  <span style={{ marginLeft: 8 }}>Photo uploaded successfully!</span>
                </div>
              )}
            </div>
          </Form.Item>
        </Card>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: 'Please enter your full name' },
                { min: 3, message: 'Name must be at least 3 characters' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              name="rollNumber"
              label="Roll Number"
              rules={[
                { required: true, message: 'Please enter your roll number' },
                { pattern: /^[0-9]{2}[A-Z]{2}[0-9]{2}$/, message: 'Invalid roll number format (e.g., 20CS01)' }
              ]}
            >
              <Input prefix={<IdcardOutlined />} placeholder="Enter your roll number" />
            </Form.Item>

            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: 'Please select your department' }]}
            >
              <Select placeholder="Select your department">
                <Option value="CSE">Computer Science Engineering</Option>
                <Option value="ECE">Electronics & Communication Engineering</Option>
                <Option value="EEE">Electrical & Electronics Engineering</Option>
                <Option value="MECH">Mechanical Engineering</Option>
                <Option value="CIVIL">Civil Engineering</Option>
                <Option value="IT">Information Technology</Option>
                <Option value="AERO">Aeronautical Engineering</Option>
                <Option value="AUTO">Automobile Engineering</Option>
                <Option value="BIOTECH">Biotechnology Engineering</Option>
                <Option value="CHEMICAL">Chemical Engineering</Option>
                <Option value="INSTRUMENTATION">Instrumentation Engineering</Option>
                <Option value="METALLURGY">Metallurgical Engineering</Option>
                <Option value="MINING">Mining Engineering</Option>
                <Option value="PETROLEUM">Petroleum Engineering</Option>
                <Option value="TEXTILE">Textile Engineering</Option>
                <Option value="FOOD">Food Technology</Option>
                <Option value="MARINE">Marine Engineering</Option>
                <Option value="PLASTIC">Plastic Technology</Option>
                <Option value="OTHER">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="year"
              label="Year of Study"
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
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: 'Please enter your address' },
                { min: 10, message: 'Address must be at least 10 characters' }
              ]}
            >
              <Input.TextArea 
                prefix={<HomeOutlined />}
                placeholder="Enter your complete address"
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please enter your city' }]}
            >
              <Input prefix={<HomeOutlined />} placeholder="Enter your city" />
            </Form.Item>

            <Form.Item
              name="pincode"
              label="PIN Code"
              rules={[
                { required: true, message: 'Please enter your PIN code' },
                { pattern: /^[0-9]{6}$/, message: 'Invalid PIN code' }
              ]}
            >
              <Input prefix={<HomeOutlined />} placeholder="Enter 6-digit PIN code" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please enter your phone number' },
                { pattern: /^[0-9]{10}$/, message: 'Invalid phone number' }
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Enter 10-digit phone number" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Invalid email format' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <Form.Item
              name="routeNumber"
              label="Route Number"
              rules={[{ required: true, message: 'Please select your route' }]}
            >
              <Select placeholder="Select bus route">
                <Option value="1">Route 1 - L.B Nagar to MLRIT</Option>
                <Option value="2">Route 2 - BN Reddy Nagar to MLRIT</Option>
                <Option value="3">Route 3 - Sangareddy Old Bus Stop to MLRIT</Option>
                <Option value="4">Route 4 - Attapur to MLRIT</Option>
                <Option value="5">Route 5 - Zoo park to MLRIT</Option>
                <Option value="6">Route 6 - Borabanda to MLRIT</Option>
                <Option value="7">Route 7 - Malkajgiri to MLRIT</Option>
                <Option value="8">Route 8 - Sagar Ring Road to MLRIT</Option>
                <Option value="9">Route 9 - Image hospital to MLRIT</Option>
                <Option value="10">Route 10 - Kukatpally to MLRIT</Option>
                <Option value="11">Route 11 - BHEL Old LIG to MLRIT</Option>
                <Option value="12">Route 12 - Rampally X Roads to MLRIT</Option>
                <Option value="13">Route 13 - Kukatpally metro to MLRIT</Option>
                <Option value="14">Route 14 - Kukatpally-Vivekananda nagar to MLRIT</Option>
                <Option value="15">Route 15 - Gachibowli- AMB Mall to MLRIT</Option>
                <Option value="27">Route 27 - Lothkunta to MLRIT</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="boardingPoint"
              label="Boarding Point"
              rules={[{ required: true, message: 'Please select your boarding point' }]}
            >
              <Select placeholder="Select boarding point">
                <Option value="L.B Nagar">L.B Nagar</Option>
                <Option value="Ring Road">Ring Road</Option>
                <Option value="Kothapet">Kothapet</Option>
                <Option value="Fruit market">Fruit market</Option>
                <Option value="Dilsukhnagar">Dilsukhnagar</Option>
                <Option value="TV Tower">TV Tower</Option>
                <Option value="Amberpet">Amberpet</Option>
                <Option value="Shivam Road">Shivam Road</Option>
                <Option value="Vidyanagar">Vidyanagar</Option>
                <Option value="RTC X Roads">RTC X Roads</Option>
                <Option value="Musheerabad">Musheerabad</Option>
                <Option value="Chilkalaguda X road">Chilkalaguda X road</Option>
                <Option value="JBS">JBS</Option>
                <Option value="Diamond Point">Diamond Point</Option>
                <Option value="Sowjanya Colony">Sowjanya Colony</Option>
                <Option value="MMR Gardens">MMR Gardens</Option>
                <Option value="Dhulapally">Dhulapally</Option>
                <Option value="Suchitra">Suchitra</Option>
                <Option value="BN Reddy Nagar">BN Reddy Nagar</Option>
                <Option value="NGOs Colony">NGOs Colony</Option>
                <Option value="Vanasthalipuram">Vanasthalipuram</Option>
                <Option value="Nagole">Nagole</Option>
                <Option value="Uppal X Road">Uppal X Road</Option>
                <Option value="Habsiguda">Habsiguda</Option>
                <Option value="Tarnaka">Tarnaka</Option>
                <Option value="NIN">NIN</Option>
                <Option value="Sangeeth">Sangeeth</Option>
                <Option value="Vikrampuri">Vikrampuri</Option>
                <Option value="Tirumalgiri">Tirumalgiri</Option>
                <Option value="Dairy farm">Dairy farm</Option>
                <Option value="Pet Basheerbad">Pet Basheerbad</Option>
                <Option value="Kompally">Kompally</Option>
                <Option value="Sangareddy Old Bus Stop">Sangareddy Old Bus Stop</Option>
                <Option value="Sangareddy New Busstop">Sangareddy New Busstop</Option>
                <Option value="Collector Office">Collector Office</Option>
                <Option value="Kowlampet">Kowlampet</Option>
                <Option value="RUdraram">RUdraram</Option>
                <Option value="Isnapur">Isnapur</Option>
                <Option value="Muthangi">Muthangi</Option>
                <Option value="Attapur">Attapur</Option>
                <Option value="Rethibowli">Rethibowli</Option>
                <Option value="Mehdipatnam">Mehdipatnam</Option>
                <Option value="NMDC">NMDC</Option>
                <Option value="Mahveer">Mahveer</Option>
                <Option value="Lakdikapool">Lakdikapool</Option>
                <Option value="Khairathabad">Khairathabad</Option>
                <Option value="Panjagutta">Panjagutta</Option>
                <Option value="Ameerpet">Ameerpet</Option>
                <Option value="Mythrivanam">Mythrivanam</Option>
                <Option value="SR Nagar">SR Nagar</Option>
                <Option value="Erragadda">Erragadda</Option>
                <Option value="Bharath Nagar">Bharath Nagar</Option>
                <Option value="JNTU">JNTU</Option>
                <Option value="HMt Hills">HMt Hills</Option>
                <Option value="Pragathi nagar">Pragathi nagar</Option>
                <Option value="Gandimaisamma">Gandimaisamma</Option>
                <Option value="Zoo park">Zoo park</Option>
                <Option value="City College">City College</Option>
                <Option value="Goshmahal">Goshmahal</Option>
                <Option value="Moazzam Jahi Market">Moazzam Jahi Market</Option>
                <Option value="Public Gardens">Public Gardens</Option>
                <Option value="Tankbund">Tankbund</Option>
                <Option value="Ranigunj">Ranigunj</Option>
                <Option value="Begumpet">Begumpet</Option>
                <Option value="HPS">HPS</Option>
                <Option value="Greenlands">Greenlands</Option>
                <Option value="DHarmakaram">DHarmakaram</Option>
                <Option value="Balkampet">Balkampet</Option>
                <Option value="Fathenagar">Fathenagar</Option>
                <Option value="Balanagar X-road">Balanagar X-road</Option>
                <Option value="Chinthal">Chinthal</Option>
                <Option value="Shahpur Suraram">Shahpur Suraram</Option>
                <Option value="Borabanda">Borabanda</Option>
                <Option value="Motinagar">Motinagar</Option>
                <Option value="Rahmathnagar">Rahmathnagar</Option>
                <Option value="Yosufguda Check Post">Yosufguda Check Post</Option>
                <Option value="Krishnakanth Park">Krishnakanth Park</Option>
                <Option value="AG Quarters">AG Quarters</Option>
                <Option value="ESI">ESI</Option>
                <Option value="Moosapet">Moosapet</Option>
                <Option value="Y Junction">Y Junction</Option>
                <Option value="KPHB">KPHB</Option>
                <Option value="Pragathinagar">Pragathinagar</Option>
                <Option value="Malkajgiri">Malkajgiri</Option>
                <Option value="Anutex">Anutex</Option>
                <Option value="Anandbagh">Anandbagh</Option>
                <Option value="Neredmet">Neredmet</Option>
                <Option value="CDMA">CDMA</Option>
                <Option value="Alwal">Alwal</Option>
                <Option value="Sagar Ring Road">Sagar Ring Road</Option>
                <Option value="IS Sadan">IS Sadan</Option>
                <Option value="Govt Press">Govt Press</Option>
                <Option value="Malakpet">Malakpet</Option>
                <Option value="Chanderghat">Chanderghat</Option>
                <Option value="Kachiguda">Kachiguda</Option>
                <Option value="YMC">YMC</Option>
                <Option value="Narayanaguda x Road">Narayanaguda x Road</Option>
                <Option value="Chikadpally">Chikadpally</Option>
                <Option value="Indira park">Indira park</Option>
                <Option value="Lowe tank bund">Lowe tank bund</Option>
                <Option value="Paradise">Paradise</Option>
                <Option value="Tadbund">Tadbund</Option>
                <Option value="Bowenpally">Bowenpally</Option>
                <Option value="Diaryfarm">Diaryfarm</Option>
                <Option value="Gundlapochampally">Gundlapochampally</Option>
                <Option value="Image hospital">Image hospital</Option>
                <Option value="Hitech city">Hitech city</Option>
                <Option value="Shilparamam">Shilparamam</Option>
                <Option value="Malaysian Township">Malaysian Township</Option>
                <Option value="KPHB Temple Bus stop">KPHB Temple Bus stop</Option>
                <Option value="KPHB Main Road">KPHB Main Road</Option>
                <Option value="Kukatpally">Kukatpally</Option>
                <Option value="Vivekananda Nagar">Vivekananda Nagar</Option>
                <Option value="Allwyn Colony">Allwyn Colony</Option>
                <Option value="Jagadgirigutta">Jagadgirigutta</Option>
                <Option value="Gajularamaram">Gajularamaram</Option>
                <Option value="Shapur X Road">Shapur X Road</Option>
                <Option value="Jeedimetla">Jeedimetla</Option>
                <Option value="Suraram">Suraram</Option>
                <Option value="BHEL Old LIG">BHEL Old LIG</Option>
                <Option value="BHEL New MIG">BHEL New MIG</Option>
                <Option value="BHEL Kaman">BHEL Kaman</Option>
                <Option value="Madinaguda">Madinaguda</Option>
                <Option value="Miyapur">Miyapur</Option>
                <Option value="Miyapur x Roads">Miyapur x Roads</Option>
                <Option value="Bollaram">Bollaram</Option>
                <Option value="Bachupally">Bachupally</Option>
                <Option value="Rampally X Roads">Rampally X Roads</Option>
                <Option value="Nagaram">Nagaram</Option>
                <Option value="Dammaiguda">Dammaiguda</Option>
                <Option value="Saket">Saket</Option>
                <Option value="Kapra">Kapra</Option>
                <Option value="Radhika Theatre">Radhika Theatre</Option>
                <Option value="Neredmet Xroad">Neredmet Xroad</Option>
                <Option value="Lal Bazar">Lal Bazar</Option>
                <Option value="Lothkunta">Lothkunta</Option>
                <Option value="Lakadawla">Lakadawla</Option>
                <Option value="Risalabazar">Risalabazar</Option>
                <Option value="Bollarum">Bollarum</Option>
                <Option value="Kukatpally metro">Kukatpally metro</Option>
                <Option value="Kukatpally-Vivekananda nagar">Kukatpally-Vivekananda nagar</Option>
                <Option value="Reliance">Reliance</Option>
                <Option value="Park-Nizampet x Road">Park-Nizampet x Road</Option>
                <Option value="Sangamithra">Sangamithra</Option>
                <Option value="Nizampet village">Nizampet village</Option>
                <Option value="Gachibowli- AMB Mall">Gachibowli- AMB Mall</Option>
                <Option value="Kondapur">Kondapur</Option>
                <Option value="Miyapur HDFC">Miyapur HDFC</Option>
                <Option value="Chaithanya College">Chaithanya College</Option>
                <Option value="Gundalpochampally">Gundalpochampally</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="passDuration"
              label="Pass Duration"
              rules={[{ required: true, message: 'Please select pass duration' }]}
            >
              <Select placeholder="Select pass duration">
              <Option value="1">0 Month - ₹1</Option>
                <Option value="1">1 Month - ₹3,500</Option>
                <Option value="3">3 Months - ₹10,000</Option>
                <Option value="6">6 Months - ₹17,500</Option>
                <Option value="12">12 Months - ₹35,000</Option>
              </Select>
            </Form.Item>
          </div>
        );

      case 3:
        return renderPhotoUploadStep();

      case 4:
        return (
          <div className="step-content">
            <Card title="Application Summary" className="summary-card">
              <div className="summary-section">
                <h3>Personal Details</h3>
                <p><strong>Name:</strong> {form.getFieldValue('name')}</p>
                <p><strong>Roll Number:</strong> {form.getFieldValue('rollNumber')}</p>
                <p><strong>Department:</strong> {form.getFieldValue('department')}</p>
                <p><strong>Year:</strong> {form.getFieldValue('year')}</p>
              </div>

              <Divider />

              <div className="summary-section">
                <h3>Contact Details</h3>
                <p><strong>Phone:</strong> {form.getFieldValue('phone')}</p>
                <p><strong>Email:</strong> {form.getFieldValue('email')}</p>
                <p><strong>Address:</strong> {form.getFieldValue('address')}</p>
                <p><strong>City:</strong> {form.getFieldValue('city')}</p>
                <p><strong>PIN Code:</strong> {form.getFieldValue('pincode')}</p>
              </div>

              <Divider />

              <div className="summary-section">
                <h3>Bus Details</h3>
                <p><strong>Route Number:</strong> {form.getFieldValue('routeNumber')}</p>
                <p><strong>Boarding Point:</strong> {form.getFieldValue('boardingPoint')}</p>
                <p><strong>Pass Duration:</strong> {form.getFieldValue('passDuration')} Month(s)</p>
              </div>

              {photoPreview && (
                <>
                  <Divider />
                  <div className="summary-section">
                    <h3>Uploaded Photo</h3>
                    <img src={photoPreview} alt="Uploaded" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                  </div>
                </>
              )}
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  // Modify the final step button to trigger form submission
  const renderStepActions = () => {
    return (
      <div className="steps-action">
        <Space>
          {currentStep > 0 && (
            <Button onClick={handlePrev}>
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
              onClick={() => {
                form.submit(); // This will trigger form submission
              }}
              loading={loading}
              icon={<CheckCircleOutlined />}
            >
              Submit Application
            </Button>
          )}
        </Space>
      </div>
    );
  };

  return (
    <div className="new-application-container">
      <Card className="application-card">
        <Steps current={currentStep} className="application-steps">
          {steps.map(item => (
            <Step 
              key={item.title} 
              title={item.title} 
              status={
                stepValidation[steps.indexOf(item)] 
                  ? 'finish' 
                  : currentStep === steps.indexOf(item) 
                    ? 'process' 
                    : 'wait'
              }
            />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          className="application-form"
          onFinish={handleSubmit}
          onValuesChange={handleFormValuesChange}
          preserve={true} // Preserve form values between steps
        >
          {renderStepContent()}
          {renderStepActions()}
        </Form>
      </Card>
    </div>
  );
};

export default NewApplication; 