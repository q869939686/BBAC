import * as React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'antd';
// import reqwest from 'reqwest';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="void()">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="void()">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="void()">Delete</a>
      <span className="ant-divider" />
      <a href="void()" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];


class RightPanel extends React.Component {
    static defaultProps = {
        show: false,
        style: {}
    }
    static propTypes = {
        style: PropTypes.object,
        show: PropTypes.bool
    }
    state = {
    }
    componentDidMount () {

    }
    render () {
        var style = this.props;
        return (
            <div className="black-box flex-col-4" style={style}>
                <Table 
                    columns={columns}
                    dataSource={data}
                />
            </div>
        )
    }
}

export default RightPanel