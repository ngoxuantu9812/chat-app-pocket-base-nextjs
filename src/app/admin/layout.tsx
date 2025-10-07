'use client';

import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  SettingOutlined,
  PictureOutlined,
  AppstoreOutlined,
  UserOutlined,
  LogoutOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Dropdown, Space, Typography, Tag } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute, { PermissionWrapper, usePermissions } from '@/components/ProtectedRoute';
import ChangePasswordModal from '@/components/ChangePasswordModal';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

// Menu items with permission requirements
const getMenuItems = (hasPermission: (permission: string) => boolean) => [
  {
    key: '/admin',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  ...(hasPermission('products:read') ? [{
    key: '/admin/products',
    icon: <ShoppingOutlined />,
    label: 'Product Management',
  }] : []),
  ...(hasPermission('posts:read') ? [{
    key: '/admin/posts',
    icon: <FileTextOutlined />,
    label: 'Post Management',
  }] : []),
  ...(hasPermission('banners:read') ? [{
    key: '/admin/banners',
    icon: <PictureOutlined />,
    label: 'Banner Management',
  }] : []),
  ...(hasPermission('stones:read') ? [{
    key: '/admin/stones',
    icon: <AppstoreOutlined />,
    label: 'Stone Management',
  }] : []),
  ...(hasPermission('config:read') ? [{
    key: '/admin/config',
    icon: <SettingOutlined />,
    label: 'Config Management',
  }] : []),
];

const getUserMenuItems = (onLogout: () => void) => [
  {
    key: 'profile',
    label: 'Profile',
    icon: <UserOutlined />,
  },
  {
    key: 'change-password',
    label: 'Change Password',
    icon: <KeyOutlined />,
  },
  {
    type: 'divider' as const,
  },
  {
    key: 'logout',
    label: 'Logout',
    icon: <LogoutOutlined />,
    onClick: onLogout,
  },
];

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { hasPermission } = usePermissions();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key: string) => {
    router.push(key);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        // Handle profile navigation - could open a modal or navigate to profile page
        console.log('Navigate to profile');
        break;
      case 'change-password':
        setChangePasswordModalOpen(true);
        break;
      // logout is handled by the onClick in the menu item
    }
  };

  const menuItems = getMenuItems(hasPermission);
  const userMenuItems = getUserMenuItems(handleLogout);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{ 
          height: 32, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {collapsed ? 'A' : 'Admin Panel'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={pathname ? [pathname] : []}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 24
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleUserMenuClick,
            }}
            placement="bottomRight"
          >
            <Space style={{ cursor: 'pointer', padding: '0 8px' }}>
              <Avatar 
                size="small" 
                src={user?.avatar}
                style={{ backgroundColor: '#1890ff' }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.2' }}>
                  {user?.name || 'User'}
                </Text>
                <Tag 
                  color={user?.role === 'admin' ? 'gold' : 'blue'}
                  style={{ margin: 0, fontSize: '10px', lineHeight: '1', padding: '0 4px' }}
                >
                  {user?.role?.toUpperCase() || 'USER'}
                </Tag>
              </div>
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
      
      <ChangePasswordModal
        open={changePasswordModalOpen}
        onCancel={() => setChangePasswordModalOpen(false)}
      />
    </Layout>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </ProtectedRoute>
  );
}