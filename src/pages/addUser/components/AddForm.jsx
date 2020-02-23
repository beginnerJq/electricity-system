import React, { useEffect } from 'react';
import { Form, Input, Select, Row, Col, Button, message } from 'antd';
import { getUserInfo } from 'utils/userInfo';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

const AddForm = props => {
  const {
    state: { isLoading, isSuccess },
    action: { getAddUser, addUserSuccess },
    form: { getFieldDecorator, validateFields, resetFields },
  } = props;
  useEffect(() => {
    if (isSuccess) {
      message.success('添加成功!');
      resetFields(); // 清空表单
      addUserSuccess(false);
    }
  }, [addUserSuccess, isSuccess, resetFields]);
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        getAddUser(values);
      }
    });
  };
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label='用户名'>
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: '请输入用户名' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label='密码'>
        {getFieldDecorator('passWord', {
          rules: [{ required: true, message: '请输入密码' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label='权限等级'>
        {getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择权限' }],
        })(
          <Select placeholder='--请选择--'>
            {getUserInfo('type') === 0 && <Option value={1}>管理员</Option>}
            <Option value={2}>普通用户</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item label='邮箱'>
        {getFieldDecorator('email', {
          rules: [{ required: true, message: '请输入邮箱' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label='手机号'>
        {getFieldDecorator('phone', {
          rules: [{ required: true, message: '请输入手机号' }],
        })(<Input />)}
      </Form.Item>
      <Row>
        <Col span={3} offset={5}>
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            添加
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(AddForm);
