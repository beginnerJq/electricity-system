import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Table,
  Tabs,
  Skeleton,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Button,
  Modal,
  DatePicker,
  message,
} from 'antd';
import { moment } from 'utils/moment';
import { DetailsAction } from './index';
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/dataZoom');
require('echarts/lib/component/dataZoomSlider');

const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const baseInfoFields = {
  cmdId: '装置ID',
  type: '分类',
  name: '设备名称',
  model: '型号',
  version: '版本号',
  manufacturer: '生产厂家',
  productionDate: '生产日期',
  identifier: '出厂编号',
};
const workConditionFields = {
  temperature: '设备温度',
  voltage: '电池电压',
  timeDetail: '工况上传时间',
  isElectrify: '电池供电状态',
  createTime: '创建时间',
  electricity: '电流',
};
const CurveFormCompoent = Form.create()(props => {
  const {
    form: { getFieldDecorator, validateFields },
    getCurve,
  } = props;
  const { state } = useLocation();
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        let dateStart, dateEnd;
        const { time, ...rest } = values;
        if (Array.isArray(time) && time.length > 0) {
          [dateStart, dateEnd] = [
            time[0].format('YYYY-MM-DD'),
            time[1].format('YYYY-MM-DD'),
          ];
        }
        getCurve({ cmdId: state.cmdId, dateStart, dateEnd, ...rest });
      }
    });
  };
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Row type='flex' justify='space-between'>
        <Col span={6}>
          <Form.Item label='页数'>
            {getFieldDecorator('skip', {
              initialValue: 1,
              rules: [{ required: true, message: '页数为必填项！' }],
            })(<InputNumber min={1} size='large' precision={0} />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='时间范围'>
            {getFieldDecorator('time', {})(<RangePicker />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='类型'>
            {getFieldDecorator('type', {
              initialValue: 0,
            })(
              <Select size='large'>
                <Option value={0}>工频</Option>
                <Option value={1}>高频</Option>
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col span={2}>
          <Button htmlType='submit' type='primary' size='large'>
            绘制
          </Button>
        </Col>
      </Row>
    </Form>
  );
});
const CurveComponent = props => {
  const { curve, getCurve } = props;
  useEffect(() => {
    let xData = [],
      yData = [];
    (curve.data || '')
      .split('_')
      .map((v, i) => {
        if (v) {
          xData.push(i);
          yData.push(v);
        }
      })
      .filter(v => v);
    const myChart = echarts.init(document.getElementById('detailCurve'));
    const option = {
      tooltip: {
        trigger: 'axis',
        position: function(pt) {
          return [pt[0], '10%'];
        },
      },
      title: {
        left: 'left',
        text: '曲线折线图',
        subtext: `时间：${curve.timeDetail || ''}`,
      },
      toolbox: {
        feature: {
          dataZoom: {},
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 10,
        },
        {
          type: 'slider',
          show: true,
          yAxisIndex: [0],
          left: '3%',
          start: 0,
          end: 100,
          handleIcon:
            'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
        {
          start: 0,
          end: 10,
          handleIcon:
            'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          xAxisIndex: [0],
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
      ],
      series: [
        {
          name: '数值',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            color: 'rgb(255, 70, 131)',
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 158, 68)',
              },
              {
                offset: 1,
                color: 'rgb(255, 70, 131)',
              },
            ]),
          },
          data: yData,
        },
      ],
    };
    myChart.setOption(option);
    return () => {
      myChart.clear();
    };
  }, [curve.data, curve.timeDetail]);
  return (
    <>
      <CurveFormCompoent getCurve={getCurve} />
      <div id='detailCurve' style={{ height: 500 }}></div>
    </>
  );
};

