import React from 'react';

export const NewDebtForm = (props) => {
  console.log(props);
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div className="field-container">
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
        </div>
        <div className="button-container">
          <input type="submit" value="Add" />
          <input type="button" value="Cancel" onClick={props.toggleForm} />
        </div>
      </form>
      <div className="formError-container">
        <div>{props.formError.creditorName || ''}</div>
        <div>{props.formError.minPaymentPercentage || ''}</div>
        <div>{props.formError.balance || ''}</div>
      </div>
    </div>
  );
};
