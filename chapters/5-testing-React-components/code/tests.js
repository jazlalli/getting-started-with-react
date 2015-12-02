const { Component } = React;
const { render, findDOMNode, unmountComponentAtNode } = ReactDOM;
const { TestUtils } = React.addons;
const wrapper = document.getElementById('test-wrapper');


function equal(a, b, description) {
  if (a === b) {
    console.log('%c✔︎ ok', 'color: green', description);
  } else {
    console.log('%c✘ not ok', 'color: red', description);
    console.assert(a === b, description);
  }
}

class ContentToggle extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.focusAfterClick = this.focusAfterClick.bind(this);
    this.state = {
      showDetails: false
    }
  }

  handleClick(event) {
    this.setState({
      showDetails: !this.state.showDetails
    }, this.focusAfterClick);
  }

  focusAfterClick() {
    if (this.state.showDetails) {
      this.refs.details.focus();
    }
  }

  render() {
    let details = null;
    let summaryClassName = 'summary';

    if (this.state.showDetails) {
      details = this.props.children;
      summaryClassName = ' expanded';
    }

    return (
      <div>
        <div tabIndex="0" onClick={this.handleClick} className={summaryClassName}>
          {this.props.summary}
        </div>
        <div ref="details" tabIndex="-1">
          {details}
        </div>
      </div>
    );
  }
}


const component = render((
  <ContentToggle summary="I am the summary">
    I am the content
  </ContentToggle>
), wrapper);

// get the details DOM node
const details = component.refs.details;

// assert
equal(details.innerHTML.trim(), '', 'details are hidden by default');

// simulate an action on summary
const { Simulate } = TestUtils;
const summary = findDOMNode(component).querySelector('.summary')

// simulate a click
Simulate.click(summary);

// assert
equal(details.innerHTML.trim(), 'I am the content', 'details are shown when summary is clicked');
equal(document.activeElement, details, '"details" gets focus when open');

// simulate again to see if it closes
Simulate.click(summary);
equal(details.innerHTML.trim(), '', 'details are hidden when summary is clicked');

// unmount the component
unmountComponentAtNode(wrapper);
