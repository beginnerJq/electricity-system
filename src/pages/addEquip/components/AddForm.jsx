import React, { useState, useEffect, useCallback } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Select,
  Button,
  message,
} from 'antd';
import './AddForm.less';

const { Option } = Select;
const colSpan = 16;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
let map,
  marker,
  districtSearch,
  polygons = [];
let inputCountyValue;

const AddForm = Form.create({})(props => {
  const {
    state: { isLoading, isSuccess },
    action: { getAddEquip, setIsSuccess },
    form: {
      getFieldDecorator,
      setFieldsValue,
      validateFields,
      getFieldValue,
      resetFields,
    },
  } = props;
  const [selectRegion, setSelectRegion] = useState({
    province: [],
    city: [],
    district: [],
  });
  useEffect(() => {
    if (isSuccess) {
      message.success('提交成功!');
      resetFields();
      setIsSuccess(false);
    }
  }, [isSuccess, setIsSuccess, resetFields]);
  useEffect(() => {
    map = new AMap.Map('AddEquipMapContainer', {
      resizeEnable: true,
      center: [116.30946, 39.937629],
      zoom: 3,
    });
    map.on('click', e => {
      message.error('请选择省市之后,在标记区域内选择!');
    });
    AMap.plugin('AMap.DistrictSearch', () => {
      districtSearch = new AMap.DistrictSearch({
        // 关键字对应的行政区级别，country表示国家
        level: 'country',
        //  显示下级行政区级数，1表示返回下一级行政区
        subdistrict: 1,
      });
      // 搜索所有省/直辖市信息
      districtSearch.search('中国', (status, result) => {
        if (status == 'complete') {
          memoizedGetData(result.districtList[0]);
        }
      });
    });
  }, [memoizedGetData]);
  const memoizedGetData = useCallback(getData, []);
  // 提交按钮
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((errors, values) => {
      if (!errors) {
        let productionDate = values.productionDate.format('YYYY-MM-DD');
        getAddEquip({ ...values, productionDate });
      }
    });
  };
  // 获取数据下一级数据
  function getData(data, level) {
    var bounds = data.boundaries;
    if (bounds) {
      for (var i = 0, l = bounds.length; i < l; i++) {
        var polygon = new AMap.Polygon({
          map: map,
          strokeWeight: 1,
          strokeColor: '#0091ea',
          fillColor: '#80d8ff',
          fillOpacity: 0.2,
          path: bounds[i],
        });
        polygon.on('click', ({ lnglat: { lng, lat } }) => {
          if (!getFieldValue('city')) {
            message.error('请选择地级市');
            return;
          }
          if (marker) {
            map.remove(marker);
          }
          marker = new AMap.Marker({
            position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          });
          // 添加标记点
          map.add(marker);
          // 设置经纬度
          setFieldsValue({ longitude: lng, latitude: lat });
          // 获取地址描述
          AMap.plugin('AMap.Geocoder', function() {
            var geocoder = new AMap.Geocoder({});
            geocoder.getAddress([lng, lat], function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                setFieldsValue({
                  locationDetail: result.regeocode.formattedAddress,
                });
              }
            });
          });
        });
        polygons.push(polygon);
      }
      map.setFitView(); //地图自适应
    }

    //清空下一级别的下拉列表
    if (level === 'province') {
      setSelectRegion(state => ({
        ...state,
        city: [],
        district: [],
      }));
      setFieldsValue({ city: undefined, county: undefined });
    } else if (level === 'city') {
      setSelectRegion(state => ({
        ...state,
        district: [],
      }));
      setFieldsValue({ county: undefined });
    }

    var subList = data.districtList;
    if (subList) {
      //var contentSub = new Option('--请选择--');
      var curlevel = subList[0].level;
      setSelectRegion(state => ({ ...state, [curlevel]: subList }));
    }
  }
  function search(value, { props: { level, adcode } }) {
    // 更新外部值
    inputCountyValue = value;
    //清除地图上所有覆盖物
    for (var i = 0, l = polygons.length; i < l; i++) {
      polygons[i].setMap(null);
    }
    districtSearch.setLevel(level); //行政区级别
    districtSearch.setExtensions('all');
    //行政区查询
    //按照adcode进行查询可以保证数据返回的唯一性
    districtSearch.search(adcode, function(status, result) {
      if (status === 'complete') {
        memoizedGetData(result.districtList[0], level);
      }
    });
  }
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='设备ID'>
            {getFieldDecorator('cmdId', {
              rules: [{ required: true, message: '请输入设备ID' }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='类型ID'>
            {getFieldDecorator('typeId', {
              rules: [{ required: true, message: '请输入类型ID' }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='设备名称'>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入设备名称' }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='型号'>
            {getFieldDecorator('model', {
              rules: [{ required: true, message: '请输入型号' }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='版本号'>
            {getFieldDecorator('version', {
              rules: [{ required: true, message: '请输入版本号' }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='生产厂家'>
            {getFieldDecorator('manufacturer', {
              rules: [{ required: true, message: '请输入生产厂家' }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='生产日期'>
            {getFieldDecorator('productionDate', {
              rules: [{ required: true, message: '请选择生产日期' }],
            })(<DatePicker />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='出厂编号'>
            {getFieldDecorator('identifier', {
              rules: [{ required: true, message: '请输入出厂编号' }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={20}>
          <div id='AddEquipMapContainer'>
            <div className='regionSelect'>
              <h6>设备所在区域选择</h6>
              <Form.Item label='省市区'>
                {getFieldDecorator('province', {
                  rules: [{ required: true, message: '请选择省份' }],
                })(
                  <Select onChange={search} placeholder='--请选择--'>
                    {selectRegion.province.map(v => {
                      const { name, level, adcode } = v;
                      return (
                        <Option
                          key={name}
                          value={name}
                          level={level}
                          adcode={adcode}
                        >
                          {name}
                        </Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label='地级市'>
                {getFieldDecorator('city', {
                  rules: [{ required: true, message: '请选择所在市' }],
                })(
                  <Select onChange={search} placeholder='--请选择--'>
                    {selectRegion.city.map(v => {
                      const { name, level, adcode } = v;
                      return (
                        <Option
                          key={name}
                          value={name}
                          level={level}
                          adcode={adcode}
                        >
                          {name}
                        </Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
              <Form.Item label='区县'>
                {getFieldDecorator('county', {
                  rules: [{ required: true, message: '请选择或输入所在区县' }],
                })(
                  <Select
                    onChange={search}
                    placeholder='--请选择或输入--'
                    showSearch
                    onSearch={v => {
                      if (v) {
                        inputCountyValue = v;
                      }
                    }}
                    onBlur={() => {
                      setFieldsValue({ county: inputCountyValue });
                    }}
                  >
                    {selectRegion.district.map(v => {
                      const { name, level, adcode } = v;
                      return (
                        <Option
                          key={name}
                          value={name}
                          level={level}
                          adcode={adcode}
                        >
                          {name}
                        </Option>
                      );
                    })}
                  </Select>,
                )}
              </Form.Item>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='经度'>
            {getFieldDecorator('longitude', {
              rules: [{ required: true, message: '点击地图获取经度' }],
            })(<Input placeholder='点击上方地图区域获取' readOnly />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='纬度'>
            {getFieldDecorator('latitude', {
              rules: [{ required: true, message: '点击地图获取纬度' }],
            })(<Input placeholder='点击上方地图区域获取' readOnly />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='详细地址'>
            {getFieldDecorator('locationDetail', {
              rules: [{ required: true, message: '点击地图获取详细地址' }],
            })(<Input placeholder='点击上方地图区域获取' />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='所在线'>
            {getFieldDecorator('line', {
              rules: [{ required: true, message: '请输入所在线' }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan}>
          <Form.Item label='所在杆'>
            {getFieldDecorator('pole', {
              rules: [{ required: true, message: '请输入所在杆' }],
            })(<Input />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4} offset={8}>
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            loading={isLoading}
          >
            提交
          </Button>
        </Col>
      </Row>
    </Form>
  );
});

export default AddForm;
