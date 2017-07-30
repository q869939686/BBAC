import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadingStatus, toCarPart } from '@/store/actions';
import '@/three';
import './index.css';
// three
import { Vector3 } from 'three';
import { initRenderer, setAnimateable } from '@/three/renderer';
import { controls } from '@/three/controls';
import { cameraPosition } from '@/three/camera';
import { carBody } from '@/three/scenes/car/car-body';
import { carPart } from '@/three/scenes/car/car-parts';

import getRemainingHeight from '@/utils/dom/getRemainingHeight';
import Loading from '@/components/loading';
import ChartLine from '@/components/charts/chart-line';

import RightPanel from './right-panel';
import CarPartsTree from './car-parts-tree';
import carBodyImg from '@/static/images/car-body.jpg';
@connect(
    // mapStateToProps
    (state) => ({
        isCarLoadingCompleted: state.common.isCarLoadingCompleted,
        isToPart: state.common.isToPart
    }),
    // buildActionDispatcher
    (dispatch, ownProps) => ({
        actions: bindActionCreators({
            loadingStatus,
            toCarPart
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
        // 获取容器剩余高度
        var remainingHeight = getRemainingHeight(this.refs.threeContainer);
        this.setState({
            threeContainerStyle: {
                width: width + 'px',
                height: remainingHeight + 'px'
            }
        });
        this.refs.threeContainer.appendChild(renderer.domElement);
        renderer.setSize( width, remainingHeight );
        setAnimateable(true);
    }
    componentWillReceiveProps (nextProps) {
        // car model loading completed, stop the Loading
        if (nextProps.isCarLoadingCompleted === true) {
            this.setState({
                isLoading: false
            });
        }
    }
    /* 返回车身 */
    backCarBody = () => {
        carBody.visible = true;
        this.props.actions.toCarPart(false);
        cameraPosition
        .to({
            x: -5.053339684320584,
            y: 1.1110786173302798,
            z: 3.0942781347037497e-16
        }, 200)
        .start()
        .once('complete', function (t, n) {
            controls.target = new Vector3(0, 0, 0);
            controls.update();
            carPart.visible = false;
        });
        
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
                    <div 
                        className="car-body"
                        style={{display: !this.props.isToPart ? 'none' : 'block'}}
                        onClick={this.backCarBody}
                    >
                        <img src={carBodyImg} alt="car-body"/>
                    </div>
                </div>
                <RightPanel style={{height: remainingHeight}}/>
                <CarPartsTree/>
                {
                    this.props.isToPart ? 
                        <ChartLine
                            style={{position:' absolute', top: '10px', left: '200px', textAlign: 'left', maxWidth: '160px',}}
                            chartStyle={{}}
                        /> :
                        null
                }
            </div>
        )
    }
}

export default Page