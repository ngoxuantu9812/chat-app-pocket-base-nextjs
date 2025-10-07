'use client';

import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, Space } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { authApi } from '@/lib/auth';

interface ChangePasswordModalProps {
  open: boolean;
  onCancel: () => void;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordModal({ open, onCancel }: ChangePasswordModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: PasswordForm) => {
    setLoading(true);
    
    try {
      const result = await authApi.changePassword(values.currentPassword, values.newPassword);
      
      if (result.success) {
        message.success(result.message || 'Password changed successfully');
        form.resetFields();
        onCancel();
      } else {
        message.error(result.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Change password error:', error);
      message.error('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Change Password"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={400}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            { required: true, message: 'Please enter your current password' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter current password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: 'Please enter your new password' },
            { min: 6, message: 'Password must be at least 6 characters' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter new password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm new password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Change Password
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}