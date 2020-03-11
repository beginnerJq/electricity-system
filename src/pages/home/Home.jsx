import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Drawer, Button, Input, Table } from 'antd';
import { equipmentStatus } from 'utils/backFields';
import { HomeAction } from './index';
import './Home.css';

const { Search } = Input;

let map;
let infoWindow = new AMap.InfoWindow({
  isCustom: false, //使用自定义窗体
  content: '<div id="equipmentBaseInfo"></div>',
  offset: new AMap.Pixel(0, -32),
});

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
  const {
    equipmentData,
    equipmentListData,
    tableIsLoading,
    equipmentBaseInfo,
  } = state;
  const { getEquipment, getEquipmentList, getEquipmentBaseInfo } = action;
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
    infoWindow.setContent(
      `<div id="equipmentBaseInfo">
       <p><b>设备ID:</b><span>${equipmentBaseInfo.cmdId}</span></p>
       <p><b>设备名称:</b><span>${equipmentBaseInfo.name}</span></p>
       <p><b>归属:</b><span>${equipmentBaseInfo.userName}</span></p>
       <p><b>地址:</b><span>${equipmentBaseInfo.address}</span></p>
       <p><b>设备状态:</b><span>${
         equipmentStatus[equipmentBaseInfo.status]
       }</span></p>
      </div>`,
    );
  }, [equipmentBaseInfo]);
  useEffect(() => {
    if (map && equipmentData.equipment && equipmentData.line) {
      // 添加点
      const markerArr = equipmentData.equipment.map(v => {
        const marker = new AMap.Marker({
          icon:
            v.status === 0
              ? 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
              : 'http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
          position: [v.longitude, v.latitude],
          offset: new AMap.Pixel(-13, -30),
        });
        marker.on('click', () => {
          const { cmdId } = v;
          infoWindow.setContent('<div id="equipmentBaseInfo">加载中...</div>');
          getEquipmentBaseInfo({ cmdId });
          infoWindow.open(map, marker.getPosition());
        });
        return marker;
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
  }, [equipmentData, getEquipmentBaseInfo]);

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
        getEquipmentBaseInfo: HomeAction.getEquipmentBaseInfo,
      },
      dispatch,
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
