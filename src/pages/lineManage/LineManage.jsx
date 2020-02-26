import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { LineManageAction } from './index';

const LineManage = props => {
  const {
    state: { lineList, isLoading },
    action: { getLineList },
  } = props;
  useEffect(() => {
    getLineList({ pageNum: 1 });
  }, [getLineList]);
  return <div>线路管理</div>;
};

const mapStateToProps = state => {
  return { state: state.LineManageState };
};
const mapDispatchToProps = dispatch => {
  return { action: bindActionCreators(LineManageAction, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LineManage);
