'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Space,
  Divider,
  Alert,
  Row,
  Col,
  Checkbox,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

const { Title, Text, Link } = Typography;

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/admin');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (values: LoginForm) => {
    setLoading(true);
    
    try {
      const success = await login(values.email, values.password);
      
      if (success) {
        // Redirect will happen automatically via useEffect
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role: 'admin' | 'manager' | 'editor') => {
    const credentials = {
      admin: { email: 'admin@stonesolutions.com', password: 'admin123' },
      manager: { email: 'manager@stonesolutions.com', password: 'manager123' },
      editor: { email: 'editor@stonesolutions.com', password: 'editor123' },
    };

    form.setFieldsValue(credentials[role]);
  };

  if (authLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}>
        <Card loading style={{ width: 400 }} />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <Row justify="center" align="middle" style={{ width: '100%' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Card
            style={{
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: 'none',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #1890ff, #722ed1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <LoginOutlined style={{ fontSize: '24px', color: 'white' }} />
              </div>
              <Title level={2} style={{ margin: 0, color: '#1f2937' }}>
                Stone Admin Panel
              </Title>
              <Text type="secondary">
                Sign in to access your dashboard
              </Text>
            </div>

            <Form
              form={form}
              name="login"
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
              size="large"
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter your email address' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please enter your password' },
                  { min: 6, message: 'Password must be at least 6 characters' },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  style={{
                    height: '48px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #1890ff, #722ed1)',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form.Item>
            </Form>

            <Divider>
              <Text type="secondary">Demo Accounts</Text>
            </Divider>

            <Space direction="vertical" style={{ width: '100%' }}>
              <Alert
                message="Demo Credentials Available"
                description="Click on any role below to auto-fill login credentials for testing."
                type="info"
                showIcon
                style={{ marginBottom: '16px' }}
              />

              <Row gutter={8}>
                <Col span={8}>
                  <Button
                    block
                    size="small"
                    onClick={() => fillDemoCredentials('admin')}
                    style={{ borderColor: '#52c41a', color: '#52c41a' }}
                  >
                    Admin
                  </Button>
                </Col>
                <Col span={8}>
                  <Button
                    block
                    size="small"
                    onClick={() => fillDemoCredentials('manager')}
                    style={{ borderColor: '#1890ff', color: '#1890ff' }}
                  >
                    Manager
                  </Button>
                </Col>
                <Col span={8}>
                  <Button
                    block
                    size="small"
                    onClick={() => fillDemoCredentials('editor')}
                    style={{ borderColor: '#722ed1', color: '#722ed1' }}
                  >
                    Editor
                  </Button>
                </Col>
              </Row>

              <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
                <div><strong>Admin:</strong> Full access to all features</div>
                <div><strong>Manager:</strong> Products, posts, and stones management</div>
                <div><strong>Editor:</strong> Limited to posts and banners</div>
              </div>
            </Space>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Forgot your password?{' '}
                <Link href="#" onClick={(e) => e.preventDefault()}>
                  Reset Password
                </Link>
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}