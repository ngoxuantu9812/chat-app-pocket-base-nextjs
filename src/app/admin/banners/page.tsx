'use client';

import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Popconfirm,
  Tag,
  Typography,
  Card,
  Switch,
  DatePicker,
  InputNumber,
  Image,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
  DragOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;

interface Banner {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  position: 'header' | 'sidebar' | 'footer' | 'popup' | 'inline';
  status: 'active' | 'inactive' | 'scheduled';
  priority: number;
  startDate: string;
  endDate: string;
  clickCount: number;
  impressions: number;
  targetAudience: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const initialBanners: Banner[] = [
  {
    id: '1',
    title: 'Summer Stone Collection',
    description: 'Discover our premium summer stone collection with 30% off',
    image: '/images/banner1.jpg',
    link: '/products/summer-collection',
    position: 'header',
    status: 'active',
    priority: 1,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    clickCount: 1250,
    impressions: 15000,
    targetAudience: 'all',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Garden Design Workshop',
    description: 'Join our free garden design workshop this weekend',
    image: '/images/banner2.jpg',
    link: '/events/garden-workshop',
    position: 'sidebar',
    status: 'active',
    priority: 2,
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    clickCount: 450,
    impressions: 8500,
    targetAudience: 'gardeners',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'New Product Launch',
    description: 'Introducing our latest marble collection',
    image: '/images/banner3.jpg',
    link: '/products/marble-collection',
    position: 'popup',
    status: 'scheduled',
    priority: 3,
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    clickCount: 0,
    impressions: 0,
    targetAudience: 'premium',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
  },
];

export default function BannerManagement() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [form] = Form.useForm();

