import React, { useEffect } from 'react';
import { Form, Select, Input, Row, Col, Button } from 'antd';
import { getUserInfo } from 'utils/userInfo';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const SearchForm = props => {
  const {
    form: { validateFields, getFieldDecorator },
    searchCondition,
    formLoading,
    getSearchCondition,
    getEquipmentList,
  } = props;
  useEffect(() => {
    getSearchCondition();
  }, [getSearchCondition]);
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        getEquipmentList({ pageNum: 1, ...values });
      }
    });
  };
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Row>
        <Col span={4}>
          <Form.Item label='省'>
            {getFieldDecorator(
              'province',
              {},
            )(
              <Select loading={formLoading} allowClear>
                {searchCondition.province.map((v, i) => (
                  <Option key={i} value={v}>
                    {v}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label='市'>
            {getFieldDecorator(
              'city',
              {},
            )(
              <Select loading={formLoading} allowClear>
                {searchCondition.city.map((v, i) => (
                  <Option key={i} value={v}>
                    {v}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label='区'>
            {getFieldDecorator(
              'county',
              {},
            )(
              <Select loading={formLoading} allowClear>
                {searchCondition.county.map((v, i) => (
                  <Option key={i} value={v}>
                    {v}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label='线路'>
            {getFieldDecorator(
              'line',
              {},
            )(
              <Select loading={formLoading} allowClear>
                {searchCondition.line.map((v, i) => (
                  <Option key={i} value={v}>
                    {v}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label='杆点'>
            {getFieldDecorator(
              'pole',
              {},
            )(
              <Select loading={formLoading} allowClear>
                {searchCondition.pole.map((v, i) => (
                  <Option key={i} value={v}>
                    {v}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label='分类'>
            {getFieldDecorator(
              'typeId',
              {},
            )(
              <Select loading={formLoading} allowClear>
                {searchCondition.type.map(v => (
                  <Option key={v.typeId} value={v.typeId}>
                    {v.typeName}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row type='flex' justify='space-between'>
        {getUserInfo('type') < 2 ? (
          <Col span={4}>
            <Form.Item label='所属用户'>
              {getFieldDecorator(
                'userId',
                {},
              )(
                <Select loading={formLoading} allowClear>
                  {searchCondition.user.map(v => (
                    <Option key={v.uid} value={v.uid}>
                      {v.userName}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        ) : null}
        <Col span={12}>
          <Form.Item label='查询条件'>
            {getFieldDecorator(
              'condition',
              {},
            )(<Input placeholder='设备名称，地址，所属用户' />)}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button size='large' type='primary' htmlType='submit'>
            查询
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create({
  onFieldsChange(props, changedFields, allFields) {
    if (!changedFields.condition) {
      let fileds = {};
      for (let [k, v] of Object.entries(allFields)) {
        fileds[k] = v.value;
      }
      props.getSearchCondition(fileds);
    }
  },
})(SearchForm);
