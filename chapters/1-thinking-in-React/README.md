# [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)

- React isn't an MVC framework
- React doesn't use templates

React introduces a new set of ideas which are different from already established *best parctises*. It encorages developers to move away from traditional MVC-style applications, and instead adopt a component based approach. Instead of thinking of your application in therms of groups of models, views and controllers, think of it as a collection of UI components, each of which is responsible for rendering a specific bit of data.

If you create a suite of components, you can compose them together to create higher-level components. This encourages a more functional programming approach to building user interfaces. If your components just render data, they are in effect pure functions. React also promotes the idea of uni-directional data flow through your app, as opposed to 2-way binding, for example. This encourages thinking of your data as an immutable structure. All you have is a snapshot of your data as it is right now. If it changes, you'll get new data, rather than a mutation on the existing data. These concepts help organize our applications into easy to understand, reusable components. The functional approach also makes components easier to test and simplifies the problem of managing state in large scale web applications.

Finally, React is just a view layer, nothing more. Everything in React is a component. You can think of these as somewhat equivalent to web components, Ember components, or Angular directives. They simply represent a section of your UI.