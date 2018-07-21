import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import jQuery from '../../utils/jquery';
import $ from 'jquery';
import layout from 'layout/dist/jquery.layout_and_plugins';
import LayoutCSS from 'layout/dist/layout-default.css'
import UILayoutCSS from './UILayout.css';
import Header from './header.js';
import Popper from 'popper.js';
import Bootsrap from 'bootstrap/dist/js/bootstrap.js';
import Dashboard from '../dashboard/dashboard';
import Tabs from './tabs';
import * as UILayoutActions from './uilayout-actions';
import SidePanel from './side-panel';

class UILayout extends React.Component {
	constructor(props){
            super(props);
            
            console.log("UILayout");
            console.log(props);
	}
	
        
	componentDidMount (){
            this.$el = $(this.el);
		
            $('#layout-container').layout({applyDemoStyles: true,
                north: {
                    maxSize: '50',
                    resizable: false,
                    size: '50',
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
            
            
             
            console.log("UILayout.componentDidMount");
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
                    <span className="text-secondary">Copyright &copy 2018. Bodastage Solutions </span>
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
    console.log("UILayout.mapStateToProps")
    console.log(state)
  return {
    tabs: state.uiLayoutReducer.tabs,
    activeTab: state.uiLayoutReducer.activeTab
  }
}

export default connect(mapStateToProps)(UILayout);