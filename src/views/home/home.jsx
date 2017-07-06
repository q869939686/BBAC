import * as React from 'react';
// import { Link } from 'react-router-dom';
import { Tabs } from 'antd';
import Page from '../page';
const TabPane = Tabs.TabPane;

class HomePage extends React.Component{
  render () {
     return (
        <div>
          <Tabs>
            <TabPane tab="Tab Title 1" key="1">
              <Page></Page>
            </TabPane>
            <TabPane tab="Tab Title 2" key="2">
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
