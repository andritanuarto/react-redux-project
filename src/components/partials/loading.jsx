import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {
  static propTypes = {
    theme: PropTypes.string,
  };

  static defaultProps = {
    theme: 'black',
  }

  render() {
    return (
      <div className={`loading-overlay ${this.props.theme}`}>
        <div className="spinner">
          <div className="rect1" />
          <div className="rect2" />
          <div className="rect3" />
          <div className="rect4" />
          <div className="rect5" />
        </div>
      </div>
    );
  }
}

export default Loading;
