# State vs. Props

Let's re-visit the ContentToggle example. This is how we used props

```js
var ContentToggle = React.createClass({

  render: function() {
    return (
      <div>
        <div>{this.props.summary}</div>
        <div>{this.props.children}</div>
      </div>
    );
  }

});
```

Usage:

```xml
<ContentToggle summary="Tacos">
  <p>Everybody should eat tacos.</p>
</ContentToggle>
```

### State

And this is how we used state to manage the visibility of the details view.

```js
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
    var details = this.state.showDetails ? this.props.children : null;

    return (
      <div>
        <div onClick={this.handleClick}>
          {this.props.summary}
        </div>
        <div>
          {details}
        </div>
      </div>
    );
  }

});
```

### "Always Re-render" Model

You hear the term "always re-render" in React. Instead of initializing a
view and then observing values as they change over time (a difficult
mental model as more things start happening in your views), in your
render method you get to pretend like this is the first and only time
you're ever rendering. Or, you can think of it like stateless
server-side rendering like you do in Rails or PHP.

Let's add some classes to our elements to see if we can get a feel for
what this means.

```js
var ContentToggle = React.createClass({

  // ...

  render: function() {
    var details;
    var summaryClassName = 'hidden';

    if (this.state.showDetails) {
      details = this.props.children;
      summaryClassName = 'visible';
    }

    return (
      <div className="ContentToggle">
        <div onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </div>
        <div className="ContentToggle__Details">
          {details}
        </div>
      </div>
    );
  }

});
```

Rather than observing state over time, we just consider the current
state and build up our `className`. There is no adding or removing, just
building. Again, its the same mental model as server rendering. You
don't observe fields in the database and then change the HTML a route
will render, you just render the data as it is right now.

When you first look at these render methods coming from other view
libraries it seems ... well, terrible. But it doesn't take long to enjoy
the simple mental model and ability to express your UI wherever it makes
sense.