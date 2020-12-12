import React, { Component } from 'react';
import apiService from 'services/apiService';

function withLightsApi(WrappedComponent, options) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lightsDAta: {}
      };
      // 'https://api.lifx.com/v1/'

      this.api = apiService.create('https://api.lifx.com/v1/');
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      console.log('The API', this.api);
    }

    componentWillUnmount() {
    }

    handleChange() {
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          data={this.state.data}
          {...this.props} />
      );
    }
  };
}

export default withLightsApi;
