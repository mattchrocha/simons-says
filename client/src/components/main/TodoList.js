import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./main.css";


export default class TodoList extends React.Component {
  constructor() {
    super();
    this.state = { items: ["hello", "world", "click", "me"] };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([prompt("Enter some text")]);
    this.setState({ items: newItems });
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <CSSTransition timeout={1000} classNames="example" key={item}>
        <div key={item} onClick={() => this.handleRemove(i)}>
          {item}
        </div>
      </CSSTransition>
    ));

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <TransitionGroup className="todo-list" >
        {items}
        </TransitionGroup>
      </div>
    );
  }
}
