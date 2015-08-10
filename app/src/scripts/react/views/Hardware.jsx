// Hardware Information
// ====================
// Displays information about system hardware

"use strict";

import React from "react";
import TWBS from "react-bootstrap";
import _ from "lodash";

import routerShim from "../mixins/routerShim";

import SM from "../../flux/middleware/SystemMiddleware";
import SS from "../../flux/stores/SystemStore";

import DM from "../../flux/middleware/DisksMiddleware";
import DS from "../../flux/stores/DisksStore"

import ByteCalc from "../../utility/ByteCalc";

import DiscTri from "../components/DiscTri";

import Disk from "../components/items/Disk";


function getSystemInformation () {
  return { systemInformation: SS.getSystemInfo( "hardware" ) };
}

function getDiskGroups () {
  return { diskGroups: DS.similarDisks };
}

const DiskDisclosure = React.createClass(
  { propTypes: { diskGroups: React.PropTypes.array.isRequired }

  , createDiskGroup: function ( group, index, groups ) {

    // The groups are objects of only one key, which is the name to use to
    // select the array of disks and the title to display for the section. This
    // selects that key.
    var description = _.keys( groups[ index ] )[0];

    var diskItems = _.map( group[ description ]
                         , function createDiskItems ( disk, index ) {
                           return (
                             <TWBS.Col xs = { 3 }
                                       key = { index } >
                               <TWBS.Panel>
                                 <Disk path = { disk } />
                               </TWBS.Panel>
                              </TWBS.Col>
                           );
                         }
                         );

    return (
      <TWBS.Col xs = {12}
                key = { index } >
        <span className = "type-line">{ description }</span>
        <TWBS.Well>
          <TWBS.Grid fluid >
            <TWBS.Row>
              { diskItems }
            </TWBS.Row>
          </TWBS.Grid>
        </TWBS.Well>
      </TWBS.Col>
    );
  }

  , render: function () {

    var diskGroups = _.map( this.props.diskGroups
                          , this.createDiskGroup
                          );

    return (
      <DiscTri headerShow = { "Disk Information" }
               headerHide = { "Disk Information" }
               defaultExpanded = { true }
               style = { { "overflow-y": "auto" } }>
        <TWBS.Grid fluid >
          <TWBS.Row>
            { diskGroups }
          </TWBS.Row>
        </TWBS.Grid>
      </DiscTri>
    );
  }
  }
);

const Hardware = React.createClass({

  displayName: "Hardware"

  , mixins: [ routerShim ]

  , getInitialState: function () {
    return _.merge( getSystemInformation()
                  , getDiskGroups()
                  );
  }

  , componentDidMount: function () {
    DS.addChangeListener( this.handleDisksChange )
    DM.requestDisksOverview();
    DM.subscribe( this.constructor.displayName );

    SS.addChangeListener( this.handleHardwareChange );
    SM.requestSystemInfo( "hardware" );
    SM.subscribe( this.constructor.displayName );
  }

  , componentWillUnmount: function () {

    DM.unsubscribe( this.constructor.displayName );

    SS.removeChangeListener( this.handleHardwareChange );
    SM.unsubscribe( this.constructor.displayName );
  }

  // For now, just
  , handleDisksChange: function () {
    this.setState( getDiskGroups() );
  }

  , handleHardwareChange: function () {
    this.setState( getSystemInformation() );
  }

  , render: function () {

    let cpuModel = this.state.systemInformation
                  ? this.state.systemInformation[ "cpu_model" ]
                  : null;

    let cpuCores = this.state.systemInformation
                  ? this.state.systemInformation[ "cpu_cores" ]
                  : null;

    let memorySize = this.state.systemInformation
                    ? this.state.systemInformation[ "memory_size" ]
                    : null;

    return (
      <div className = { "hardware-display" }>
        <div className ={ "statics" }>
          <TWBS.Panel header = "System Information" /*TODO: split panel out into its own component when appropriate*/ >
            <TWBS.ListGroup fill>
              <TWBS.ListGroupItem>
                { "CPU: " + cpuModel }
              </TWBS.ListGroupItem>
              <TWBS.ListGroupItem>
                { "CPU Cores: " + cpuCores }
              </TWBS.ListGroupItem>
              <TWBS.ListGroupItem>
                { "Memory: " + ByteCalc.humanize( memorySize ) }
              </TWBS.ListGroupItem>
            </TWBS.ListGroup>
          </TWBS.Panel>
        </div>
        <div className = { "disclosures" } >
          <DiskDisclosure diskGroups = { this.state.diskGroups } />
        </div>
      </div>
    );
  }

});


export default Hardware;
