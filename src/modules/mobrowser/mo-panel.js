import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
import { setFilter, initializeMOBrowser, dismissMOsFetchError } from './mobrowser-actions';

class MOBrowserPanel extends React.Component{
    static icon = "puzzle-piece";
    static label = "";
    constructor(props){
        super(props);
        
        this.selectVendor = this.selectVendor.bind(this);
        this.selectTechnology = this.selectTechnology.bind(this);
        this.changeEvent = this.changeEvent.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.dismissError = this.dismissError.bind(this);
        
        
        this.text = this.props.filter.text;
        this.technology = this.props.filter.technology;
        this.vendor = this.props.filter.vendor;
    }
    
    componentDidMount(){
        this.props.dispatch(initializeMOBrowser());
    }
    
    updateFilter(){
        this.props.dispatch(setFilter(this.text, this.vendor, this.technology));
    }
    
    changeEvent(e){
        this.text = e.target.value;
        this.updateFilter();
    }
    
    selectVendor(e){
        this.vendor = e.target.value;
        this.updateFilter();
    }

    selectTechnology(e){
        this.technology = e.target.value;
        this.updateFilter();
    }
    
    dismissError(){
        this.props.dispatch(dismissMOsFetchError());
    }
    
    render(){
        const filterText = this.props.filter.text;
        
        return (
        <div>
            <h6><FontAwesomeIcon icon={MOBrowserPanel.icon}/> MO Browser</h6>

                <div>
                <input type="text" className="form-control form-control-sm mb-1" placeholder="Search MO" aria-label="Search MO" aria-describedby="search-mo" value={this.props.filter.text} onChange={this.changeEvent}/>

                <div className="row">
                    <div className="col-sm-4">Vendor</div>
                    <div className="col-sm-8">
                        <select className="form-control form-control-sm mb-1" value={this.props.filter.vendor} onChange={this.selectVendor} >
                            <option disabled>--Vendors--</option>
                            {this.props.vendors.map((v,k) => <option value={v} key={v}>{v}</option> )}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-4">Technologies</div>
                    <div className="col-sm-8">
                        <select className="form-control form-control-sm mb-1" value={this.props.filter.technology} onChange={this.selectTechnology} >
                            <option disabled>--Technologies--</option>
                            {this.props.technologies.map((v,k)  => <option value={v} key={v}>{v}</option> )}
                        </select>
                    </div>
                </div>

                {this.props.fetchingMOs === false ? '': 
                    <div className="pb-1">
                        <div className="progress">
                          <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: 100 +'%'}}>Loading...</div>
                        </div>
                    </div>        
                }

                {this.props.fetchError === null ? '': 
                    <div className="alert alert-danger" role="alert">
                        {this.props.fetchError}
                        <button type="button" className="close"  aria-label="Close" onClick={this.dismissError}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>     
                }

                    <Tree>
                    { this.props.mos[this.props.filter.vendor + '-' + this.props.filter.technology]
                        .filter(function(v,k){
                            var regex = new RegExp(filterText, 'i');
                            return filterText === '' || regex.test(v.name);
                        }).map( (v,k) => 
                         <TreeNode title={v.name} isLeaf icon={<FontAwesomeIcon className="mb-2" icon="file"/>} key={v.name}/>
                    )}
                    </Tree>
                </div>
        </div>
        );
    }
}

function mapStateToProps(state){
    return {
        vendors: state.mobrowser.vendors,
        technologies: state.mobrowser.technologies,
        filter: state.mobrowser.filter,
        mos: state.mobrowser.mos,
        fetchingMOs: state.mobrowser.fetchingMOs,
        fetchError: state.mobrowser.fetchError
    };
}

export default connect(mapStateToProps)(MOBrowserPanel);