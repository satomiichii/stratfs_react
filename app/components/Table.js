import React from 'react';

export const Table = (props) => {
  return (
    <div className="table-container">
      <table>
        <tr>
          <input type="checkbox" onChange={props.toggleAllChecks} />
          <th>Creditor</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Min Pay%</th>
          <th>Balance</th>
        </tr>
        {props.data.map((debt, idx) => (
          <tr key={debt.id}>
            <input
              type="checkbox"
              checked={props.checked[idx]}
              value={idx}
              onChange={props.toggleOneCheck}
            />
            <td>{debt.creditorName}</td>
            <td>{debt.firstName}</td>
            <td>{debt.lastName}</td>
            <td>{debt.minPaymentPercentage}</td>
            <td>{debt.balance}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
