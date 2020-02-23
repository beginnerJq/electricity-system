import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Button } from 'antd';
import { exportFile } from 'utils/xlsx';
import { WarningAction } from './index';
import SearchForm from './components/SearchForm';

const columns = [
  {
    title: '设备ID',
    dataIndex: 'cmdId',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '预警类型',
    dataIndex: 'alarmType',
  },
  {
    title: '警情信息',
    dataIndex: 'info',
  },
  {
    title: '统计时间',
    dataIndex: 'publishTime',
  },
];
const Warning = props => {
  const { state, action } = props;
  const { alarmType, alarmList, formFields, tableIsLoading } = state;
  const { getAlarmType, getAlarmList } = action;
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    getAlarmType(); //获取类型,
  }, [getAlarmType]);
  return (
    <div>
      <SearchForm
        alarmType={alarmType}
        formFields={formFields}
        getAlarmList={getAlarmList}
      />
      <Button
        size='large'
        type='primary'
        onClick={() => exportFile(selectedRows, columns, '预警信息报表')}
      >
        导出
      </Button>
      <Table
        style={{ marginTop: 15 }}
        columns={columns}
        dataSource={alarmList.list}
        loading={tableIsLoading}
        rowKey={record => record.cmdId}
        pagination={{ current: alarmList.pageNum, total: alarmList.count }}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        onChange={pagination => {
          const { current: pageNum } = pagination;
          getAlarmList({ pageNum, ...formFields });
        }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return { state: state.WarningState };
};
const maoDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(
      {
        getAlarmType: WarningAction.getAlarmType,
        getAlarmList: WarningAction.getAlarmList,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, maoDispatchToProps)(Warning);
