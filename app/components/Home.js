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
      requiredError: false,
      removeError: false,
    };
    this.toggleOneCheck = this.toggleOneCheck.bind(this);
    this.toggleAllChecks = this.toggleAllChecks.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleAllChecks() {
    let copyArr = [...this.state.checked];
    if (
      this.state.checked.every((elm) => elm === false) ||
      this.state.checked.every((elm) => elm === true)
    ) {
      copyArr = copyArr.map((elm) => !elm);
    } else {
      copyArr = copyArr.map((elm) => true);
    }
    this.setState({ checked: copyArr });
  }

  toggleOneCheck(index = 1) {
    const copyArr = [...this.state.checked];
    copyArr[1] = !copyArr[1];
    this.setState({ checked: copyArr });
  }

  handleUpdate(event) {
    this.setState({
      formInput: { ...formInput, [event.target.name]: event.target.value },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      data: [...data, this.state.formInput],
      checked: [...checked, false],
      formInput: {},
    });
  }
  handleRemove(event) {}

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
    const { data, checked, formInput, loaded, requiredError, removeError } =
      this.state;
    console.log(data);
    return (
      <div>
        <Table
          data={data}
          checked={checked}
          toggleAllChecks={this.toggleAllChecks}
          toggleOneCheck={this.toggleOneCheck}
        />
        <NewDebtForm
          formInput={formInput}
          handleUpdate={this.handleUpdate}
          handleSubmit={this.handleSubmit}
        />
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
        <button onClick={this.toggleOneCheck}>Toggle One</button>
        <button onClick={this.toggleAllChecks}>Toggle All</button>
      </div>
    );
  }
}
