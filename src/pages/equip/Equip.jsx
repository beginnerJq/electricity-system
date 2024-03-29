import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Tooltip, Icon, Button, Modal, message } from 'antd';
import { exportFile } from 'utils/xlsx';
import { history } from 'utils/history';
import { equipmentStatus, equipmentStatusColor } from 'utils/backFields';
import { EquipAction } from './index';
import SearchForm from './components/SearchForm';
import styles from './Equip.pcss';

const { confirm } = Modal;

const Equip = props => {
  const {
    state: {
      searchCondition,
      equipmentList,
      formFields,
      formLoading,
      tableLoading,
    },
    action: { getSearchCondition, getEquipmentList, getEquipmentDelete },
  } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    getEquipmentList({ pageNum: 1 });
  }, [getEquipmentList]);
  const columns = [
    {
      title: '设备ID',
      dataIndex: 'cmdId',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
    },
    {
      title: '分类',
      dataIndex: 'type',
    },
    {
      title: '归属',
      dataIndex: 'belong',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '设备状态',
      dataIndex: 'status',
      render(text) {
        return (
          <span style={{ color: equipmentStatusColor[text] }}>
            {equipmentStatus[text]}
          </span>
        );
      },
    },
    {
      title: '操作',
      render(text, record) {
        const { cmdId } = record;
        return (
          <div styleName='styles.operation'>
            <Tooltip title='详情'>
              <span onClick={() => history.push('/equip/details', { cmdId })}>
                <Icon type='eye' theme='filled' />
              </span>
            </Tooltip>
            <Tooltip title='编辑'>
              <span onClick={() => history.push('/addEquip', { cmdId })}>
                <Icon type='edit' theme='filled' />
              </span>
            </Tooltip>
            <Tooltip title='删除'>
              <span
                onClick={() => {
                  confirm({
                    title: '删除设备',
                    content: '你确定要删除这个设备？',
                    onOk() {
                      return new Promise((resolve, reject) => {
                        getEquipmentDelete({ cmdId }, resolve, reject);
                      })
                        .then(() => {
                          message.success('删除成功');
                          getEquipmentList({ pageNum: 1 });
                        })
                        .catch(() => console.log('Oops errors!'));
                    },
                    onCancel() {},
                  });
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
      <SearchForm
        searchCondition={searchCondition}
        formLoading={formLoading}
        getSearchCondition={getSearchCondition}
        getEquipmentList={getEquipmentList}
      />
      <Button
        size='large'
        type='primary'
        onClick={() => exportFile(selectedRows, columns, '设备目录')}
      >
        导出
      </Button>
      <Table
        style={{ marginTop: 15 }}
        columns={columns}
        dataSource={equipmentList.list}
        rowKey='cmdId'
        loading={tableLoading}
        pagination={{
          current: equipmentList.pageNum,
          total: equipmentList.count,
        }}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        onChange={pagination => {
          const { current: pageNum } = pagination;
          getEquipmentList({ pageNum, ...formFields });
        }}
      />
    </>
  );
};
const mapStateToProps = state => {
  return { state: state.EquipState };
};
const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(
      {
        getSearchCondition: EquipAction.getSearchCondition,
        getEquipmentList: EquipAction.getEquipmentList,
        getEquipmentDelete: EquipAction.getEquipmentDelete,
      },
      dispatch,
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Equip);
