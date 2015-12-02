var ContentToggle = React.createClass({

  // lifecycle hook to get initial state and declare what
  // state you'll be managing in this component
  getInitialState: function() {
    return {
      showDetails: false
    };
  },

  handleClick: function(event) {
    this.setState({
      showDetails: !this.state.showDetails
    });
  },

  render: function() {
    var details;
    var summaryClassName = '';

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


});

var App = React.createClass({
  render: function() {
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
});

ReactDOM.render(<App />, document.getElementById('root'));