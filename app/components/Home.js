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
      formInput: {},
      loaded: false,
      formActive: false,
      requiredError: false,
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
    if (
      this.state.checked.every((elm) => !elm) ||
      this.state.checked.every((elm) => elm)
    ) {
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
      requiredError: false,
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
    this.setState({
      data: [...this.state.data, this.state.formInput],
      checked: [...this.state.checked, false],
      formInput: {},
      formActive: false,
      requiredError: false,
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
      this.setState({
        data,
        checked: new Array(data.length).fill(false),
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
      requiredError,
      removeError,
    } = this.state;
    return (
      <div>
        <Table
          data={data}
          checked={checked}
          toggleAllChecks={this.toggleAllChecks}
          toggleOneCheck={this.toggleOneCheck}
        />
        {removeError && <div className="error">select a row to remove.</div>}
        {formActive && (
          <NewDebtForm
            formInput={formInput}
            requiredError={requiredError}
            handleUpdate={this.handleUpdate}
            handleSubmit={this.handleSubmit}
          />
        )}
        <button onClick={this.toggleForm}>
          {(formActive && 'Cancel') || 'Add Debt'}
        </button>
        <button onClick={this.handleRemove}>Remove Debt</button>
        <div>
          <div>
            $
            {data
              .filter((elm, idx) => checked[idx])
              .reduce((acc, elm) => acc + elm.balance, 0)}
          </div>
          <div>
            Total Row Count: {data.length} Check Row Count:{' '}
            {checked.filter((elm) => elm === true).length}
          </div>
        </div>
      </div>
    );
  }
}