const Details = props => {
  const {
    state: { isLoading, baseInfo, workCondition, curve, breakdownList },
    action: {
      getBaseInfo,
      getWorkCondition,
      getCurve,
      getBreakdownList,
      getBreakdownCheck,
    },
  } = props;
  const { state: locationState = {} } = useLocation();
  const { goBack } = useHistory();
  useEffect(() => {
    if (locationState && locationState.cmdId) {
      let { cmdId, defaultTabKey } = locationState;
      if (defaultTabKey) {
        getBreakdownList({ cmdId, pageNum: 1, pageSize: 10 });
      } else {
        getBaseInfo({ cmdId });
      }
    } else {
      goBack();
    }
  }, [getBaseInfo, getBreakdownList, goBack, locationState]);

  // 故障列表 columns
  const columns = [
    {
      title: '故障id',
      dataIndex: 'id',
    },
    {
      title: '故障信息',
      dataIndex: 'info',
    },
    {
      title: '故障时间',
      dataIndex: 'time',
      render(text) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '故障状态',
      dataIndex: 'status',
      render(text) {
        return text === 0 ? '未确认' : '已确认';
      },
    },
    {
      title: '操作',
      render(undefined, { id: breakdownId, status }) {
        const confirmed = status === 1;
        return (
          <a
            style={{
              cursor: confirmed ? 'not-allowed' : 'pointer',
            }}
            onClick={() => {
              if (confirmed) {
                message.error('状态已确认');
                return;
              }
              confirm({
                title: '故障确认',
                content: '是否确认故障?',
                onOk() {
                  return new Promise((resolve, reject) => {
                    getBreakdownCheck({ breakdownId }, resolve, reject);
                  })
                    .then(() => {
                      let { cmdId } = locationState;
                      getBreakdownList({ cmdId, pageNum: 1, pageSize: 10 });
                    })
                    .catch(err => console.log(err));
                },
                onCancel() {},
              });
            }}
          >
            故障确认
          </a>
        );
      },
    },
  ];

  return (
    <>
      <Button icon='rollback' onClick={() => goBack()}>
        返回
      </Button>
      <Tabs
        defaultActiveKey={
          locationState.defaultTabKey ? locationState.defaultTabKey : '0'
        }
        onChange={activeKey => {
          const callArr = [getBaseInfo, getWorkCondition];
          let { cmdId } = locationState;
          if (activeKey == 2) {
            getCurve({ cmdId, skip: 1, type: 0 });
          } else if (activeKey == 3) {
            getBreakdownList({ cmdId, pageNum: 1, pageSize: 10 });
          } else {
            callArr[activeKey]({ cmdId });
          }
        }}
      >
        <TabPane tab='基本信息' key='0'>
          <Skeleton active loading={isLoading}>
            <Form {...formItemLayout}>
              {Object.entries(baseInfo).map(v => {
                const [key, value] = v;
                return (
                  <Row key={key}>
                    <Col span={12}>
                      <Form.Item label={baseInfoFields[key]}>
                        <Input defaultValue={value} readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}
            </Form>
          </Skeleton>
        </TabPane>
        <TabPane tab='工作状态' key='1'>
          <Skeleton active loading={isLoading}>
            <Form {...formItemLayout}>
              {Object.entries(workCondition).map(v => {
                let [key, value] = v;
                if (key == 'isElectrify') {
                  value = value == 1 ? '已连接' : '未连接';
                }
                return (
                  <Row key={key}>
                    <Col span={12}>
                      <Form.Item label={workConditionFields[key]}>
                        <Input defaultValue={value} readOnly />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              })}
            </Form>
          </Skeleton>
        </TabPane>
        <TabPane tab='曲线图' key='2'>
          <CurveComponent curve={curve} getCurve={getCurve} />
        </TabPane>
        <TabPane tab='故障列表' key='3'>
          <Table
            rowKey='id'
            columns={columns}
            dataSource={breakdownList.list}
            pagination={{
              current: breakdownList.pageNum,
              onChange: page => {
                getBreakdownList({ cmdId, pageNum: page });
              },
            }}
            loading={isLoading}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

const mapStateToProps = state => {
  return { state: state.EquipDetailsState };
};
const mapDiapatchToProps = dispatch => {
  return {
    action: bindActionCreators(
      {
        getBaseInfo: DetailsAction.getBaseInfo,
        getWorkCondition: DetailsAction.getWorkCondition,
        getCurve: DetailsAction.getCurve,
        getBreakdownList: DetailsAction.getBreakdownList,
        getBreakdownCheck: DetailsAction.getBreakdownCheck,
      },
      dispatch,
    ),
  };
};
export default connect(mapStateToProps, mapDiapatchToProps)(Details);
