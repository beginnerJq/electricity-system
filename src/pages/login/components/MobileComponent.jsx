import React, { useState, useEffect } from 'react';
import { Form, Input, Icon, Button, Row, Col } from 'antd';

let s;
const MobileComponent = Form.create()(props => {
  const { loading, getCaptcha, captchaLogin } = props;
  const { getFieldDecorator, validateFields } = props.form;
  const [captchaStatus, setCaptchaStatus] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [countDown, setCountDown] = useState('获取验证码');
  useEffect(() => {
    console.log(countDown);
    if (countDown <= 0) {
      clearTimeout(s);
      setCountDown('获取验证码');
      setCaptchaStatus(false);
    }
    return () => clearTimeout(s);
  }, [countDown]);
  // 获取验证码
  const getCaptchaClick = () => {
    setCaptchaLoading(true);
    validateFields(['phoneNumber'], (err, values) => {
      if (!err) {
        new Promise((resolve, reject) => {
          getCaptcha(values, resolve, reject);
        })
          .then(() => {
            setCountDown(60);
            setCaptchaStatus(true);
            const func = () => {
              s = setTimeout(func, 1000);
              setCountDown(prevCount => prevCount - 1);
            };
            func();
          })
          .finally(() => setCaptchaLoading(false));
      } else {
        setCaptchaLoading(false);
      }
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        captchaLogin(values);
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator('phoneNumber', {
          rules: [
            {
              required: true,
              pattern: /^1[3456789]\d{9}$/,
              message: '请输入正确的手机号',
            },
          ],
        })(
          <Input
            size='large'
            prefix={<Icon type='mobile' style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='手机号'
          />,
        )}
      </Form.Item>
      <Row type='flex'>
        <Col span={12}>
          <Form.Item>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入验证码' }],
            })(
              <Input
                prefix={
                  <Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                size='large'
                placeholder='验证码'
              />,
            )}
          </Form.Item>
        </Col>
        <Col span={10} push={2}>
          <Button
            size='large'
            block
            loading={captchaLoading}
            disabled={captchaStatus}
            onClick={getCaptchaClick}
          >
            {countDown}
          </Button>
        </Col>
      </Row>
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

export default MobileComponent;
