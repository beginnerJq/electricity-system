import React from 'react';
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { history } from 'utils/history';
import { getUserInfo, setUserInfo } from 'utils/userInfo';
import { isLogin } from 'utils/globalName';
import Routes, { allRoutesConfig } from '../routes';
import icon from '../static/img/icon.png';
import './Layout.pcss';

const { Header, Sider, Content } = Layout;

const menu = (
  <Menu
    onClick={({ key }) => {
      if (key == 1) {
        localStorage.removeItem(isLogin);
        setUserInfo(); // 删除用户信息
        history.push('/login'); // 跳转登录页
      }
    }}
  >
    <Menu.Item key={1}>
      <span>退出</span>
    </Menu.Item>
  </Menu>
);

const LayoutComponent = props => {
  return (
    <Layout style={{ minHeight: '100vh' }} styleName='layout'>
      <Sider collapsible>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[history.location.pathname]}
          onSelect={params => {
            history.push(params.key);
          }}
        >
          {allRoutesConfig.map(v => {
            const isAuthrized = v.authorized.includes(getUserInfo('type'));
            if (v.noMenu || !isAuthrized) {
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
        <Header
          style={{
            background: '#f5f5f5',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h1 styleName='title'>
            <img src={icon} alt='顿恒科技' width='40' height='40' />
            <span>输电线路分布式故障诊断系统</span>
          </h1>
          <Dropdown overlay={menu}>
            <div styleName='avatar-wrap'>
              <span>
                <Avatar
                  style={{ backgroundColor: '#87d068' }}
                  icon='user'
                  size='large'
                />
              </span>
              <span>
                你好，{getUserInfo('userName')} <Icon type='down' />
              </span>
            </div>
          </Dropdown>
        </Header>
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
