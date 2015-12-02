# Rendering UI with React

[Code](./code)

### Rendering UI

First, we'll just render some static stuff into the document body:

```js
ReactDOM.render(<p>hello world</p>, document.getElementById('root'));
```

Components are just functions, so we could do this without that freaky
JSX like so:

```js
const p = React.DOM.p;
ReactDOM.render(p({}, 'hello world'), document.getElementById('root'));
```

Lets create our first component and render it to the page:

```js
var App = React.createClass({
  render: function() {
    return (
      <p>hello world!</p>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('root'));
```

or using ES6 classes if you prefer:

```js
const { Component } = React;
const { render } = ReactDOM;

class App extends Component {
  render() {
    return (
      <p>hello world!</p>
    );
  }
}

render(<App />, document.getElementById('root'));
```

**Note**: You must always return a root element from the `render`
method. If you get weird errors this is probably why.

Now lets create a content toggle component. When you click the summary,
the details will expand or contract.

In React, your top-level `App` component and small UI controls are all
components. There is no distinction between components, controllers,
views, directives, etc.

```js
var ContentToggle = React.createClass({
  render: function() {
    return (
      <div>
        I am a ContentToggle
      </div>
    );
  }
});
```

Now, to use this in `App`, we simply add it to the render method.

```js
var App = React.createClass({
  render: function() {
    return (
      <div>
        <p>hello world!</p>
        <ContentToggle />
      </div>
    );
  }

});
```

And finally, render it into the document:

```js
ReactDOM.render(<App />, document.getElementById('root'));
```

### Data (props)

So far our `ContentToggle` is pretty useless. Lets allow the user to
supply some content to render by using `props`.

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
<ContentToggle summary="Some thoughts on tacos">
  <p>Everybody should eat tacos.</p>
</ContentToggle>
```

Properties are passed in just like HTML attributes. You access the
children nested in the component on `this.props.children`; this
is like `{{yield}}` in Ember or Angular's `ng-transclude`.

Note the `{curlies}`. When you're in JSX, this is how you bust back out
into JavaScript. So you've got JavaScript in your XML in your JavaScript
and you'll most likely love it soon but hate it right now.

### Event Handlers

We want to click the summary and have the details toggle it's
visibility.  React uses `camelCase` names for event handlers declared on the
element itself: `onClick`, not `onclick`.

```js
var ContentToggle = React.createClass({

  handleClick: function(event) {
    console.log('soo ... now what?');
  },

  render: function() {
    return (
      <div>
        <div onClick={this.handleClick}>
          {this.props.summary}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }

});
```

### Data (state)

In React, the state of your component is restricted to the values on
`this.state`. Whenever you change state, your component will re-render.

Your component won't actually re-render everything to the DOM, but it
will re-render to a virtual DOM. It then compares this new virtual DOM
to the previous one. The resulting diff is the smallest set of
operations to apply to the real DOM.

We'll use state to manage the visibility of our details view.

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

### Managing Focus and Refs

To make this accessible, we need to manage focus. First we simply add
`tabIndex="0"` to the summary to make it tabbable and `tabIndex="-1"` to
the details so we can programmatically focus it. But, the real task is
to go focus the details when it expands.

In order to do this we need to access the the details element. Instead
of relying on DOM traversal like `this.$()` from Ember or the `element`
api in an Angular directive, to get at our elements React uses `refs`.

Refs are sort of like element IDs but scoped to the component that owns
the ref.

```js
var ContentToggle = React.createClass({

  // ...

  handleClick: function(event) {
    this.setState({
      showDetails: !this.state.showDetails
    });
    this.refs.details.focus();
  },

  render: function() {

    // ...

    return (
      <div>
        <div tabIndex="0" onClick={this.handleClick}>
          {this.props.summary}
        </div>
        <div ref="details" tabIndex="-1">
          {details}
        </div>
      </div>
    );
  }

});
```

Note the `ref="details"` and then accessing it in `handleClick` with
`this.refs.details`.

We are fortunate that `refs.details` is always rendered. If the element
you need to focus is not going to be rendered until React is done with
its next render cycle from calling `setState`, focus the element in the
`setState` callback.

```js
this.setState(someState, this.focusSomething);
```

### Exercise

Right now only clicking will toggle the details. Add keyboard support so
that `enter` and `space` will too.
