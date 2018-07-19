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

class UILayout extends React.Component {
	constructor(props){
            super(props);
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
            
	}
	
	render(){
            return (
            <div id="layout-container">
                <div className="ui-layout-center">
                    <div id="ui_layout_center">
                        <Tabs tabs={['Dashboard', 'Help']}/>
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
                    <div id="ui_layout_west">
                    </div>
                </div>
            </div>
            );
	}
}

function mapStateToProps(state, ownProps) {
  return {
    tabs: state.tabs
  }
}

export default connect(mapStateToProps)(UILayout);