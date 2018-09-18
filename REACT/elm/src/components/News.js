
import React, { Component } from 'react';

class News extends Component {
  constructor(props) {
    super(props)
    this.state={
      active:'1'
    }
  }

  componentWillMount() {
    console.log(1)
  }

  componentDidMount() {
    console.log(2)
  }
  componentWillUnmount() {
    console.log(7)
  }

  render() {
    return (
      <div className="news">
            news;
      </div>
    )
  }
}

export default News;