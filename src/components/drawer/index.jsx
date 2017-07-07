import * as React from 'react';
import PropTypes from 'prop-types';
import './index.css';
export default class Drawer extends React.Component {
  static defaultProps = {
    prefixCls: 'am-drawer',
    enableDragHandle: false,
  };
  static propsTypes = {
    onOpenChange: PropTypes.func,
    open: PropTypes.boolean,
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    /** below web only */
    sidebarStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    overlayStyle: PropTypes.object,
    dragHandleStyle: PropTypes.object,
    docked: PropTypes.boolean,
    transitions: PropTypes.boolean,
    touch: PropTypes.boolean,
    dragToggleDistance: PropTypes.number,
    prefixCls: PropTypes.string,
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}