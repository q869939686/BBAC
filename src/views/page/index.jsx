import * as React from 'react';
import '@/three';
import { initRenderer } from '@/three/renderer';
import getRemainingHeight from '@/utils/dom/getRemainingHeight';
import Loading from '@/components/loading';
import Drawer from '@/components/drawer';
class Page extends React.Component {
    state = {
        threeContainerStyle: {
            width: '100%',
            height: '100%'
        },
        isLoading: true,
        rightInfo: true
    }
    componentDidMount () {
        // set container width/height and set renderer width/height
        var renderer = initRenderer(this.refs.threeContainer);
        var width = this.refs.threeContainer.offsetWidth;
        this.refs.threeContainer.appendChild(renderer.domElement);
        // 获取容器剩余高度
        var remainingHeight = getRemainingHeight(this.refs.threeContainer);
        this.setState({
            threeContainerStyle: {
                width: width + 'px',
                height: remainingHeight + 'px'
            }
        });
        renderer.setSize( width, remainingHeight );
        setTimeout(() => {
            this.setState({
                isLoading: false
            });
        }, 2000);
    }
    render () {
        return (
            <div>
                {this.state.isLoading ? <Loading/> : null}
                <div ref="threeContainer" style={this.state.threeContainerStyle}>

                </div>
                <Drawer 
                    width="20%"
                    position="right"
                    containerStyle={{top: '48px', overflow: 'hidden'}} 
                    openSecondary={true}
                    parent={this}
                    open={this.state.rightInfo} 
                >
                    <div>
                        right
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Page