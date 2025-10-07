'use client';

import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Popconfirm,
  Tag,
  Typography,
  Card,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ProtectedRoute, { PermissionWrapper, usePermissions } from '@/components/ProtectedRoute';

const { Title } = Typography;
const { TextArea } = Input;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  createdAt: string;
}

// Mock data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Stone Collection',
    description: 'High-quality natural stones for decoration',
    price: 299.99,
    category: 'Stones',
    stock: 50,
    status: 'active',
    image: '/images/stone1.jpg',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Marble Finish Set',
    description: 'Elegant marble finish stones',
    price: 199.99,
    category: 'Stones',
    stock: 25,
    status: 'active',
    image: '/images/stone2.jpg',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Garden Stone Pack',
    description: 'Perfect for garden landscaping',
    price: 149.99,
    category: 'Garden',
    stock: 0,
    status: 'inactive',
    image: '/images/stone3.jpg',
    createdAt: '2024-01-05',
  },
];

function ProductManagementContent() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const { hasPermission } = usePermissions();

  const columns: ColumnsType<Product> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Stones', value: 'Stones' },
        { text: 'Garden', value: 'Garden' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={stock > 0 ? 'green' : 'red'}>
          {stock > 0 ? `${stock} in stock` : 'Out of stock'}
        </Tag>
      ),
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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
            title="Are you sure you want to delete this product?"
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
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleView = (product: Product) => {
    Modal.info({
      title: product.name,
      content: (
        <div>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Status:</strong> {product.status}</p>
          <p><strong>Created:</strong> {product.createdAt}</p>
        </div>
      ),
      width: 600,
    });
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    message.success('Product deleted successfully');
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingProduct) {
        // Update existing product
        setProducts(products.map(product =>
          product.id === editingProduct.id
            ? { ...product, ...values }
            : product
        ));
        message.success('Product updated successfully');
      } else {
        // Add new product
        const newProduct: Product = {
          id: Date.now().toString(),
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setProducts([...products, newProduct]);
        message.success('Product added successfully');
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
        <Title level={2}>Product Management</Title>
        {hasPermission('products:write') && (
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Product
          </Button>
        )}
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={products}
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
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'active',
            category: 'Stones',
          }}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              step={0.01}
              placeholder="0.00"
              prefix="$"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="Stones">Stones</Select.Option>
              <Select.Option value="Garden">Garden</Select.Option>
              <Select.Option value="Decoration">Decoration</Select.Option>
              <Select.Option value="Tools">Tools</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock Quantity"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="0"
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="image"
            label="Product Image"
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingProduct ? 'Update' : 'Add'} Product
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

export default function ProductManagement() {
  return (
    <ProtectedRoute requiredPermissions={['products:read']}>
      <ProductManagementContent />
    </ProtectedRoute>
  );
}