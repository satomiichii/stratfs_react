import React from 'react';

export const NewDebtForm = (props) => {
  console.log(props);
  return (
    <form onSubmit={props.handleSubmit}>
      <input type="text" name="creditorName" onChange={props.handleUpdate} />
      <input type="text" name="firstName" onChange={props.handleUpdate} />
      <input type="text" name="lastName" onChange={props.handleUpdate} />
      <input
        type="text"
        name="minPaymentPercentage"
        onChange={props.handleUpdate}
      />
      <input type="text" name="balance" onChange={props.handleUpdate} />
      <input type="submit" value="Add" />
    </form>
  );
};
