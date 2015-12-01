var ContentToggle = React.createClass({
  render: function() {
    return (
      <div>
        <h3>{this.props.summary}</h3>
        <ul>{this.props.children}</ul>
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