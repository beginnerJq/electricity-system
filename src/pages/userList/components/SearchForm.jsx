import React from 'react';
import { Form, Input, Button } from 'antd';

const SearchForm = props => {
  const {
    getUserList,
    form: { getFieldDecorator, validateFields },
  } = props;
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        getUserList({ pageNum: 1, ...values });
      }
    });
  };
  return (
    <Form layout='inline' onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <Form.Item label='搜索'>
        {getFieldDecorator('condition')(
          <Input placeholder='请输入用户名、邮箱...' size='large' />,
        )}
      </Form.Item>
      <Form.Item>
        <Button size='large' icon='search' type='primary' htmlType='submit' />
      </Form.Item>
    </Form>
  );
};

export default Form.create()(SearchForm);
