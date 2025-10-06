'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space, Progress } from 'antd';
import {
  ShoppingOutlined,
  FileTextOutlined,
  PictureOutlined,
  AppstoreOutlined,
  UserOutlined,
  EyeOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

export default function AdminDashboard() {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      
      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={1128}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Posts"
              value={93}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Banners"
              value={12}
              prefix={<PictureOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Stone Items"
              value={456}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Additional Stats */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Recent Activity" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Products Added Today</span>
                <span style={{ fontWeight: 'bold' }}>23</span>
              </div>
              <Progress percent={75} size="small" />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Posts Published</span>
                <span style={{ fontWeight: 'bold' }}>8</span>
              </div>
              <Progress percent={60} size="small" status="active" />
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Banners Updated</span>
                <span style={{ fontWeight: 'bold' }}>5</span>
              </div>
              <Progress percent={40} size="small" />
            </Space>
          </Card>
        </Col>
        
        <Col span={12}>
          <Card title="System Overview" size="small">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Total Users"
                  value={2847}
                  prefix={<UserOutlined />}
                  suffix="users"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Page Views"
                  value={125847}
                  prefix={<EyeOutlined />}
                  suffix="views"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Card title="Quick Actions" size="small">
        <Row gutter={16}>
          <Col span={6}>
            <Card size="small" hoverable style={{ textAlign: 'center' }}>
              <ShoppingOutlined style={{ fontSize: 24, color: '#1890ff' }} />
              <div style={{ marginTop: 8 }}>Add Product</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" hoverable style={{ textAlign: 'center' }}>
              <FileTextOutlined style={{ fontSize: 24, color: '#52c41a' }} />
              <div style={{ marginTop: 8 }}>Create Post</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" hoverable style={{ textAlign: 'center' }}>
              <PictureOutlined style={{ fontSize: 24, color: '#722ed1' }} />
              <div style={{ marginTop: 8 }}>Add Banner</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" hoverable style={{ textAlign: 'center' }}>
              <AppstoreOutlined style={{ fontSize: 24, color: '#eb2f96' }} />
              <div style={{ marginTop: 8 }}>Manage Stones</div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}