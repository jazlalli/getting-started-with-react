const { Component } = React;
const { render } = ReactDOM;

class ContentToggle extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      showDetails: false
    }
  }

  handleClick(event) {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    let details = null;
    let summaryClassName = 'summary';

    if (this.state.showDetails) {
      details = this.props.children;
      summaryClassName += ' expanded';
    }

    return (
      <div>
        <h3 onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </h3>
        <ul className='content'>
          {details}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <ContentToggle summary="Some thoughts on tacos">
          <li>Everybody should eat tacos.<span className='remove'>x</span></li>
          <li>The more tacos the better.<span className='remove'>x</span></li>
          <li>Fajitas are OK too though.<span className='remove'>x</span></li>
        </ContentToggle>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));