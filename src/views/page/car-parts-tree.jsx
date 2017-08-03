import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeToPartStatus } from '@/store/actions';

import { Tree, Input } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
// import array2Array from '@/utils/array/array2Array';
// import { GET } from '@/plugins/fetch/';
// import data from 'assets/json/data.json';

// three
import {toCarPart, carBody} from '@/three/scenes/car/car-body';
import findMesh from '@/utils/three/mesh/findMesh';
import { carPart } from '@/three/scenes/car/car-parts';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

var gData = [
  {
    key:"0-0",
    title: "零件",
  }
];

var wrapStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  textAlign: 'left',
  maxWidth: '160px',
};
/*react-custom-scrollbars  的垂直bar, 覆盖默认的*/
function renderThumbVerticalDefault({ style, ...props }) {
    const finalStyle = {
        ...style,
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(255, 255, 255, .5)'
    };
    return <div style={finalStyle} {...props} />;
}

// 生成一层数据
// TreeNode 需要{key: string, title: string, children?: Array, ...other}
const generateList = (data) => {
  var list = [];
  for (let i = 0; i < data.length; i++) {
    
    const node = data[i];
    var TreeNode = {
      key: node.number,
      title: node.name,
      info: node.info,
    };
    if (node.children) {
      TreeNode.children = generateList(node.children);
    }
    list.push(TreeNode);
  }
  return list;
};

/**
 * 找出包含key的treeNode
 * @param {string} search value 
 * @param {array} tree 
 */
const getSearchKey = function (value, tree, keys = [gData[0].key]) {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.key.search(value) > -1) {
      keys.push(node.key);
    }
    if (node.children) {
      getSearchKey(value, node.children, keys);
    }
  }
  return keys;
}

@connect(
    // mapStateToProps
    (state) => ({
        isToPart: state.common.isToPart,
    }),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            changeToPartStatus
        }, dispatch)
    })
)
class CarPartsTree extends React.Component {
  state = {
    expandedKeys: ['0-0'],
    searchValue: '',
    autoExpandParent: true,
    list: []
  }
 
  componentWillMount () {
    
    // 获取数据
    var data = require('@/static/json/data.json');
    // 转换tree所需要的结构
    generateList(data['car-part']);
    gData[0].children = generateList(data['car-part']);
    this.setState( () => {
        return {
            list: gData
        }
    })
  }
  componentDidMount(){
    // 搜索框自动聚焦
    this.refs.search.input.refs.input.focus()
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  /**
   * 搜索动作
   * @param {Event}
   */
  search = (e) => {
    const value = e.target.value;
    const expandedKeys = getSearchKey(value, this.state.list);
    this.setState({
      expandedKeys,
      searchValue: value
    });
  }

  /**
   * 点击item取id跳到对应的模型
   * @param{string}
   */
  handleClick = (keys) => {
    var [key] = keys;
    if (String(key) === '1231312314') {
      toCarPart(findMesh(carPart, 'part_wrap'));
      this.props.actions.changeToPartStatus(true);
      carBody.visible = false;
      carPart.visible = true;
    }
  }
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    
    // Recursive Traversal TreeNode
    const loop = data => data.map((item) => {
      const index = item.key.search(searchValue);
      const beforeStr = item.key.substr(0, index);
      const afterStr = item.key.substr(index + searchValue.length);
      const title = index > -1 
       ? (
          <span>
            {beforeStr}
            <span style={{ color: 'red' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) 
       :(searchValue !== '' && item.children === undefined)
          ? null
          : <span>{item.key}</span>;

      if (item.children && item.children.length) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });
    
    return (
      <div
        style={wrapStyle}
        >
        <Search
          style={{ width: 160 }}
          placeholder="Search"
          onChange={this.search}
          ref="search"
        />
      <Scrollbars
        className="black-box"
        style={{ width: 160, height: 400, color:'#fff' }}
        renderThumbVertical={renderThumbVerticalDefault}
        >
          <Tree
            onSelect={this.handleClick}
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {loop(this.state.list)}
          </Tree>
        </Scrollbars>
      </div>
    );
  }
}

export default CarPartsTree