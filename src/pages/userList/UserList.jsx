import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Tooltip, Icon } from 'antd';
import { userType } from 'utils/userType';
import { UserListAction } from './index';
import SearchForm from './components/SearchForm';
import './UserList.pcss';

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
    render(text, { type }) {
      return (
        <div styleName='operation'>
          <Tooltip title='编辑'>
            <span>
              <Icon type='edit' theme='filled' />
            </span>
          </Tooltip>
          <Tooltip title='绑定'>
            <span>
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
            <span>
              <Icon type='delete' theme='filled' />
            </span>
          </Tooltip>
        </div>
      );
    },
  },
];
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
    },
  } = props;
  useEffect(() => {
    getUserList({ pataNum: 1 }); // 获取列表
  }, [getUserList]);
  return (
    <>
      <SearchForm getUserList={getUserList} />
      <Table
        dataSource={userList.list}
        columns={columns}
        rowKey='userId'
        loading={isLoading}
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
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
