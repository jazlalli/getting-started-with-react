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
    let summaryClassName = '';

    if (this.state.showDetails) {
      details = this.props.children;
      summaryClassName = 'expanded';
    }

    return (
      <div>
        <div onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </div>
        <div>
          {details}
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <ContentToggle summary="Some thoughts on tacos">
          <li>Everybody should eat tacos.</li>
          <li>The more tacos the better.</li>
          <li>Fajitas are OK too though.</li>
        </ContentToggle>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));