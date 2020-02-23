import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { history } from 'utils/history';
import Routes, { allRoutesConfig } from '../routes';
import './Layout.pcss';

const { Header, Sider, Content } = Layout;

const LayoutComponent = props => {
  return (
    <Layout style={{ minHeight: '100vh' }} styleName='layout'>
      <Sider collapsible>
        <h1 styleName='title'>输电线路分布式故障诊断系统</h1>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[history.location.pathname]}
          onSelect={params => {
            history.push(params.key);
          }}
        >
          {allRoutesConfig.map(v => {
            if (v.noMenu) {
              return;
            }
            return (
              <Menu.Item key={v.path}>
                <Icon type={v.icon} />
                <span>{v.name}</span>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}></Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
          }}
        >
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
