import React from 'react';

export const NewDebtForm = (props) => {
  console.log(props);
  return (
    <div>
      <form>
        <input
          type="text"
          name="creditorName"
          placeholder="required"
          required
          onChange={props.handleUpdate}
        />
        <input type="text" name="firstName" onChange={props.handleUpdate} />
        <input type="text" name="lastName" onChange={props.handleUpdate} />
        <input
          type="number"
          name="minPaymentPercentage"
          placeholder="required"
          min="0"
          max="100"
          required
          onChange={props.handleUpdate}
        />
        <input
          type="number"
          name="balance"
          placeholder="required"
          min="0"
          required
          onChange={props.handleUpdate}
        />
      </form>
      <div className="formError-container">
        <div>{props.formError.creditorName || ''}</div>
        <div>{props.formError.minPaymentPercentage || ''}</div>
        <div>{props.formError.balance || ''}</div>
      </div>
    </div>
  );
};
