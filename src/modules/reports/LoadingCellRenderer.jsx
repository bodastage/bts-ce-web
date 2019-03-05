import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LoadingCellRenderer extends Component {
    render() {
        return (
            <div className="ag-custom-loading-cell" style={{paddingLeft: '10px', lineHeight: '25px'}}>
                <FontAwesomeIcon icon="spinner" pulse/> <span> {this.props.loadingMessage}</span>
        </div>
        );
    }
}