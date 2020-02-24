import React from 'react';
import { Modal, Icon } from 'antd';

const DeleteUser = props => {
  const { isLoading, outerUserId, visible, setVisible, getUserDelete } = props;
  return (
    <Modal
      title='删除用户'
      confirmLoading={isLoading}
      visible={visible}
      onCancel={() => {
        setVisible(state => ({ ...state, delete: false }));
      }}
      onOk={() => {
        new Promise((resolve, reject) => {
          getUserDelete({ userId: outerUserId }, resolve, reject);
        })
          .then(() => message.success('删除成功'))
          .catch(e => {
            console.log(e);
          });
      }}
      destroyOnClose
    >
      <div style={{ fontSize: 16 }}>
        <Icon
          type='frown'
          theme='twoTone'
          style={{ fontSize: 18, marginRight: 5 }}
        />
        <strong>确认删除?</strong>
      </div>
    </Modal>
  );
};

export default DeleteUser;
