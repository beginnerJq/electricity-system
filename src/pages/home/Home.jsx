import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Button, Input, Table, Radio } from 'antd';
import { HomeAction } from './index';
import './Home.css';

const { Search } = Input;

let map;
const columns = [
  {
    title: '设备名称',
    dataIndex: 'name',
  },
  {
    title: '设备ID',
    dataIndex: 'cmdId',
  },
];

const Home = props => {
  const { state, action } = props;
  const { equipmentData, equipmentListData, tableIsLoading } = state;
  const { getEquipment, getEquipmentList } = action;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useEffect(() => {
    if (typeof AMap != 'undefined') {
      map = new AMap.Map('HomeMapContainer', {
        zoom: 11, //级别
        viewMode: '2D',
      });
      map.on('complete', function() {
        // 地图图块加载完成后触发
        getEquipment(); // 获取坐标信息
      });
    }
    return () => map.destroy();
  }, [getEquipment]);
  useEffect(() => {
    if (map && equipmentData.equipment && equipmentData.line) {
      // 添加点
      const markerArr = equipmentData.equipment.map(v => {
        return new AMap.Marker({
          position: [v.longitude, v.latitude],
        });
      });
      map.add(markerArr);
      // 添加线条
      const lineArr = equipmentData.line.map(v => {
        const { lineData } = v;
        const lineDataStr = lineData.split(',');
        const path = lineDataStr
          .map(v => {
            for (let item of equipmentData.equipment) {
              if (item.cmdId == v) {
                return [item.longitude, item.latitude];
              }
            }
          })
          .filter(v => !!v);
        return new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 3,
          strokeColor: '#3366FF',
          strokeOpacity: 1,
          strokeWeight: 6,
          // 折线样式还支持 'dashed'
          strokeStyle: 'solid',
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50,
        });
      });
      map.add(lineArr);
    }
  }, [equipmentData]);

  // 移动视图至中心
  const setMapToCenter = cmdId => {
    const point = equipmentData.equipment.find(v => v.cmdId == cmdId);
    map.setZoomAndCenter(13, [point.longitude, point.latitude]);
  };
  return (
    <>
      <div id='HomeMapContainer'>
        <Button
          type='primary'
          style={{ position: 'absolute', right: 0, zIndex: 1 }}
          onClick={() => setDrawerVisible(true)}
        >
          显示列表数据
        </Button>
        <Drawer
          title='设备列表'
          placement='right'
          closable={true}
          mask={false}
          width={400}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
          <Search
            placeholder='搜索...'
            enterButton='搜索'
            size='large'
            onSearch={value =>
              getEquipmentList({
                pageSize: 10,
                pageNum: equipmentListData.pageNum,
                condition: value,
              })
            }
            style={{ marginBottom: 10 }}
          />
          <Table
            columns={columns}
            dataSource={equipmentListData.list}
            rowKey={record => record.cmdId}
            loading={tableIsLoading}
            scroll={{ y: true }}
            rowSelection={{
              type: 'radio',
              selectedRowKeys,
              onChange: selectedRowKeys => {
                setMapToCenter(selectedRowKeys[0]);
                setSelectedRowKeys(selectedRowKeys);
              },
            }}
            onRow={record => ({
              onClick: () => {
                const { cmdId } = record;
                setMapToCenter(cmdId);
                setSelectedRowKeys([cmdId]);
              },
            })}
            pagination={{
              total: equipmentListData.count,
              current: equipmentListData.pageNum,
            }}
            onChange={pagination => {
              const { current: pageNum } = pagination;
              getEquipmentList({ pageSize: 10, pageNum });
            }}
          />
        </Drawer>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return { state: state.HomeState };
};
const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(
      {
        getEquipment: HomeAction.getEquipment,
        getEquipmentList: HomeAction.getEquipmentList,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
