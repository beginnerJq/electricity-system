import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddForm from './components/AddForm';
import { AddUserAction } from './index';

const AddUser = props => {
  const { state, action } = props;
  return <AddForm state={state} action={action} />;
};

const mapStateToProps = state => {
  return { state: state.AddUserState };
};
const mapDispatchToProps = dispatch => {
  return {
    action: bindActionCreators(
      {
        getAddUser: AddUserAction.getAddUser,
        addUserSuccess: AddUserAction.addUserSuccess,
      },
      dispatch,
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
