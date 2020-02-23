import React from 'react';
import { Form, DatePicker, Button, Input, Select, Row, Col } from 'antd';

const { RangePicker } = DatePicker;
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

const SearchForm = Form.create()(props => {
  const {
    form: { getFieldDecorator, validateFields },
    alarmType,
    formFields,
    getAlarmList,
  } = props;
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, vals) => {
      if (!err) {
        let time;
        if (Array.isArray(vals.time)) {
          time = [
            vals.time[0].format('YYYY-MM-DD'),
            vals.time[1].format('YYYY-MM-DD'),
          ];
        }
        getAlarmList({ ...vals, time });
      }
    });
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Row>
        <Col span={8}>
          <Form.Item label='时间范围'>
            {getFieldDecorator('time', {
              initialValue: formFields.time,
            })(<RangePicker />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='设备ID'>
            {getFieldDecorator('cmdId', {
              initialValue: formFields.cmdId,
            })(<Input />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='排序方式'>
            {getFieldDecorator('orderBy', {
              initialValue: formFields.orderBy,
            })(
              <Select>
                <Option value={0}>降序</Option>
                <Option value={1}>升序</Option>
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label='报表类型'>
            {getFieldDecorator('type', {
              initialValue: formFields.type,
            })(
              <Select>
                <Option value=''>不限类型</Option>
                {alarmType.map(v => (
                  <Option key={v.id} value={v.id}>
                    {v.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col span={8} push={2}>
          <Button type='primary' size='large' htmlType='submit'>
            查询
          </Button>
        </Col>
      </Row>
    </Form>
  );
});

export default SearchForm;
