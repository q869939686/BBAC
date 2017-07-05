import * as React from 'react';
import rendererDomElement from '@/three';
class Page extends React.Component {
    componentDidMount () {
        this.refs.threeContainer.appendChild(rendererDomElement)
    }
    render () {
        return (
            <div ref="threeContainer">
                page
            </div>
        )
    }
}

export default Page