  const columns: ColumnsType<Banner> = [
    {
      title: 'Preview',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (image: string, record: Banner) => (
        <Image
          width={80}
          height={50}
          src={image}
          alt={record.title}
          style={{ objectFit: 'cover', borderRadius: '4px' }}
          fallback="/images/placeholder.png"
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title: string, record: Banner) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{title}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position: string) => {
        const colors = {
          header: 'blue',
          sidebar: 'green',
          footer: 'orange',
          popup: 'purple',
          inline: 'cyan',
        };
        return (
          <Tag color={colors[position as keyof typeof colors]}>
            {position.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: 'Header', value: 'header' },
        { text: 'Sidebar', value: 'sidebar' },
        { text: 'Footer', value: 'footer' },
        { text: 'Popup', value: 'popup' },
        { text: 'Inline', value: 'inline' },
      ],
      onFilter: (value, record) => record.position === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          active: 'green',
          inactive: 'red',
          scheduled: 'orange',
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Scheduled', value: 'scheduled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      sorter: (a, b) => a.priority - b.priority,
      render: (priority: number) => (
        <Tag color={priority <= 3 ? 'red' : priority <= 6 ? 'orange' : 'green'}>
          {priority}
        </Tag>
      ),
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (_, record: Banner) => (
        <div style={{ fontSize: '12px' }}>
          <div>Clicks: {record.clickCount.toLocaleString()}</div>
          <div>Views: {record.impressions.toLocaleString()}</div>
          <div>CTR: {record.impressions > 0 ? ((record.clickCount / record.impressions) * 100).toFixed(2) : 0}%</div>
        </div>
      ),
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (_, record: Banner) => (
        <div style={{ fontSize: '12px' }}>
          <div>Start: {record.startDate}</div>
          <div>End: {record.endDate}</div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleView(record)}
          />
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this banner?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingBanner(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    form.setFieldsValue({
      ...banner,
      startDate: dayjs(banner.startDate),
      endDate: dayjs(banner.endDate),
    });
    setIsModalVisible(true);
  };

  const handleView = (banner: Banner) => {
    Modal.info({
      title: banner.title,
      content: (
        <div style={{ maxHeight: '500px', overflow: 'auto' }}>
          <div style={{ marginBottom: '16px' }}>
            <Image
              width="100%"
              height={200}
              src={banner.image}
              alt={banner.title}
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
          <p><strong>Description:</strong> {banner.description}</p>
          <p><strong>Link:</strong> <a href={banner.link} target="_blank" rel="noopener noreferrer">{banner.link}</a></p>
          <p><strong>Position:</strong> {banner.position}</p>
          <p><strong>Status:</strong> {banner.status}</p>
          <p><strong>Priority:</strong> {banner.priority}</p>
          <p><strong>Target Audience:</strong> {banner.targetAudience}</p>
          <p><strong>Duration:</strong> {banner.startDate} to {banner.endDate}</p>
          <p><strong>Performance:</strong></p>
          <ul>
            <li>Clicks: {banner.clickCount.toLocaleString()}</li>
            <li>Impressions: {banner.impressions.toLocaleString()}</li>
            <li>CTR: {banner.impressions > 0 ? ((banner.clickCount / banner.impressions) * 100).toFixed(2) : 0}%</li>
          </ul>
        </div>
      ),
      width: 800,
    });
  };

  const handleDelete = (id: string) => {
    setBanners(banners.filter(banner => banner.id !== id));
    message.success('Banner deleted successfully');
  };

  const handleSubmit = async (values: any) => {
    try {
      const processedValues = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
        updatedAt: new Date().toISOString().split('T')[0],
      };

      if (editingBanner) {
        // Update existing banner
        setBanners(banners.map(banner =>
          banner.id === editingBanner.id
            ? { ...banner, ...processedValues }
            : banner
        ));
        message.success('Banner updated successfully');
      } else {
        // Add new banner
        const newBanner: Banner = {
          id: Date.now().toString(),
          ...processedValues,
          clickCount: 0,
          impressions: 0,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setBanners([...banners, newBanner]);
        message.success('Banner added successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2}>Banner Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Banner
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={banners}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Card>

      <Modal
        title={editingBanner ? 'Edit Banner' : 'Add Banner'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'active',
            position: 'header',
            priority: 5,
            targetAudience: 'all',
            startDate: dayjs(),
            endDate: dayjs().add(1, 'month'),
          }}
        >
          <Form.Item
            name="title"
            label="Banner Title"
            rules={[{ required: true, message: 'Please enter banner title' }]}
          >
            <Input placeholder="Enter banner title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={3} placeholder="Enter banner description" />
          </Form.Item>

          <Form.Item
            name="link"
            label="Link URL"
            rules={[{ required: true, message: 'Please enter link URL' }]}
          >
            <Input placeholder="https://example.com" />
          </Form.Item>

          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Please select position' }]}
          >
            <Select placeholder="Select banner position">
              <Select.Option value="header">Header</Select.Option>
              <Select.Option value="sidebar">Sidebar</Select.Option>
              <Select.Option value="footer">Footer</Select.Option>
              <Select.Option value="popup">Popup</Select.Option>
              <Select.Option value="inline">Inline</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
              <Select.Option value="scheduled">Scheduled</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority (1-10)"
            rules={[{ required: true, message: 'Please enter priority' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={10}
              placeholder="Enter priority (1 = highest)"
            />
          </Form.Item>

          <Form.Item
            name="targetAudience"
            label="Target Audience"
            rules={[{ required: true, message: 'Please select target audience' }]}
          >
            <Select placeholder="Select target audience">
              <Select.Option value="all">All Visitors</Select.Option>
              <Select.Option value="new">New Visitors</Select.Option>
              <Select.Option value="returning">Returning Visitors</Select.Option>
              <Select.Option value="premium">Premium Customers</Select.Option>
              <Select.Option value="gardeners">Gardeners</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select end date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Banner Image"
            rules={[{ required: true, message: 'Please upload banner image' }]}
          >
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingBanner ? 'Update' : 'Add'} Banner
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}