import * as actions from '../../src/modules/networkbrowser/network-browser-actions'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import moxios from 'moxios'
import sinon from 'sinon'
import jest from 'jest'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const userDetails = {
    first_name:"Emmanuel",
    id:1,
    job_title:"Engineer",
    last_name:"Ssebaggala",
    other_names:"Robert",
    password:"password",
    phone_number:"+256772121988",
    photo:"btsuser@bodastage.org",
    token:"MTIzNDU2Nzg5MTIzNDU2Nzg5",
    username:"btsuser@bodastage.org"
};

describe('networkbrowser.actions', () => {
    it('should create an action to request network elements', () => {
        const entity = 'site';
        const expectedAction = {
          type: actions.REQUEST_NODES,
          entity: entity
        }
        expect(actions.requestNodes(entity)).toEqual(expectedAction)
    })
    
    it('should create an action to dismiss network element request error', () => {
        const entity = 'site';
        const expectedAction = {
          type: actions.DISMISS_NODES_REQUEST_ERROR,
          entity: entity
        }
        expect(actions.dismissRequestError(entity)).toEqual(expectedAction)
    })
    
    it('should create an action to receive network elements', () => {
        const entity = 'site';
        const data = [];
        const expectedAction = {
          type: actions.RECEIVE_NODES,
          entity: entity,
          data
        }
        expect(actions.receiveNodes(entity, data)).toEqual(expectedAction)
    })
    
    it('should create an action to receive network elements fields', () => {
        const entity = 'site';
        const fields = ['pk'];
        
        const expectedAction = {
          type: actions.RECEIVE_NODES_FIELDS,
          entity: entity,
          fields: fields
        }
        expect(actions.receiveNodeFields(entity, fields)).toEqual(expectedAction)
    })
    
    it('should create an action to nofity the system of a network element request failure', () => {
        const entity = 'site';
        const errorMessage = "Failed to request fields";
        
        const expectedAction = {
          type: actions.NOTIFY_NODE_REQUEST_FAILURE,
          entity: entity,
          error: errorMessage
        }
        expect(actions.notifyNodesRequestFailure(entity, errorMessage)).toEqual(expectedAction)
    })
    
    
    it('should create an action to add a node to the expanded live node list', () => {
        const nodeId = 'mscs';
        
        const expectedAction = {
          type: actions.ADD_TO_EXPANDED_LIVE_NODES,
          nodeId: nodeId
        }
        expect(actions.addToExpandedLiveNodes(nodeId)).toEqual(expectedAction)
    })
    
    it('should create an action to from a node from the expanded live node list', () => {
        const nodeId = 'mscs';
        
        const expectedAction = {
          type: actions.REMOVE_FROM_EXPANDED_LIVE_NODES,
          nodeId: nodeId
        }
        expect(actions.removeFromExpandedLiveNodes(nodeId)).toEqual(expectedAction)
    })
    
    it('should create an action to add a node to the expanded plan node list', () => {
        const nodeId = 'mscs';
        
        const expectedAction = {
          type: actions.ADD_TO_EXPANDED_PLAN_NODES,
          nodeId: nodeId
        }
        expect(actions.addToExpandedPlanNodes(nodeId)).toEqual(expectedAction)
    })
    
    it('should create an action to from a node from the expanded plan node list', () => {
        const nodeId = 'mscs';
        
        const expectedAction = {
          type: actions.REMOVE_FROM_EXPANDED_PLAN_NODES,
          nodeId: nodeId
        }
        expect(actions.removeFromExpandedPlanNodes(nodeId)).toEqual(expectedAction)
    })
    
    it('should create an action to request live network tree data', () => {
        const expectedAction = {
          type: actions.REQUEST_LIVE_NETWORK_TREE_DATA
        }
        expect(actions.requestLiveNetworkTreeData()).toEqual(expectedAction)
    })
    
    it('should create an action to stop requesting live network tree data', () => {
        const expectedAction = {
          type: actions.STOP_REQUESTING_LIVE_NETWORK_TREE_DATA
        }
        expect(actions.stopRequestingLiveNetworkTreeData()).toEqual(expectedAction)
    })
    
    it('should create an action to notify failure in requesting live network tree data', () => {
        const expectedAction = {
          type: actions.NOTIFY_LIVE_NET_TREE_DATA_REQ_FAILURE
        }
        expect(actions.notifyTreeDataRequestFailure()).toEqual(expectedAction)
    })
    
    it('should create an action to receive the live network tree data', () => {
        const entityType = 'rnc';
        const data = [];
        const expectedAction = {
          type: actions.RECEIVE_LIVE_NETWORK_TREE_DATA,
          entityType: entityType,
          data: data
        }
        expect(actions.receiveLiveNetworkTreeData(data, entityType)).toEqual(expectedAction)
    })
    
    it('should create an action to request cell parameter data', () => {
        const cellId = 1;
        const expectedAction = {
          type: actions.REQUEST_CELL_PARAMETERS,
          cellId: cellId
        }
        expect(actions.requestCellParameters(cellId)).toEqual(expectedAction)
    })
    
    it('should create an action to receive cell parameter data', () => {
        const cellId = 1;
        const data = [];
        const expectedAction = {
          type: actions.RECEIVE_CELL_PARAMETERS,
          cellId: cellId,
          data: data
        }
        expect(actions.receiveCellParameters(cellId, data)).toEqual(expectedAction)
    })
});

describe('networkbrowser.actions.async', () => {
    beforeEach(function () {
//      jest.setTimeout(10000);
//      jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000
      moxios.install()
    })
    
    afterEach(function () {
      moxios.uninstall()
    })
    
    test('should get entity fields', (done) => {
        const entity = 'site';
        const fields =  ["id", "name", "node", "technology", "vendor", "date_added"];
        
        const store = mockStore({session: {userDetails: userDetails}})
        
        const expectedActions = [{
                type: actions.REQUEST_NODES,
                entity: entity
            },{
                type: actions.RECEIVE_NODES_FIELDS,
                entity: entity,
                fields: fields
            }
        ];

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            
            request.respondWith({
                status: 200,
                response: fields
            }) 
        })
        
        return store.dispatch(actions.getEntityFields(entity)).then(() => {
                const actions = store.getActions();
                expect(actions).toEqual(expectedActions) 
                done()
        });
        
    })
    
    it('should get entity data', (done) => {
        const entity = 'site';
        const page = 1;
        const length = 1;
        const data = [];
        
        const store = mockStore({session: {userDetails: userDetails}})
        
        const expectedActions = [{
                type: actions.REQUEST_NODES,
                entity: entity
            },{
                type: actions.RECEIVE_NODES,
                entity: entity,
                data
          }
        ];
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            
            request.respondWith({
                status: 200,
                response: data
            }) 
        })
        
        return store.dispatch(actions.getEntities(entity, page, length))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0]).toEqual(expectedActions[0]) 
                expect(actions[1].type).toEqual(expectedActions[1].type) 
                
                done()
        });
    })
    
});