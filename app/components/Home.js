import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checked: [],
      loaded: false,
    };
  }

  render() {
    return <div>Home component rendered</div>;
  }
}
