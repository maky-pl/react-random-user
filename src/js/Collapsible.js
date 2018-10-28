import React from "react";
import PropTypes from "prop-types";

class Collapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded,
      height: this.refs.inner.clientHeight
    });
  }

  render() {
    const { title, picture, children } = this.props;
    const { isExpanded, height } = this.state;
    const currentHeight = isExpanded ? height : 0;
    return (
      <div
        className={`panel ${isExpanded ? "is-expanded" : ""}`}
        onClick={e => this.handleToggle(e)}
      >
        <div className="panel-heading">
          <h4 className="name">{title}</h4>
          <p>
            <img className="face" src={picture} />
          </p>
        </div>
        <div
          className="panel-collapse"
          style={{ height: currentHeight + "px" }}
        >
          <div className="panel-body" ref="inner">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Collapsible.propTypes = {
  title: PropTypes.string
};

export default Collapsible;
