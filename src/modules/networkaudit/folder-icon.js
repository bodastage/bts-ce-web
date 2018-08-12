import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function FolderIcon (props){
    
    if( props.expanded === true ){
        return (
            <FontAwesomeIcon className="mb-2" icon="folder-open"/>
        );
    }
    return (
        <FontAwesomeIcon className="mb-2" icon="folder"/>
    );
}