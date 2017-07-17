import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadingStatus } from '@/store/actions';
import '@/three';
import './index.css';
import { initRenderer } from '@/three/renderer';
import getRemainingHeight from '@/utils/dom/getRemainingHeight';
import Loading from '@/components/loading';
import RightPanel from './right-panel';
import CarPartsTree from './car-parts-tree';
@connect(
    // mapStateToProps
    (state) => ({isCarLoadingCompleted: state.common.isCarLoadingCompleted}),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            loadingStatus,
        }, dispatch)
    })
)
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
    }
    componentWillReceiveProps (nextProps) {
        // car model loading completed, stop the Loading
        if (nextProps.isCarLoadingCompleted === true) {
            this.setState({
                isLoading: false
            });
        }
    }
    render () {
        var remainingHeight = this.state.threeContainerStyle.height
        return (
            <div className="flex-row" style={{position: 'relative'}}>
                <div 
                    ref="threeContainer" 
                    style={this.state.threeContainerStyle}
                    className="flex-col-8 renderer-container"
                >
                    {this.state.isLoading ? <Loading/> : null}
                </div>
                <RightPanel style={{height: remainingHeight}}/>
                <CarPartsTree/>
            </div>
        )
    }
}

export default Page