import React, { Component } from 'react';


class HomeHeader extends Component {
  componentWillMount(){
    console.log(1)
    console.log(this.props.match.params)
  }
  render() {
    return (
      <div className="Header">
            111111111111
      </div>
    );
  }
}

export default HomeHeader;