import React from 'react';
import { Form, Input, Button } from 'antd';

const SearchForm = props => {
  const {
    form: { getFieldDecorator },
  } = props;
  return (
    <Form layout='inline' style={{ marginBottom: 24 }}>
      <Form.Item label='搜索'>
        {getFieldDecorator('condition')(
          <Input placeholder='请输入用户名、邮箱...' size='large' />,
        )}
      </Form.Item>
      <Form.Item>
        <Button size='large' icon='search' type='primary' />
      </Form.Item>
    </Form>
  );
};

export default Form.create()(SearchForm);
