import React from 'react';
import { Form, Input, Icon, Button } from 'antd';

const UserComponent = Form.create()(props => {
  const { loading, userLogin } = props;
  const { getFieldDecorator } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        userLogin(values);
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入你的用户名' }],
        })(
          <Input
            size='large'
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='用户名'
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入你的密码' }],
        })(
          <Input
            size='large'
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
            type='password'
            placeholder='密码'
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          size='large'
          type='primary'
          htmlType='submit'
          block
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
});
export default UserComponent;
