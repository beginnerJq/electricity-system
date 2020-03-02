import React, { useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Button, message } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const ModifyUser = props => {
  const {
    isLoading,
    outerUserId,
    userInfo,
    getUserList,
    getUserEdit,
    setUserInfo,
    visible,
    setVisible,
    form: { getFieldDecorator, validateFields, setFieldsValue },
  } = props;
  // 提交修改
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        new Promise((resolve, reject) => {
          getUserEdit({ userId: outerUserId, ...values }, resolve, reject);
        })
          .then(() => {
            message.success('修改成功');
            setVisible(state => ({ ...state, modify: false }));
            getUserList({ pageNum: 1 });
          })
          .catch(() => {});
      }
    });
  };
  return (
    <Modal
      title='修改用户信息'
      visible={visible}
      footer={null}
      onCancel={() => {
        setUserInfo({}); // 置空
        setVisible(state => ({ ...state, modify: false }));
      }}
      destroyOnClose
    >
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label='密码'>
          {getFieldDecorator('password')(
            <Input placeholder='若不填写，则保持原密码' />,
          )}
        </Form.Item>
        <Form.Item label='邮箱'>
          {getFieldDecorator('email', {
            initialValue: userInfo.email,
            rules: [{ required: true, message: '请输入邮箱' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label='手机号'>
          {getFieldDecorator('phone', {
            initialValue: userInfo.phone,
            rules: [{ required: true, message: '请输入手机号' }],
          })(<Input />)}
        </Form.Item>
        <Row>
          <Col span={4} offset={10}>
            <Button type='primary' htmlType='submit' loading={isLoading}>
              修改
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Form.create()(ModifyUser);
