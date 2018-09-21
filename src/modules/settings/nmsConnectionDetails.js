import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setSidePanel } from '../layout/uilayout-actions';
import { Button, Intent, FormGroup, InputGroup, MenuItem, HTMLSelect } from "@blueprintjs/core";
import './nms-connection-details.css'
import {AgGridReact} from 'ag-grid-react';
import { Select } from "@blueprintjs/select";

class NMSConnectionDetails extends React.Component{
    static icon = "link";
    static label = "NMS Connection Details";
    constructor(props){
        super(props);
        
        this.state = {
            columnDefs: [
                {headerName: "Name", field: "name",  filter: "agTextColumnFilter"},
                {headerName: "Host", field: "host",  filter: "agTextColumnFilter"},
                {headerName: "Username", field: "username",  filter: "agTextColumnFilter"},
                {headerName: "Password", field: "password",  filter: "agTextColumnFilter"},
                {headerName: "Managed", field: "pk"}

            ],
            rowData: [
                {"name": "EricssonOSS1", "host": "192.168.0.23", "username": "leop", "password": "asdfasdfasd", "pk":1},
                {"name": "EricssonOSS2", "host": "192.168.0.24", "username": "leop", "password": "asdfasdfasd", "pk":2},
                {"name": "HuaweiU2000_1", "host": "192.168.0.44", "username": "leop", "password": "asdfasdfasd", "pk":3},
                {"name": "HuaweiU2000_1", "host": "192.168.0.45", "username": "leop", "password": "asdfasdfasd", "pk":4},
            ]
        }
        
        this.connectionTypes = [
            {label: "SSH", value: "ssh"},
            {label: "FTP", value: "ftp"},
            {label: "Telnet", value: "telnet"},
        ]
        
    }
    
    render(){
        return (
            <div>
                <h3><FontAwesomeIcon icon="link"/> NMS Connection Details</h3>
                <div className="card">
                    <div className="card-body p-3">
                    <div className="nms-connection-details mb-1">
                        <FormGroup
                            helperText="Label identifying the connection"
                            label="Name"
                            labelFor="connection_name"
                            labelInfo="(required)"
                            inline={true}
                        >
                            <InputGroup id="connection_name" placeholder="Connection name/label" />
                        </FormGroup>
                        
                        <FormGroup
                            label="Host"
                            labelFor="host_name"
                            labelInfo="(required)"
                            inline={true}
                        >
                            <InputGroup id="host_name" placeholder="Host name or IP" />
                        </FormGroup>
                        
                        
                        <FormGroup
                            label="Type"
                            labelFor="connection_type"
                            inline={true}
                        >
                            <HTMLSelect
                                options={this.connectionTypes}
                            />
                        </FormGroup>
                        
                        <FormGroup
                            label="Username"
                            labelFor="username"
                            labelInfo="(required)"
                            inline={true}
                        >
                            <InputGroup id="username" placeholder="Username" />
                        </FormGroup>
                        
                        <FormGroup
                            label="Password"
                            labelFor="password"
                            labelInfo="(required)"
                            inline={true}
                        >
                            <InputGroup id="username" placeholder="Password" />
                        </FormGroup>
                        
                        <Button type="submit" text="Add" intent={Intent.PRIMARY} /> &nbsp;
                        <Button text="Test connection" /> &nbsp;
                        </div>
                        <div
                            className="ag-theme-balham"
                            style={{width: '100%'}}
                        >
                            <AgGridReact
                                enableColResize={true}
                                gridAutoHeight={true}
                                columnDefs={this.state.columnDefs}
                                enableFilter={true}
                                enableSorting={true}
                                rowData={this.state.rowData}>
                            </AgGridReact>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(NMSConnectionDetails);