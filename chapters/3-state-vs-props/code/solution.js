var App = React.createClass({

  getInitialState() {
    return {
      items: [
        "Everybody should eat tacos",
        "The more tacos the better",
        "Fajitas are OK too though"
      ]
    }
  },

  handleClick(itemIndex) {
    var items = this.state.items.filter((i, idx) => idx !== itemIndex);

    this.setState({
      items: items
    });
  },

  render() {
    var content = this.state.items.map((i, idx) => (
      <li key={idx}>{i} <span className="remove" onClick={this.handleClick.bind(this, idx)}></span></li>
    ));

    return (
      <div>
        <ContentToggle summary="Some thoughts on tacos">
          {content}
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

    if (details && details.length) {
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
