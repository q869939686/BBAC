import * as React from 'react';
import initRenderer from '@/three';
import getRemainingHeight from '@/utils/dom/getRemainingHeight';
class Page extends React.Component {
    state = {
        threeContainerStyle: {
            width: '100%',
            height: '100%'
        }
    }
    componentDidMount () {
        // set container width/height and set renderer width/height
        var renderer = initRenderer(this.refs.threeContainer);
        var width = this.refs.threeContainer.offsetWidth;
        var height = this.refs.threeContainer.offsetHeight;
        this.refs.threeContainer.appendChild(renderer.domElement);
        // 获取容器剩余高度
        var remainingHeight = getRemainingHeight(this.refs.threeContainer);
        this.setState({
            threeContainerStyle: {
                width: width + 'px',
                height: remainingHeight - 30 + 'px'
            }
        });
        renderer.setSize( width, remainingHeight );
    }
    render () {
        return (
            <div>
                <div ref="threeContainer" style={this.state.threeContainerStyle}>

                </div>
            </div>
        )
    }
}

export default Page