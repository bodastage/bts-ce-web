import React from 'react';
import { connect } from 'react-redux';
import jQuery from '../../utils/jquery';
import $ from 'jquery';
import layout from 'layout/dist/jquery.layout_and_plugins';
import 'layout/dist/layout-default.css'
import Header from './Header';
import Dashboard from '../dashboard/Dashboard';
import Tabs from './Tabs';
import * as UILayoutActions from './uilayout-actions';
import SidePanel from './SidePanel';
import  './UILayout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UILayout extends React.Component {
	constructor(props){
            super(props);
	}
	
        
	componentDidMount (){
            this.$el = $(this.el);

            $('#layout-container').layout({applyDemoStyles: true,
                north: {
                    maxSize: '51',
                    resizable: false,
                    size: '51',
                    onopen_end: function () {

                    },
                },
                south: {
                    initClosed: true,
                },
                west: {
                    size: '300',
                    resizable: true,
                    onresize_end: function () {

                    }
                },
                center: {
                    onresize_end: function () {
                    }
                }
            });
            

	}

        
	render(){
            return (
            <div id="layout-container">
                <div className="ui-layout-center">
                    <div id="ui_layout_center">
                        <Tabs activeTab={this.props.activeTab} tabs={this.props.tabs || []}/>
                    </div>
                </div>
                <div className="ui-layout-north">
                    <div id="ui_layout_north">
                        <Header/>
                    </div>
                </div>
                <div className="ui-layout-south">
                    <div id="ui_layout_south">
                    <span className="text-secondary">Copyright &copy; 2018. <a href="http://www.bodastage.com" target="_blank">Bodastage Solutions</a> </span>
                    </div>
                </div>
                <div className="ui-layout-west">
                    <div id="ui_layout_west"><SidePanel/></div>
                </div>
            </div>
            );
	}
}

function mapStateToProps(state) {
  return {
    tabs: state.uiLayout.tabs,
    activeTab: state.uiLayout.activeTab
  }
}

export default connect(mapStateToProps)(UILayout);