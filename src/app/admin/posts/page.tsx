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
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  publishDate: string;
  tags: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const initialPosts: Post[] = [
  {
    id: '1',
    title: 'The Beauty of Natural Stones in Modern Architecture',
    content: 'Natural stones have been used in construction for centuries...',
    excerpt: 'Discover how natural stones enhance modern architectural designs',
    author: 'John Smith',
    category: 'Architecture',
    status: 'published',
    featured: true,
    publishDate: '2024-01-15',
    tags: ['architecture', 'stones', 'design'],
    image: '/images/post1.jpg',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Garden Design with Decorative Stones',
    content: 'Transform your garden with beautiful decorative stones...',
    excerpt: 'Learn how to create stunning garden landscapes using stones',
    author: 'Jane Doe',
    category: 'Gardening',
    status: 'published',
    featured: false,
    publishDate: '2024-01-10',
    tags: ['gardening', 'landscape', 'decoration'],
    image: '/images/post2.jpg',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
  },
  {
    id: '3',
    title: 'Maintenance Tips for Stone Surfaces',
    content: 'Keep your stone surfaces looking pristine with these tips...',
    excerpt: 'Essential maintenance guide for stone surfaces',
    author: 'Mike Johnson',
    category: 'Maintenance',
    status: 'draft',
    featured: false,
    publishDate: '2024-01-20',
    tags: ['maintenance', 'care', 'tips'],
    image: '/images/post3.jpg',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
  },
];

export default function PostManagement() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [form] = Form.useForm();

  const columns: ColumnsType<Post> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title: string, record: Post) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{title}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.excerpt}</div>
        </div>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sorter: (a, b) => a.author.localeCompare(b.author),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Architecture', value: 'Architecture' },
        { text: 'Gardening', value: 'Gardening' },
        { text: 'Maintenance', value: 'Maintenance' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          published: 'green',
          draft: 'orange',
          archived: 'red',
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: 'Published', value: 'published' },
        { text: 'Draft', value: 'draft' },
        { text: 'Archived', value: 'archived' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured: boolean) => (
        <Tag color={featured ? 'gold' : 'default'}>
          {featured ? 'Featured' : 'Normal'}
        </Tag>
      ),
    },
    {
      title: 'Publish Date',
      dataIndex: 'publishDate',
      key: 'publishDate',
      sorter: (a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime(),
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
            title="Are you sure you want to delete this post?"
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
    setEditingPost(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    form.setFieldsValue({
      ...post,
      publishDate: dayjs(post.publishDate),
      tags: post.tags.join(', '),
    });
    setIsModalVisible(true);
  };

  const handleView = (post: Post) => {
    Modal.info({
      title: post.title,
      content: (
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          <p><strong>Author:</strong> {post.author}</p>
          <p><strong>Category:</strong> {post.category}</p>
          <p><strong>Status:</strong> {post.status}</p>
          <p><strong>Featured:</strong> {post.featured ? 'Yes' : 'No'}</p>
          <p><strong>Publish Date:</strong> {post.publishDate}</p>
          <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
          <p><strong>Excerpt:</strong> {post.excerpt}</p>
          <p><strong>Content:</strong></p>
          <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px' }}>
            {post.content}
          </div>
        </div>
      ),
      width: 800,
    });
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    message.success('Post deleted successfully');
  };

  const handleSubmit = async (values: any) => {
    try {
      const processedValues = {
        ...values,
        publishDate: values.publishDate.format('YYYY-MM-DD'),
        tags: values.tags ? values.tags.split(',').map((tag: string) => tag.trim()) : [],
        updatedAt: new Date().toISOString().split('T')[0],
      };

      if (editingPost) {
        // Update existing post
        setPosts(posts.map(post =>
          post.id === editingPost.id
            ? { ...post, ...processedValues }
            : post
        ));
        message.success('Post updated successfully');
      } else {
        // Add new post
        const newPost: Post = {
          id: Date.now().toString(),
          ...processedValues,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setPosts([...posts, newPost]);
        message.success('Post added successfully');
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
        <Title level={2}>Post Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Post
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={posts}
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
        title={editingPost ? 'Edit Post' : 'Add Post'}
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
            status: 'draft',
            featured: false,
            publishDate: dayjs(),
            author: 'Admin User',
          }}
        >
          <Form.Item
            name="title"
            label="Post Title"
            rules={[{ required: true, message: 'Please enter post title' }]}
          >
            <Input placeholder="Enter post title" />
          </Form.Item>

          <Form.Item
            name="excerpt"
            label="Excerpt"
            rules={[{ required: true, message: 'Please enter post excerpt' }]}
          >
            <TextArea rows={2} placeholder="Enter post excerpt" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter post content' }]}
          >
            <TextArea rows={8} placeholder="Enter post content" />
          </Form.Item>

          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please enter author name' }]}
          >
            <Input placeholder="Enter author name" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="Architecture">Architecture</Select.Option>
              <Select.Option value="Gardening">Gardening</Select.Option>
              <Select.Option value="Maintenance">Maintenance</Select.Option>
              <Select.Option value="Design">Design</Select.Option>
              <Select.Option value="News">News</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="published">Published</Select.Option>
              <Select.Option value="draft">Draft</Select.Option>
              <Select.Option value="archived">Archived</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="publishDate"
            label="Publish Date"
            rules={[{ required: true, message: 'Please select publish date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="featured"
            label="Featured Post"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags (comma separated)"
          >
            <Input placeholder="Enter tags separated by commas" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Featured Image"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingPost ? 'Update' : 'Add'} Post
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