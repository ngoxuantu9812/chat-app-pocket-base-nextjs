'use client';

import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Switch,
  Select,
  Upload,
  Button,
  Space,
  message,
  Tabs,
  Typography,
  Row,
  Col,
  ColorPicker,
  Slider,
  DatePicker,
  TimePicker,
} from 'antd';
import {
  UploadOutlined,
  SaveOutlined,
  ReloadOutlined,
  SettingOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  BgColorsOutlined,
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ConfigItem {
  key: string;
  label: string;
  type: 'string' | 'number' | 'boolean' | 'image' | 'color' | 'textarea' | 'select' | 'slider' | 'date' | 'time' | 'json';
  value: any;
  description?: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

// Mock configuration data
const initialConfigs = {
  general: [
    {
      key: 'site_name',
      label: 'Site Name',
      type: 'string' as const,
      value: 'Stone Admin Panel',
      description: 'The name of your website',
    },
    {
      key: 'site_description',
      label: 'Site Description',
      type: 'textarea' as const,
      value: 'A comprehensive admin panel for managing stones and products',
      description: 'Brief description of your website',
    },
    {
      key: 'site_logo',
      label: 'Site Logo',
      type: 'image' as const,
      value: '/images/logo.png',
      description: 'Upload your site logo',
    },
    {
      key: 'maintenance_mode',
      label: 'Maintenance Mode',
      type: 'boolean' as const,
      value: false,
      description: 'Enable maintenance mode to show maintenance page',
    },
    {
      key: 'max_upload_size',
      label: 'Max Upload Size (MB)',
      type: 'number' as const,
      value: 10,
      description: 'Maximum file upload size in megabytes',
    },
  ],
  appearance: [
    {
      key: 'primary_color',
      label: 'Primary Color',
      type: 'color' as const,
      value: '#1890ff',
      description: 'Main theme color',
    },
    {
      key: 'secondary_color',
      label: 'Secondary Color',
      type: 'color' as const,
      value: '#52c41a',
      description: 'Secondary theme color',
    },
    {
      key: 'font_size',
      label: 'Base Font Size',
      type: 'slider' as const,
      value: 14,
      min: 12,
      max: 20,
      step: 1,
      description: 'Base font size in pixels',
    },
    {
      key: 'theme_mode',
      label: 'Theme Mode',
      type: 'select' as const,
      value: 'light',
      options: ['light', 'dark', 'auto'],
      description: 'Choose the theme mode',
    },
    {
      key: 'header_background',
      label: 'Header Background',
      type: 'image' as const,
      value: '',
      description: 'Background image for header',
    },
  ],
  business: [
    {
      key: 'company_name',
      label: 'Company Name',
      type: 'string' as const,
      value: 'Stone Solutions Inc.',
      description: 'Your company name',
    },
    {
      key: 'contact_email',
      label: 'Contact Email',
      type: 'string' as const,
      value: 'contact@stonesolutions.com',
      description: 'Main contact email address',
    },
    {
      key: 'phone_number',
      label: 'Phone Number',
      type: 'string' as const,
      value: '+1 (555) 123-4567',
      description: 'Main contact phone number',
    },
    {
      key: 'business_hours',
      label: 'Business Hours',
      type: 'textarea' as const,
      value: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed',
      description: 'Your business operating hours',
    },
    {
      key: 'tax_rate',
      label: 'Tax Rate (%)',
      type: 'number' as const,
      value: 8.5,
      description: 'Default tax rate percentage',
    },
    {
      key: 'currency',
      label: 'Currency',
      type: 'select' as const,
      value: 'USD',
      options: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
      description: 'Default currency for pricing',
    },
  ],
  advanced: [
    {
      key: 'api_settings',
      label: 'API Settings',
      type: 'json' as const,
      value: JSON.stringify({
        rate_limit: 1000,
        timeout: 30000,
        retry_attempts: 3
      }, null, 2),
      description: 'API configuration settings',
    },
    {
      key: 'cache_duration',
      label: 'Cache Duration (minutes)',
      type: 'number' as const,
      value: 60,
      description: 'How long to cache data in minutes',
    },
    {
      key: 'backup_time',
      label: 'Daily Backup Time',
      type: 'time' as const,
      value: '02:00',
      description: 'Time for daily automatic backups',
    },
    {
      key: 'analytics_enabled',
      label: 'Enable Analytics',
      type: 'boolean' as const,
      value: true,
      description: 'Enable website analytics tracking',
    },
  ],
};

export default function ConfigManagement() {
  const [configs, setConfigs] = useState(initialConfigs);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('general');

  const renderConfigField = (config: ConfigItem) => {
    switch (config.type) {
      case 'string':
        return (
          <Input
            placeholder={`Enter ${config.label.toLowerCase()}`}
            defaultValue={config.value}
          />
        );

      case 'textarea':
        return (
          <TextArea
            rows={4}
            placeholder={`Enter ${config.label.toLowerCase()}`}
            defaultValue={config.value}
          />
        );

      case 'number':
        return (
          <InputNumber
            style={{ width: '100%' }}
            placeholder={`Enter ${config.label.toLowerCase()}`}
            defaultValue={config.value}
            min={config.min}
            max={config.max}
            step={config.step}
          />
        );

      case 'boolean':
        return (
          <Switch
            defaultChecked={config.value}
            checkedChildren="Enabled"
            unCheckedChildren="Disabled"
          />
        );

      case 'select':
        return (
          <Select
            style={{ width: '100%' }}
            placeholder={`Select ${config.label.toLowerCase()}`}
            defaultValue={config.value}
          >
            {config.options?.map(option => (
              <Select.Option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Select.Option>
            ))}
          </Select>
        );

      case 'color':
        return (
          <ColorPicker
            defaultValue={config.value}
            showText
            style={{ width: '100%' }}
          />
        );

      case 'slider':
        return (
          <div>
            <Slider
              defaultValue={config.value}
              min={config.min}
              max={config.max}
              step={config.step}
              marks={{
                [config.min || 0]: `${config.min}`,
                [config.max || 100]: `${config.max}`,
              }}
            />
          </div>
        );

      case 'image':
        return (
          <Upload
            name="file"
            action="/api/upload"
            listType="picture"
            maxCount={1}
            defaultFileList={config.value ? [{
              uid: '-1',
              name: 'current-image',
              status: 'done',
              url: config.value,
            }] : []}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        );

      case 'date':
        return (
          <DatePicker
            style={{ width: '100%' }}
            defaultValue={config.value ? dayjs(config.value) : undefined}
          />
        );

      case 'time':
        return (
          <TimePicker
            style={{ width: '100%' }}
            defaultValue={config.value ? dayjs(config.value, 'HH:mm') : undefined}
            format="HH:mm"
          />
        );

      case 'json':
        return (
          <TextArea
            rows={8}
            placeholder="Enter valid JSON"
            defaultValue={config.value}
            style={{ fontFamily: 'monospace' }}
          />
        );

      default:
        return <Input defaultValue={config.value} />;
    }
  };

  const handleSave = async (values: any) => {
    try {
      // Here you would typically save to your backend
      console.log('Saving configs:', values);
      message.success('Configuration saved successfully');
    } catch (error) {
      message.error('Failed to save configuration');
    }
  };

  const handleReset = () => {
    form.resetFields();
    message.info('Configuration reset to default values');
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'general',
      label: (
        <span>
          <SettingOutlined />
          General
        </span>
      ),
      children: (
        <Row gutter={24}>
          {configs.general.map((config) => (
            <Col span={24} key={config.key} style={{ marginBottom: 24 }}>
              <Card size="small">
                <Form.Item
                  name={config.key}
                  label={<Text strong>{config.label}</Text>}
                  extra={config.description && (
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {config.description}
                    </Text>
                  )}
                >
                  {renderConfigField(config)}
                </Form.Item>
              </Card>
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: 'appearance',
      label: (
        <span>
          <BgColorsOutlined />
          Appearance
        </span>
      ),
      children: (
        <Row gutter={24}>
          {configs.appearance.map((config) => (
            <Col span={24} key={config.key} style={{ marginBottom: 24 }}>
              <Card size="small">
                <Form.Item
                  name={config.key}
                  label={<Text strong>{config.label}</Text>}
                  extra={config.description && (
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {config.description}
                    </Text>
                  )}
                >
                  {renderConfigField(config)}
                </Form.Item>
              </Card>
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: 'business',
      label: (
        <span>
          <GlobalOutlined />
          Business
        </span>
      ),
      children: (
        <Row gutter={24}>
          {configs.business.map((config) => (
            <Col span={24} key={config.key} style={{ marginBottom: 24 }}>
              <Card size="small">
                <Form.Item
                  name={config.key}
                  label={<Text strong>{config.label}</Text>}
                  extra={config.description && (
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {config.description}
                    </Text>
                  )}
                >
                  {renderConfigField(config)}
                </Form.Item>
              </Card>
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: 'advanced',
      label: (
        <span>
          <AppstoreOutlined />
          Advanced
        </span>
      ),
      children: (
        <Row gutter={24}>
          {configs.advanced.map((config) => (
            <Col span={24} key={config.key} style={{ marginBottom: 24 }}>
              <Card size="small">
                <Form.Item
                  name={config.key}
                  label={<Text strong>{config.label}</Text>}
                  extra={config.description && (
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {config.description}
                    </Text>
                  )}
                >
                  {renderConfigField(config)}
                </Form.Item>
              </Card>
            </Col>
          ))}
        </Row>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2}>Configuration Management</Title>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            Reset
          </Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()}>
            Save Changes
          </Button>
        </Space>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            type="card"
          />
        </Form>
      </Card>
    </div>
  );
}