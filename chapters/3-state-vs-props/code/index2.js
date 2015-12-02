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
    var summaryClassName = 'summary';

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


});

var App = React.createClass({
  render: function() {
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
});

ReactDOM.render(<App />, document.getElementById('root'));