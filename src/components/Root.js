import React, {Component} from 'react';
import ReactGA from 'react-ga';
import RootComponent from './RootComponent';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }

  render() {

    const style = {
      mobile: this.state.windowWidth < 900,
      colors: {
        primary: '#20232a',
        secondary: '#FEFEFE',
        borders: '#DDDDDD'
      }
    }

    if (process.env.NODE_ENV !== "development") {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    return <RootComponent style={style} />
  }
}

export default Root;