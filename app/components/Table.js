import React from 'react';

export const Table = (props) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <td>
              <input type="checkbox" onChange={props.toggleAllChecks} />
            </td>
            <th>Creditor</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Min Pay%</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((debt, idx) => (
            <tr key={debt.id}>
              <td>
                <input
                  type="checkbox"
                  checked={props.checked[idx]}
                  value={idx}
                  onChange={props.toggleOneCheck}
                />
              </td>
              <td>{debt.creditorName}</td>
              <td>{debt.firstName}</td>
              <td>{debt.lastName}</td>
              <td>{debt.minPaymentPercentage}</td>
              <td>{debt.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
