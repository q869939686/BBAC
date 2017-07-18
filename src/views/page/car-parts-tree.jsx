import * as React from 'react';
import { Tree, Input } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import array2Array from '@/utils/array/array2Array';
// import { GET } from '@/plugins/fetch/';
// import data from 'assets/json/data.json';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
/*var cameraPosition = new TWEEN.Tween(camera.position);
var cameraRotationX = new TWEEN.Tween(camera.rotation.x);*/


var gData = [
  {
    key:"汽车零部件",
    title: "0-0",
  }
];


var wrapStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  textAlign: 'left',
  maxWidth: '160px'
};

// 生成一层数据
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
// generateList(gData);
// console.log(gData)
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

class CarPartsTree extends React.Component {
  state = {
    expandedKeys: ['汽车零部件1'],
    searchValue: '',
    autoExpandParent: true,
    windmilList: []
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onChange = (e) => {
    const value = e.target.value;

    const expandedKeys = dataList.map((item) => {
      if (item.key.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);

    this.setState({
      searchValue: value
    });
    console.log(expandedKeys)
  }
  onMouseEnter = () => {

  }
  onMouseLeave = () => {

  }
  handleClick = (key) => {
    // var key = key[0];
  }
  componentWillMount () {
    // 获取数据
    var data = require('@/static/json/data.json');
    // 转换key
    gData[0].children = array2Array({
        data: data.windmillData,
        format: ['key', 'title', 'status'],
        originaFormat: ['名称', '名称', '状态']
    });
      // 转换tree所需要的结构
    generateList(gData);
    this.setState( () => {
        return {
            windmilList: gData
        }
    })
    /*fetch( window.proPath + 'json/data.json')
      .then( response => {
        gData[0].children = array2Array({
          data: response.data.windmillData,
          format: ['key', 'title', 'status'],
          originaFormat: ['名称', '名称', '状态']
        });
        generateList(gData);
        this.setState( () => {
          return {
            windmilList: gData
          }
        })
        // this.onChange()
      })
      .catch(function (error) {
      });*/
  }
  componentDidMount(){
    // 搜索框自动聚焦
    this.refs.search.input.refs.input.focus()
  }
  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = data => {
      var temp = [];
      for (var i = 0; i < data.length; i++){
        var item = data[i];
        var warningStyle = {color: '#fff'};
        
        var index = item.key.search(searchValue);
        // 初始，有问题的标红
        if (item.status !== 1 && !item.children) {
          warningStyle = {
            color: 'red'
          }
        }
        const beforeStr = item.key.substr(0, index);
        const afterStr = item.key.substr(index + searchValue.length);
        if (!item.children && !~index) {
          continue;
        }
        // 搜索关键字标色
        const title = index > -1 ? (
          <span style={warningStyle}>
            {beforeStr}
            <span style={{ color: '#83B5DA' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : <span style={warningStyle}>{item.key}</span>;

        if (item.children) {
          temp.push((
            <TreeNode key={item.key} title={title}>
              {loop(item.children)}
            </TreeNode>
          ));
          continue;
        }
        temp.push(<TreeNode key={item.key} title={title}/>);
      }
      return temp;
    };
    return (
      <div
        style={wrapStyle}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        >
        <Search
          style={{ width: 160 }}
          placeholder="Search"
          onChange={this.onChange}
          ref="search"
        />
      <Scrollbars
        style={{ width: 160, height: 400, color:'#fff' }}
        >
          <Tree
            onSelect={this.handleClick}
            onExpand={this.onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {loop(this.state.windmilList)}
          </Tree>
        </Scrollbars>
      </div>
    );
  }
}

export default CarPartsTree