import React, { Children, Component, PropTypes } from 'react';

export default class InputGroup extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
  }

  renderAddon(value) {
    if (!value) return null;
    return <span className="mg-form-input-group-addon">{value}</span>;
  }

  render() {
    const { children, prefix, suffix } = this.props;
    if (!prefix && !suffix) return this.props.children;
    return (
      <div className="mg-form-input-group">
        {this.renderAddon(prefix)}
        {this.props.children}
        {this.renderAddon(suffix)}
      </div>
    );
  }
}
