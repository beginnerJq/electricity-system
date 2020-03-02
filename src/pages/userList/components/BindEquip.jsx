import React, { useState, useEffect } from 'react';
import { Modal, Transfer, message } from 'antd';
import { cloneDeep } from 'lodash-es';

const BindEquip = props => {
  const {
    isLoading,
    outerUserId,
    userBind,
    getUserBindUpdate,
    visible,
    setVisible,
  } = props;
  const [dataSource, setDataSource] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  useEffect(() => {
    const { bind, notBind } = cloneDeep(userBind), // 深拷贝
      targetKeys = [];
    bind.map(({ cmdId }) => targetKeys.push(cmdId));
    setDataSource([...bind, ...notBind]);
    setTargetKeys(targetKeys);
  }, [userBind]);
  // 自定义渲染
  const renderItem = item => {
    const customLabel = (
      <span className='custom-item'>
        {item.cmdId} - {item.name}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.name, // for title and filter matching
    };
  };
  // 位置交换
  const handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, direction, moveKeys);
    setTargetKeys(targetKeys);
  };

  return (
    <Modal
      title='绑定设备'
      confirmLoading={isLoading}
      visible={visible}
      onCancel={() => {
        setVisible(state => ({ ...state, bind: false }));
      }}
      onOk={() => {
        new Promise((resolve, reject) => {
          getUserBindUpdate(
            { userId: outerUserId, cmdIdList: targetKeys },
            resolve,
            reject,
          );
        })
          .then(() => {
            message.success('绑定成功');
            setVisible(state => ({ ...state, bind: false }));
          })
          .catch(() => {});
      }}
      width={750}
      destroyOnClose
    >
      <Transfer
        style={{ marginLeft: 35 }}
        titles={['未绑定设备', '已绑定设备']}
        dataSource={dataSource}
        targetKeys={targetKeys}
        render={renderItem}
        onChange={handleChange}
        rowKey={record => record.cmdId}
        listStyle={{
          width: 300,
          height: 350,
        }}
        showSearch
      />
    </Modal>
  );
};

export default BindEquip;
