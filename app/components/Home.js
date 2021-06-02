import React from 'react';
import axios from 'axios';
import { NewDebtForm } from './NewDebtForm';
import { Table } from './Table';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checked: [],
      nextId: 0,
      formInput: {},
      loaded: false,
      formActive: false,
      removeError: false,
    };
    this.toggleOneCheck = this.toggleOneCheck.bind(this);
    this.toggleAllChecks = this.toggleAllChecks.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  toggleAllChecks() {
    let copyArr = [...this.state.checked];
    if (copyArr.every((elm) => !elm) || copyArr.every((elm) => elm)) {
      copyArr = copyArr.map((elm) => !elm);
    } else {
      copyArr = copyArr.map((elm) => true);
    }
    this.setState({ checked: copyArr, removeError: false });
  }

  toggleOneCheck(event) {
    const idx = event.target.value;
    const copyArr = [...this.state.checked];
    copyArr[idx] = !copyArr[idx];
    this.setState({ checked: copyArr, removeError: false });
  }

  toggleForm() {
    this.setState({
      formActive: !this.state.formActive,
      removeError: false,
      formError: {},
    });
  }

  handleUpdate(event) {
    this.setState({
      formInput: {
        ...this.state.formInput,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const copyObj = { ...this.state.formInput };
    copyObj.id = this.state.nextId;
    this.setState({
      data: [...this.state.data, copyObj],
      checked: [...this.state.checked, false],
      nextId: this.state.nextId + 1,
      formInput: {},
      formActive: false,
      formError: {},
    });
  }

  handleRemove(event) {
    if (this.state.checked.every((elm) => !elm)) {
      this.setState({ removeError: true });
    } else {
      const filteredData = this.state.data.filter(
        (elm, idx) => !this.state.checked[idx]
      );
      const filterdCheck = this.state.checked.filter((elm) => !elm);
      this.setState({ data: filteredData, checked: filterdCheck });
    }
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
      );
      const lastId = Number(data[data.length - 1].id);
      this.setState({
        data,
        checked: new Array(data.length).fill(false),
        nextId: lastId + 1,
        loaded: true,
      });
    } catch (error) {
      console.log('Json fetch failed', error);
    }
  }

  render() {
    const {
      data,
      checked,
      formInput,
      loaded,
      formActive,
      formError,
      removeError,
    } = this.state;

    return (
      <div className="contents-container">
        <Table
          data={data}
          checked={checked}
          toggleAllChecks={this.toggleAllChecks}
          toggleOneCheck={this.toggleOneCheck}
        />
        {removeError && <div className="error">select a row to remove</div>}
        {formActive && (
          <NewDebtForm
            formInput={formInput}
            formError={formError}
            toggleForm={this.toggleForm}
            handleUpdate={this.handleUpdate}
            handleSubmit={this.handleSubmit}
          />
        )}
        {!formActive && (
          <div className="button-container">
            <button onClick={this.toggleForm}>Add Debt</button>
            <button onClick={this.handleRemove}>Remove Debt</button>
          </div>
        )}
        <div className="total-container">
          <div>Total</div>
          <div>
            $
            {data
              .filter((elm, idx) => checked[idx])
              .reduce((acc, elm) => acc + Number(elm.balance), 0)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>
        <div className="count-container">
          <div>Total Row Count: {data.length}</div>
          <div>Check Row Count: {checked.filter((elm) => elm).length}</div>
        </div>
      </div>
    );
  }
}
