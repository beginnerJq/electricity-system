import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AddEquipAction } from './index';
import AddForm from './components/AddForm';

const AddEquip = props => {
  const { state, action } = props;
  return <AddForm state={state} action={action} />;
};

const mapStateToProp = state => {
  return { state: state.AddEquipState };
};
const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(
      {
        getAddEquip: AddEquipAction.getAddEquip,
        setIsSuccess: AddEquipAction.setIsSuccess,
        getEquipmentType: AddEquipAction.getEquipmentType,
        getFindForUpdate: AddEquipAction.getFindForUpdate,
        getEquipmentUpdate: AddEquipAction.getEquipmentUpdate,
        setFindForUpdate: AddEquipAction.setFindForUpdate,
      },
      dispatch,
    ),
  };
};
export default connect(mapStateToProp, mapDispatchToProps)(AddEquip);
