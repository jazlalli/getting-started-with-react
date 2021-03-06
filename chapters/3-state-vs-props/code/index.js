var App = React.createClass({
  render() {
    return (
      <div>
        <ContentToggle summary="Some thoughts on tacos">
          <li>
            Everybody should eat tacos
            <span className="remove"></span>
          </li>
          <li>
            The more tacos the better
            <span className="remove"></span>
          </li>
          <li>
            Fajitas are OK too though
            <span className="remove"></span>
          </li>
        </ContentToggle>
      </div>
    );
  }
});

var ContentToggle = React.createClass({
  getInitialState() {
    return {
      showDetails: false
    };
  },
  handleClick(event) {
    this.setState({
      showDetails: !this.state.showDetails
    });

    this.refs.details.focus();
  },
  handleKeyUp(event) {
    if (event.which === 13 || event.which === 32) {
      this.setState({
        showDetails: !this.state.showDetails
      });

      this.refs.details.focus();
    }
  },
  render() {
    var listClassName = 'content';
    var details = this.state.showDetails ? this.props.children : null;

    if (details) {
      listClassName += ' expanded';
    }

    return (
      <div>
        <h3 tabIndex="0" onClick={this.handleClick} onKeyUp={this.handleKeyUp}>
          {this.props.summary}
        </h3>
        <ul className={listClassName} ref="details" tabIndex="-1">
          {details}
        </ul>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
