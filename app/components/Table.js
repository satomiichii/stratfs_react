import React from 'react';

export const Table = (props) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <td className="no-border">
              <input
                type="checkbox"
                onChange={props.toggleAllChecks}
                checked={props.checked.every((elm) => elm)}
              />
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
            <tr
              key={debt.id}
              className={(props.checked[idx] && 'selected') || ''}
            >
              <td className="no-border">
                <input
                  type="checkbox"
                  checked={props.checked[idx]}
                  value={idx}
                  onChange={props.toggleOneCheck}
                />
              </td>
              <td className="left-border">{debt.creditorName}</td>
              <td>{debt.firstName}</td>
              <td>{debt.lastName}</td>
              <td className="num-field">
                {Number(debt.minPaymentPercentage).toFixed(2)}%
              </td>
              <td className="num-field">
                {Number(debt.balance)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
