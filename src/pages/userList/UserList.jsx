import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Tooltip, Icon } from 'antd';
import { userType } from 'utils/userType';
import { UserListAction } from './index';
import SearchForm from './components/SearchForm';
import ModifyUser from './components/ModifyUser';
import BindEquip from './components/BindEquip';
import DeleteUser from './components/DeleteUser';
import './UserList.pcss';

let outerUserId = '';
const UserList = props => {
  const {
    state: { userList, fields, userInfo, userBind, isLoading },
    action: {
      getUserList,
      getUserInfo,
      getUserEdit,
      getUserBind,
      getUserBindUpdate,
      getUserDelete,
      setUserInfo,
    },
  } = props;
  const [visible, setVisible] = useState({
    modify: false,
    bind: false,
    delete: false,
  });
  useEffect(() => {
    getUserList({ pataNum: 1 }); // 获取列表
  }, [getUserList]);
  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '权限',
      dataIndex: 'type',
      render(text) {
        return userType[text];
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '操作',
      render(text, { userId, type }) {
        return (
          <div styleName='operation'>
            <Tooltip title='编辑'>
              <span
                onClick={() => {
                  getUserInfo({ userId }); // 获取用户信息
                  setVisible(state => ({ ...state, modify: true }));
                }}
              >
                <Icon type='edit' theme='filled' />
              </span>
            </Tooltip>
            <Tooltip title='绑定'>
              <span
                onClick={() => {
                  if (type < 2) {
                    return;
                  }
                  getUserBind({ userId }); // 获取设备
                  setVisible(state => ({ ...state, bind: true }));
                }}
              >
                <Icon
                  type='setting'
                  theme='filled'
                  style={{
                    opacity: type < 2 ? 0.5 : 1,
                    cursor: type < 2 ? 'not-allowed' : 'pointer',
                  }}
                />
              </span>
            </Tooltip>
            <Tooltip title='删除'>
              <span
                onClick={() => {
                  outerUserId = userId;
                  setVisible(state => ({ ...state, delete: true }));
                }}
              >
                <Icon type='delete' theme='filled' />
              </span>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <SearchForm getUserList={getUserList} />
      <Table
        dataSource={userList.list}
        columns={columns}
        rowKey='userId'
        loading={isLoading}
        pagination={{
          current: userList.pageNum,
          total: userList.count,
        }}
        onChange={pagination => {
          const { current: pageNum } = pagination;
          getUserList({ pageNum, ...fields });
        }}
      />
      {/* 修改用户弹窗 */}
      <ModifyUser
        isLoading={isLoading}
        userInfo={userInfo}
        getUserEdit={getUserEdit}
        setUserInfo={setUserInfo}
        visible={visible.modify}
        setVisible={setVisible}
      />
      {/* 用户绑定设备 */}
      <BindEquip
        isLoading={isLoading}
        userBind={userBind}
        getUserBindUpdate={getUserBindUpdate}
        visible={visible.bind}
        setVisible={setVisible}
      />
      {/* 删除用户 */}
      <DeleteUser
        isLoading={isLoading}
        outerUserId={outerUserId}
        getUserDelete={getUserDelete}
        visible={visible.delete}
        setVisible={setVisible}
      />
    </>
  );
};

const mapStateToProps = state => {
  return { state: state.UserListState };
};
const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(
      {
        getUserList: UserListAction.getUserList,
        getUserInfo: UserListAction.getUserInfo,
        getUserEdit: UserListAction.getUserEdit,
        getUserBind: UserListAction.getUserBind,
        getUserBindUpdate: UserListAction.getUserBindUpdate,
        getUserDelete: UserListAction.getUserDelete,
        setUserInfo: UserListAction.setUserInfo,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
