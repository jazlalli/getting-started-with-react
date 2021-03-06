# Rendering UI with React

[Code](./code)

### Rendering UI

First, we'll just render some static stuff into the document body:

```javascript
ReactDOM.render(<p>hello world</p>, document.getElementById('root'));
```

Components are just functions, so we could do this without that freaky JSX like so:

```javascript
const p = React.DOM.p;
ReactDOM.render(p({}, 'hello world'), document.getElementById('root'));
```

Lets create our first component and render it to the page:

```javascript
var App = React.createClass({
  render: function() {
    return (
      <h3>hello world!</h3>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('root'));
```

**Note**: You must always return a root element from the `render` method. If you get weird errors this is probably why.

Now lets create a content toggle component. When you click the summary, the details will expand or contract.

In React, your top-level `App` component and small UI controls are all components. There is no distinction between components, controllers, views, directives, etc.

```javascript
var ContentToggle = React.createClass({
  render() {
    return (
      <div>
        I am a ContentToggle
      </div>
    );
  }
});
```

Now, to use this in `App`, we simply add it to the render method.

```javascript
var App = React.createClass({
  render() {
    return (
      <div>
        <h2>Hello, world!</h2>
        <ContentToggle />
      </div>
    );
  }
});
```

And finally, render it into the document:

```javascript
ReactDOM.render(<App />, document.getElementById('root'));
```

### Data (props)

So far our `ContentToggle` is pretty useless. Lets allow the user to supply some content to render by using `props`.

```javascript
var ContentToggle = React.createClass({
  render() {
    return (
      <div>
        <h3>{this.props.summary}</h3>
        <ul>{this.props.children}</ul>
      </div>
    );
  }
});
```

Usage:

```xml
<ContentToggle summary="Some thoughts on tacos">
  <li>Everybody should eat tacos.</li>
</ContentToggle>
```

Properties are passed in just like HTML attributes. You access the children in the component on `this.props.children`. This is like `{{yield}}` in Ember or Angular's `ng-transclude`.

Note the `{curlies}`. When you're in JSX, this is how you bust back out into JavaScript. So you've got JavaScript in your XML in your JavaScript and you'll most likely love it soon but hate it right now.

### Event Handlers

We want to click the summary and toggle it's visibility. React uses `camelCase` names for event handlers declared on the element itself: so it's `onClick`, not `onclick`.

```javascript
var ContentToggle = React.createClass({
  handleClick(event) {
    console.log('soo ... now what?');
  },
  render() {
    return (
      <div>
        <h3 onClick={this.handleClick}>
          {this.props.summary}
        </h3>
        <ul>
          {this.props.children}
        </ul>
      </div>
    );
  }
});
```

### Data (state)

In React, the state of your component is restricted to the values on
`this.state`. Whenever you change state, your component will re-render.

Your component won't actually re-render everything to the DOM, but it will re-render to a virtual DOM. It then compares this new virtual DOM to the previous one. The resulting diff is the smallest set of operations to apply to the real DOM.

We'll use state to manage the visibility of our details view.

```javascript
var ContentToggle = React.createClass({

  // lifecycle hook to get initial state and declare what
  // state you'll be managing in this component
  getInitialState() {
    return {
      showDetails: false
    };
  },

  handleClick(event) {
    this.setState({
      showDetails: !this.state.showDetails
    });
  },

  render() {
    var details = this.state.showDetails ? this.props.children : null;

    return (
      <div>
        <h3 onClick={this.handleClick}>
          {this.props.summary}
        </h3>
        <ul>
          {details}
        </ul>
      </div>
    );
  }

});
```

### Managing Focus and Refs

To make this accessible, we need to manage focus. First we simply add `tabIndex="0"` to the summary to make it tabbable and `tabIndex="-1"` to the details so we can programmatically focus it. But, the real task is to go focus the details when it expands.

In order to do this we need to access the the details element. Instead of relying on DOM traversal like `this.$()` from Ember or the `element` API in an Angular directive, to get at our elements React uses `refs`.

Refs are sort of like element IDs but scoped to the component that owns the ref.

```javascript
var ContentToggle = React.createClass({

  // ...

  handleClick(event) {
    this.setState({
      showDetails: !this.state.showDetails
    });

    this.refs.details.focus();
  }

  render() {

    // ...

    return (
      <div>
        <h3 tabIndex="0" onClick={this.handleClick}>
          {this.props.summary}
        </h3>
        <ul ref="details" tabIndex="-1">
          {details}
        </ul>
      </div>
    );
  }

});
```

Note the `ref="details"` and then accessing it in `handleClick` with `this.refs.details`.

We are fortunate that `refs.details` is always rendered. If the element you need to focus is not going to be rendered until React is done with its next render cycle from calling `setState`, focus the element in the `setState` callback.

```javascript
this.setState(someState, this.focusSomething);
```

### Exercise

Right now, only clicking will toggle the details. Add keyboard support so that `enter` and `space` will too.
