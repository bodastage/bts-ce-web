import React from 'react'
import jQuery from '../../utils/jquery';
import $ from 'jquery';
import layout from 'layout/dist/jquery.layout_and_plugins';
import LayoutCSS from 'layout/dist/layout-default.css'
import UILayoutCSS from './UILayout.css';

export default class UILayout extends React.Component {
	constructor(props){
            super(props);
	}
	
	componentDidMount(){
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
                    <div className="ui-layout-center"></div>
                    <div className="ui-layout-north"></div>
                    <div className="ui-layout-south"></div>
                    <div className="ui-layout-west"></div>
                </div>
		);
	}
}