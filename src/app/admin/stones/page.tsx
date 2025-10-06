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
  Switch,
  Rate,
  Image,
  Tabs,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
  StarOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Stone {
  id: string;
  name: string;
  description: string;
  type: 'natural' | 'engineered' | 'composite';
  category: 'marble' | 'granite' | 'limestone' | 'sandstone' | 'slate' | 'quartzite' | 'travertine';
  color: string;
  pattern: string;
  finish: 'polished' | 'honed' | 'brushed' | 'flamed' | 'sandblasted';
  hardness: number; // Mohs scale 1-10
  porosity: 'low' | 'medium' | 'high';
  pricePerSqFt: number;
  thickness: number; // in mm
  origin: string;
  supplier: string;
  stock: number;
  minOrder: number;
  leadTime: number; // in days
  rating: number;
  applications: string[];
  images: string[];
  specifications: {
    density: number;
    compressiveStrength: number;
    waterAbsorption: number;
    thermalConductivity: number;
  };
  status: 'available' | 'discontinued' | 'preorder';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const initialStones: Stone[] = [
  {
    id: '1',
    name: 'Carrara White Marble',
    description: 'Premium Italian marble with distinctive veining patterns',
    type: 'natural',
    category: 'marble',
    color: 'White with gray veining',
    pattern: 'Veined',
    finish: 'polished',
    hardness: 3,
    porosity: 'medium',
    pricePerSqFt: 45.99,
    thickness: 20,
    origin: 'Carrara, Italy',
    supplier: 'Italian Stone Co.',
    stock: 500,
    minOrder: 50,
    leadTime: 14,
    rating: 4.8,
    applications: ['Countertops', 'Flooring', 'Wall Cladding', 'Sculptures'],
    images: ['/images/carrara-marble-1.jpg', '/images/carrara-marble-2.jpg'],
    specifications: {
      density: 2.7,
      compressiveStrength: 100,
      waterAbsorption: 0.4,
      thermalConductivity: 2.5,
    },
    status: 'available',
    featured: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Black Galaxy Granite',
    description: 'Stunning black granite with golden speckles',
    type: 'natural',
    category: 'granite',
    color: 'Black with gold speckles',
    pattern: 'Speckled',
    finish: 'polished',
    hardness: 7,
    porosity: 'low',
    pricePerSqFt: 38.50,
    thickness: 30,
    origin: 'Andhra Pradesh, India',
    supplier: 'Indian Granite Ltd.',
    stock: 750,
    minOrder: 100,
    leadTime: 21,
    rating: 4.6,
    applications: ['Countertops', 'Flooring', 'Monuments'],
    images: ['/images/black-galaxy-1.jpg', '/images/black-galaxy-2.jpg'],
    specifications: {
      density: 2.9,
      compressiveStrength: 200,
      waterAbsorption: 0.1,
      thermalConductivity: 3.2,
    },
    status: 'available',
    featured: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Travertine Beige',
    description: 'Classic beige travertine with natural pitted surface',
    type: 'natural',
    category: 'travertine',
    color: 'Beige',
    pattern: 'Natural pitted',
    finish: 'honed',
    hardness: 4,
    porosity: 'high',
    pricePerSqFt: 25.75,
    thickness: 15,
    origin: 'Turkey',
    supplier: 'Mediterranean Stone',
    stock: 200,
    minOrder: 25,
    leadTime: 10,
    rating: 4.2,
    applications: ['Flooring', 'Wall Cladding', 'Pool Decking'],
    images: ['/images/travertine-beige-1.jpg'],
    specifications: {
      density: 2.4,
      compressiveStrength: 80,
      waterAbsorption: 2.5,
      thermalConductivity: 1.8,
    },
    status: 'available',
    featured: false,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
  },
];

export default function StoneManagement() {
  const [stones, setStones] = useState<Stone[]>(initialStones);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStone, setEditingStone] = useState<Stone | null>(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('list');

  const columns: ColumnsType<Stone> = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      width: 100,
      render: (images: string[], record: Stone) => (
        <Image
          width={80}
          height={60}
          src={images[0] || '/images/stone-placeholder.png'}
          alt={record.name}
          style={{ objectFit: 'cover', borderRadius: '4px' }}
          fallback="/images/stone-placeholder.png"
        />
      ),
    },
    {
      title: 'Stone Details',
      key: 'details',
      render: (_, record: Stone) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{record.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.category} • {record.color}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.origin} • {record.finish}
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colors = {
          natural: 'green',
          engineered: 'blue',
          composite: 'purple',
        };
        return (
          <Tag color={colors[type as keyof typeof colors]}>
            {type.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: 'Natural', value: 'natural' },
        { text: 'Engineered', value: 'engineered' },
        { text: 'Composite', value: 'composite' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag>{category.toUpperCase()}</Tag>
      ),
      filters: [
        { text: 'Marble', value: 'marble' },
        { text: 'Granite', value: 'granite' },
        { text: 'Limestone', value: 'limestone' },
        { text: 'Sandstone', value: 'sandstone' },
        { text: 'Slate', value: 'slate' },
        { text: 'Quartzite', value: 'quartzite' },
        { text: 'Travertine', value: 'travertine' },
      ],
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Price/SqFt',
      dataIndex: 'pricePerSqFt',
      key: 'pricePerSqFt',
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.pricePerSqFt - b.pricePerSqFt,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={stock > 100 ? 'green' : stock > 50 ? 'orange' : 'red'}>
          {stock} sqft
        </Tag>
      ),
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Rate disabled defaultValue={rating} style={{ fontSize: '12px' }} />
          <span style={{ marginLeft: '8px', fontSize: '12px' }}>{rating}</span>
        </div>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          available: 'green',
          discontinued: 'red',
          preorder: 'orange',
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.toUpperCase()}
          </Tag>
        );
      },
      filters: [
        { text: 'Available', value: 'available' },
        { text: 'Discontinued', value: 'discontinued' },
        { text: 'Pre-order', value: 'preorder' },
      ],
      onFilter: (value, record) => record.status === value,
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
            title="Are you sure you want to delete this stone?"
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
    setEditingStone(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (stone: Stone) => {
    setEditingStone(stone);
    form.setFieldsValue({
      ...stone,
      applications: stone.applications.join(', '),
    });
    setIsModalVisible(true);
  };

  const handleView = (stone: Stone) => {
    Modal.info({
      title: stone.name,
      content: (
        <div style={{ maxHeight: '600px', overflow: 'auto' }}>
          <div style={{ marginBottom: '16px' }}>
            <Image.PreviewGroup>
              {stone.images.map((img, index) => (
                <Image
                  key={index}
                  width={120}
                  height={90}
                  src={img}
                  alt={`${stone.name} ${index + 1}`}
                  style={{ objectFit: 'cover', borderRadius: '4px', marginRight: '8px' }}
                />
              ))}
            </Image.PreviewGroup>
          </div>
          
          <Row gutter={16}>
            <Col span={12}>
              <p><strong>Description:</strong> {stone.description}</p>
              <p><strong>Type:</strong> {stone.type}</p>
              <p><strong>Category:</strong> {stone.category}</p>
              <p><strong>Color:</strong> {stone.color}</p>
              <p><strong>Pattern:</strong> {stone.pattern}</p>
              <p><strong>Finish:</strong> {stone.finish}</p>
              <p><strong>Hardness:</strong> {stone.hardness} (Mohs scale)</p>
              <p><strong>Porosity:</strong> {stone.porosity}</p>
            </Col>
            <Col span={12}>
              <p><strong>Price per SqFt:</strong> ${stone.pricePerSqFt}</p>
              <p><strong>Thickness:</strong> {stone.thickness}mm</p>
              <p><strong>Origin:</strong> {stone.origin}</p>
              <p><strong>Supplier:</strong> {stone.supplier}</p>
              <p><strong>Stock:</strong> {stone.stock} sqft</p>
              <p><strong>Min Order:</strong> {stone.minOrder} sqft</p>
              <p><strong>Lead Time:</strong> {stone.leadTime} days</p>
              <p><strong>Rating:</strong> {stone.rating}/5</p>
            </Col>
          </Row>
          
          <p><strong>Applications:</strong> {stone.applications.join(', ')}</p>
          
          <p><strong>Technical Specifications:</strong></p>
          <ul>
            <li>Density: {stone.specifications.density} g/cm³</li>
            <li>Compressive Strength: {stone.specifications.compressiveStrength} MPa</li>
            <li>Water Absorption: {stone.specifications.waterAbsorption}%</li>
            <li>Thermal Conductivity: {stone.specifications.thermalConductivity} W/mK</li>
          </ul>
        </div>
      ),
      width: 900,
    });
  };

  const handleDelete = (id: string) => {
    setStones(stones.filter(stone => stone.id !== id));
    message.success('Stone deleted successfully');
  };

  const handleSubmit = async (values: any) => {
    try {
      const processedValues = {
        ...values,
        applications: values.applications ? values.applications.split(',').map((app: string) => app.trim()) : [],
        updatedAt: new Date().toISOString().split('T')[0],
        specifications: {
          density: values.density || 0,
          compressiveStrength: values.compressiveStrength || 0,
          waterAbsorption: values.waterAbsorption || 0,
          thermalConductivity: values.thermalConductivity || 0,
        },
      };

      if (editingStone) {
        // Update existing stone
        setStones(stones.map(stone =>
          stone.id === editingStone.id
            ? { ...stone, ...processedValues }
            : stone
        ));
        message.success('Stone updated successfully');
      } else {
        // Add new stone
        const newStone: Stone = {
          id: Date.now().toString(),
          ...processedValues,
          images: ['/images/stone-placeholder.png'],
          createdAt: new Date().toISOString().split('T')[0],
        };
        setStones([...stones, newStone]);
        message.success('Stone added successfully');
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
    multiple: true,
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

  // Statistics for dashboard tab
  const totalStones = stones.length;
  const availableStones = stones.filter(s => s.status === 'available').length;
  const totalValue = stones.reduce((sum, stone) => sum + (stone.stock * stone.pricePerSqFt), 0);
  const avgRating = stones.reduce((sum, stone) => sum + stone.rating, 0) / stones.length;

  const tabItems: TabsProps['items'] = [
    {
      key: 'list',
      label: 'Stone List',
      children: (
        <Card>
          <Table
            columns={columns}
            dataSource={stones}
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
      ),
    },
    {
      key: 'dashboard',
      label: 'Dashboard',
      children: (
        <div>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Stones"
                  value={totalStones}
                  prefix={<ShoppingOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Available"
                  value={availableStones}
                  suffix={`/ ${totalStones}`}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Total Inventory Value"
                  value={totalValue}
                  prefix="$"
                  precision={2}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Average Rating"
                  value={avgRating}
                  precision={1}
                  suffix="/ 5"
                  prefix={<StarOutlined />}
                  valueStyle={{ color: '#eb2f96' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Card title="Stone Categories" size="small">
                {Object.entries(
                  stones.reduce((acc, stone) => {
                    acc[stone.category] = (acc[stone.category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, count]) => (
                  <div key={category} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                    <Tag>{count}</Tag>
                  </div>
                ))}
              </Card>
            </Col>
            
            <Col span={12}>
              <Card title="Stone Types" size="small">
                {Object.entries(
                  stones.reduce((acc, stone) => {
                    acc[stone.type] = (acc[stone.type] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([type, count]) => (
                  <div key={type} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    <Tag>{count}</Tag>
                  </div>
                ))}
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2}>Stone Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Stone
        </Button>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        type="card"
      />

      <Modal
        title={editingStone ? 'Edit Stone' : 'Add Stone'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={900}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'available',
            type: 'natural',
            category: 'marble',
            finish: 'polished',
            porosity: 'medium',
            hardness: 5,
            thickness: 20,
            rating: 4.0,
            featured: false,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Stone Name"
                rules={[{ required: true, message: 'Please enter stone name' }]}
              >
                <Input placeholder="Enter stone name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Stone Type"
                rules={[{ required: true, message: 'Please select stone type' }]}
              >
                <Select placeholder="Select stone type">
                  <Select.Option value="natural">Natural</Select.Option>
                  <Select.Option value="engineered">Engineered</Select.Option>
                  <Select.Option value="composite">Composite</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea rows={3} placeholder="Enter stone description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category">
                  <Select.Option value="marble">Marble</Select.Option>
                  <Select.Option value="granite">Granite</Select.Option>
                  <Select.Option value="limestone">Limestone</Select.Option>
                  <Select.Option value="sandstone">Sandstone</Select.Option>
                  <Select.Option value="slate">Slate</Select.Option>
                  <Select.Option value="quartzite">Quartzite</Select.Option>
                  <Select.Option value="travertine">Travertine</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="finish"
                label="Finish"
                rules={[{ required: true, message: 'Please select finish' }]}
              >
                <Select placeholder="Select finish">
                  <Select.Option value="polished">Polished</Select.Option>
                  <Select.Option value="honed">Honed</Select.Option>
                  <Select.Option value="brushed">Brushed</Select.Option>
                  <Select.Option value="flamed">Flamed</Select.Option>
                  <Select.Option value="sandblasted">Sandblasted</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="porosity"
                label="Porosity"
                rules={[{ required: true, message: 'Please select porosity' }]}
              >
                <Select placeholder="Select porosity">
                  <Select.Option value="low">Low</Select.Option>
                  <Select.Option value="medium">Medium</Select.Option>
                  <Select.Option value="high">High</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="color"
                label="Color"
                rules={[{ required: true, message: 'Please enter color' }]}
              >
                <Input placeholder="Enter stone color" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="pattern"
                label="Pattern"
                rules={[{ required: true, message: 'Please enter pattern' }]}
              >
                <Input placeholder="Enter stone pattern" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="pricePerSqFt"
                label="Price per SqFt ($)"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.01}
                  placeholder="0.00"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="thickness"
                label="Thickness (mm)"
                rules={[{ required: true, message: 'Please enter thickness' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={1}
                  placeholder="20"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="hardness"
                label="Hardness (Mohs)"
                rules={[{ required: true, message: 'Please enter hardness' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={1}
                  max={10}
                  placeholder="5"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="origin"
                label="Origin"
                rules={[{ required: true, message: 'Please enter origin' }]}
              >
                <Input placeholder="Enter stone origin" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="supplier"
                label="Supplier"
                rules={[{ required: true, message: 'Please enter supplier' }]}
              >
                <Input placeholder="Enter supplier name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="stock"
                label="Stock (SqFt)"
                rules={[{ required: true, message: 'Please enter stock' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  placeholder="0"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="minOrder"
                label="Min Order (SqFt)"
                rules={[{ required: true, message: 'Please enter minimum order' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={1}
                  placeholder="50"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="leadTime"
                label="Lead Time (Days)"
                rules={[{ required: true, message: 'Please enter lead time' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={1}
                  placeholder="14"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Select.Option value="available">Available</Select.Option>
                  <Select.Option value="discontinued">Discontinued</Select.Option>
                  <Select.Option value="preorder">Pre-order</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="rating"
                label="Rating"
                rules={[{ required: true, message: 'Please enter rating' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={1}
                  max={5}
                  step={0.1}
                  placeholder="4.0"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="applications"
            label="Applications (comma separated)"
          >
            <Input placeholder="Countertops, Flooring, Wall Cladding" />
          </Form.Item>

          <Form.Item
            name="featured"
            label="Featured Stone"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="images"
            label="Stone Images"
          >
            <Upload {...uploadProps} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
          </Form.Item>

          <Typography.Title level={5}>Technical Specifications</Typography.Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="density"
                label="Density (g/cm³)"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.1}
                  placeholder="2.7"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="compressiveStrength"
                label="Compressive Strength (MPa)"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  placeholder="100"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="waterAbsorption"
                label="Water Absorption (%)"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.1}
                  placeholder="0.4"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="thermalConductivity"
                label="Thermal Conductivity (W/mK)"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  step={0.1}
                  placeholder="2.5"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingStone ? 'Update' : 'Add'} Stone
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