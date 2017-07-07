import * as React from 'react';
// import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import Page from '../page';
import { setAnimateable } from '@/three/renderer';
const TabPane = Tabs.TabPane;

class HomePage extends React.Component{
  tabChange = (key) => {
    // 为了性能，在不包含3d渲染页面，就停止渲染
    if (key === 2) {
      setAnimateable(false);
    } else if (key === 1) {
      setAnimateable(true);
    }
  }
  render () {
     return (
        <div>
          <Tabs onChange={this.tabChange}>
            <TabPane tab="Tab Title 1" key={1}>
              <Page></Page>
            </TabPane>
            <TabPane tab="Tab Title 2" key={2}>
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
              <p>Content of Tab Pane 2</p>
            </TabPane>
          </Tabs>
            {/*<Link to="/page">Page</Link>*/}
        </div>
    );
  }
}

export default HomePage
