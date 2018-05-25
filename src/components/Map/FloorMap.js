import * as _ from 'lodash';
import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import { withApollo } from 'react-apollo';

import './FloorMap.css';

const onTempChanged = gql`
  subscription onTempChanged {
    roomTempChanged {
      coreId: coreid
      data {
        temp: dhtTemperature
      }
    }
  }
`;

const onSpeakerStatusChange = gql`
  subscription onSpeakerStatusChange {
    speakerStatusChanged(roomId: 0) {
      coreId: coreid
      data
    }
  }
`;

const getDeviceDetails = devices => room =>
  devices[_.findIndex(devices, item => item.roomName.toUpperCase() === room.toUpperCase())];

class FloorMap extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      devices: this.props.devices,
    };
  }

  componentDidMount() {
    const apolloClient = this.props.client;

    apolloClient
      .subscribe({ query: onTempChanged })
      .subscribe(this.updateOnTempChanged.bind(this));

    apolloClient
      .subscribe({ query: onSpeakerStatusChange })
      .subscribe(this.updateSpeakerStatusChanged.bind(this));
  }

  getTemp(roomName) {
    const device = getDeviceDetails(this.state.devices)(roomName);

    if (device && this.state.temps) {
      return this.state.temps[device.coreId]
        ? Number.parseFloat(this.state.temps[device.coreId]).toFixed(2)
        : null;
    }

    return null;
  }

  getFloorFill(roomName) {
    const defaultColor = '#FFFFFF';
    const errorColor = '#B42E2E';

    const device = getDeviceDetails(this.state.devices)(roomName);

    if (device && this.state.roomStatus && this.state.roomStatus[device.coreId]) {
      return this.state.roomStatus[device.coreId] === 'RED'
        ? errorColor
        : defaultColor;
    }

    return defaultColor;
  }

  handleClick(room, event) {
    // event.preventDefault(); ?? do we need to stop the default?
    console.log('handling...', room);

    // todo: call that api to ack the room
  }

  updateOnTempChanged(data) {
    const updatedTemps = {
      ...this.state.temps,
      [data.data.roomTempChanged.coreId]: data.data.roomTempChanged.data.temp,
    };

    this.setState({
      ...this.state,
      temps: updatedTemps,
    });
  }

  updateSpeakerStatusChanged(data) {
    const updatedStatus = {
      ...this.state.roomStatus,
      [data.data.speakerStatusChanged.coreId]: data.data.speakerStatusChanged.data,
    };

    this.setState({
      ...this.state,
      roomStatus: updatedStatus,
    });
  }

  render() {
    return (
      <svg width="1302px" height="1552px" viewBox="0 0 1302 1552">
        <title>Kalahari THAT Conference Map</title>
        <desc>Map of the Kalahari conference center</desc>
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Kalahari-TC-Map">
            <g id="Hallways" transform="translate(39.000000, 9.000000)" fill="#D8D8D8">
              <path d="M965,779 L965,1193 L963,1193 L963,1229 L596,1229 L596,1403 L706,1403 L706,1440 L0,1440 L0,1403 L513,1403 L513,882 L494,882 L494,631 L471,631 L471,96 L594,96 L594,600 L919,600 L919,0 L979,0 L979,583 L1259,583 L1259,662 L987,662 L987,778 L979,778 L979,779 L965,779 Z M920,779 L919,779 L919,647 L594,647 L594,879 L596,879 L596,1189 L920,1189 L920,779 Z" id="Combined-Shape" />
            </g>
            <g id="Walls" transform="translate(39.000000, 9.000000)" fill="#000000">
              <rect id="Ironwood-Walls" x="364" y="1440" width="160" height="55" />
              <path d="M709,1453 L727,1453 L727,1531 L550,1531 L550,1453 L550,1440 L709,1440 L709,1453 Z" id="Banyan-Walls" />
              <path d="M597,1229 L792,1229 L792,1341 L596,1341 L596,1319 L580,1319 L580,1229 L597,1229 Z" id="Cypress-Walls" />
              <rect id="Rectangle-13" x="594" y="646" width="326" height="545" />
              <rect id="Rectangle-8" x="963" y="777" width="134" height="412" />
              <rect id="Rectangle" x="976" y="89" width="128" height="511" />
              <rect id="Rectangle-34" x="0" y="1295" width="522" height="109" />
              <path d="M967,1229 L967,1233 L787,1233 L787,1229 L963,1229 L963,1189 L967,1189 L967,1229 Z" id="Combined-Shape" />
              <rect id="Rectangle-48" x="524" y="1440" width="27" height="4" />
              <rect id="Rectangle-49" x="705" y="1399" width="4" height="42" />
              <rect id="Rectangle-50" x="682" y="1399" width="27" height="4" />
              <rect id="Rectangle-51" x="678" y="1340" width="4" height="63" />
              <rect id="Rectangle-52" x="0" y="1440" width="364" height="4" />
              <rect id="Rectangle-59" x="509" y="1231" width="4" height="64" />
              <rect id="Rectangle-61" x="490" y="882" width="19" height="4" />
              <rect id="Rectangle-62" x="490" y="802" width="4" height="80" />
              <rect id="Rectangle-63" x="490" y="631" width="4" height="83" />
              <rect id="Rectangle-65" x="467" y="92" width="4" height="539" />
              <rect id="Rectangle-66" x="471" y="92" width="40" height="4" />
              <rect id="Rectangle-60" x="509" y="882" width="4" height="303" />
              <rect id="Rectangle-64" x="467" y="631" width="23" height="4" />
              <rect id="Rectangle-57" x="922" y="0" width="58" height="4" />
              <rect id="Rectangle-58" x="976" y="4" width="4" height="85" />
              <rect id="Rectangle-67" x="1104" y="579" width="155" height="4" />
              <path d="M1103,655 L1103,778 L984,778 L984,655 L1005,655 L1005,647 L1044,647 L1044,655 L1062,655 L1062,647 L1103,647 L1103,655 Z" id="Empress-and-Ebony" />
            </g>
            <g id="Mess-Hall-and-Keynotes" transform="translate(633.000000, 9.000000)">
              <rect id="Mess-Hall-Walls" fill="#000000" x="0" y="0" width="328" height="600" />
              <path d="M324,330 L324,446 L328,446 L328,481 L324,481 L324,596 L4,596 L4,481 L0,481 L0,445 L4,445 L4,331 L0,331 L0,293 L4,293 L4,180 L0,180 L0,142 L4,142 L4,4 L324,4 L324,146 L328,146 L328,181 L324,181 L324,295 L328,295 L328,330 L324,330 Z" id="Combined-Shape" fill="#FFFFFF" />
              <text id="Keynotes" fontFamily="Arial-BoldMT, Arial" fontSize="24" fontWeight="bold" fill="#000000">
                <tspan x="109.982422" y="103">Keynotes</tspan>
              </text>
              <text id="Mess-Hall" fontFamily="Arial-BoldMT, Arial" fontSize="24" fontWeight="bold" fill="#000000">
                <tspan x="108.640625" y="343">Mess Hall</tspan>
              </text>
            </g>
            <g id="Open-Spaces-Room" transform="translate(633.000000, 659.000000)">
              <g id="H-Room" transform="translate(163.000000, 0.000000)" fill="#FFFFFF">
                <path d="M159,85 L163,85 L163,107 L159,107 L159,168 L0,168 L0,0 L159,0 L159,85 Z" id="H-Floor" />
              </g>
              <g id="A-Room" fill="#FFFFFF">
                <path d="M5,84 L0,84 L0,63 L5,63 L5,0 L164,0 L164,168 L5,168 L5,84 Z" id="A-Floor" />
              </g>
              <g id="G-Room" transform="translate(154.000000, 160.000000)" fill="#FFFFFF">
                <path d="M167.7,36.3277311 L172,36.3277311 L172,59.4453782 L167.7,59.4453782 L167.7,131 L0,131 L0,0 L167.7,0 L167.7,36.3277311 Z" id="G-Floor" />
              </g>
              <g id="B-Room" transform="translate(0.000000, 160.000000)" fill="#FFFFFF">
                <path d="M5.0621118,59.4453782 L0,59.4453782 L0,36.3277311 L5.0621118,36.3277311 L5.0621118,0 L163,0 L163,131 L5.0621118,131 L5.0621118,59.4453782 Z" />
              </g>
              <text id="Open-Spaces" fontFamily="Arial-BoldMT, Arial" fontSize="24" fontWeight="bold" fill="#000000">
                <tspan x="87.96875" y="155">Open Spaces</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('empress', e)} >
              <path d="M1047,667 L1047,659 L1080,659 L1080,667 L1080,783 L1026,783 L1026,667 L1047,667 Z" id="Empress-Floor" fill={this.getFloorFill('empress')} />
              <text id="Empress-Name" transform="translate(1052.500000, 725.000000) rotate(-90.000000) translate(-1052.500000, -725.000000) " fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1016.59082" y="730.5">Empress</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('ebony', e)} >
              <path d="M1105,667 L1105,659 L1138,659 L1138,667 L1138,783 L1084,783 L1084,667 L1105,667 Z" id="Ebony-Floor" fill={this.getFloorFill('ebony')} />
              <text id="Ebony-Name" transform="translate(1111.500000, 728.500000) rotate(-90.000000) translate(-1111.500000, -728.500000) " fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1085.52686" y="734">Ebony</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('CrownPalm', e)} >
              <path d="M463,1409 L409,1409 L409,1307 L558,1307 L558,1409 L484,1409 L484,1414 L463,1414 L463,1409 Z" id="CrownPalm-Floor" fill={this.getFloorFill('CrownPalm')} />
              <text id="CrownPalm-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="463.214844" y="1379">{this.getTemp('CrownPalm')}</tspan>
              </text>
              <text id="CrownPalm-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="434.380127" y="1354">Crown Palm</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Acacia', e)} >
              <path d="M130,1408.65 L130,1414 L109,1414 L109,1408.65 L44,1408.65 L44,1307 L203,1307 L203,1408.65 L130,1408.65 Z" id="Acacia-Floor" fill={this.getFloorFill('Acacia')} />
              <text id="Acacia-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="103.214844" y="1380">{this.getTemp('Acacia')}</tspan>
              </text>
              <text id="Acacia-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="96.0908203" y="1355">Acacia</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Bamboo', e)} >
              <path d="M308,1409 L308,1414 L287,1414 L287,1409 L207,1409 L207,1307 L405,1307 L405,1409 L308,1409 Z" id="Bamboo-Floor" fill={this.getFloorFill('Bamboo')} />
              <text id="Bamboo-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="284.214844" y="1380">{this.getTemp('Bamboo')}</tspan>
              </text>
              <text id="Bamboo-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="273.5" y="1355">Bamboo</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Banyan', e)} >
              <path d="M617,1453 L744,1453 L744,1466 L762,1466 L762,1536 L593,1536 L593,1466 L593,1453 L596,1453 L596,1449 L617,1449 L617,1453 Z" id="Banyan-Floor" fill={this.getFloorFill('Banyan')} />
              <text id="Banyan-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="657.214844" y="1515">{this.getTemp('Banyan')}</tspan>
              </text>
              <text id="Banyan-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="648.79541" y="1490">Banyan</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Ironwood', e)} >
              <path d="M533,1453 L533,1449 L554,1449 L554,1453 L559,1453 L559,1500 L407,1500 L407,1453 L533,1453 Z" id="Ironwood-Floor" fill={this.getFloorFill('Ironwood')} />
              <text id="Ironwood-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="463.214844" y="1494">{this.getTemp('Ironwood')}</tspan>
              </text>
              <text id="Ironwood-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="445.258301" y="1473">Ironwood</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Cypress', e)} >
              <path d="M638,1242 L827,1242 L827,1346 L638,1346 L638,1324 L623,1324 L623,1242 L638,1242 Z" id="Cypress-Floor" fill={this.getFloorFill('Cypress')} />
              <text id="Cypress-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="709.714844" y="1310">{this.getTemp('Cypress')}</tspan>
              </text>
              <text id="Cypress-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="697.452393" y="1285">Cypress</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('F', e)} >
              <path d="M955,986 L959,986 L959,1007 L955,1007 L955,1073 L799,1073 L799,954 L955,954 L955,986 Z" id="F-Floor" fill={this.getFloorFill('F')} />
              <text id="F-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="857.714844" y="1043">{this.getTemp('F')}</tspan>
              </text>
              <text id="F-Name" fontFamily="Arial-BoldMT, Arial" fontSize="24" fontWeight="bold" fill="#000000">
                <tspan x="868.169922" y="1012">F</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('E', e)} >
              <path d="M955,1109 L959,1109 L959,1130 L955,1130 L955,1196 L799,1196 L799,1077 L955,1077 L955,1109 Z" id="E-Floor" fill={this.getFloorFill('E')} />
              <text id="E-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="855.214844" y="1160">{this.getTemp('E')}</tspan>
              </text>
              <text id="E-Name" fontFamily="Arial-BoldMT, Arial" fontSize="24" fontWeight="bold" fill="#000000">
                <tspan x="867.496094" y="1132">E</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('D', e)} >
              <path d="M638,1130 L633,1130 L633,1109 L638,1109 L638,1077 L794,1077 L794,1196 L638,1196 L638,1130 Z" id="D-Floor" fill={this.getFloorFill('D')} />
              <text id="D-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="695.214844" y="1160">{this.getTemp('D')}</tspan>
              </text>
              <text id="D-Name" fontFamily="Arial-BoldMT, Arial" fontSize="24" fontWeight="bold" fill="#000000">
                <tspan x="706.833984" y="1132">D</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('C', e)} >
              <path d="M638,1007 L633,1007 L633,986 L638,986 L638,954 L794,954 L794,1073 L638,1073 L638,1007 Z" id="C-Floor" fill={this.getFloorFill('C')} />
              <text id="C-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="695.714844" y="1040">{this.getTemp('C')}</tspan>
              </text>
              <text id="C-Name" fontFamily="Arial-BoldMT, Arial" fontSize="24" fontWeight="bold" fill="#000000">
                <tspan x="706.833984" y="1012">C</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Wisteria', e)} >
              <path d="M1006,1159 L1006,1096 L1132,1096 L1132,1194 L1006,1194 L1006,1180 L1002,1180 L1002,1159 L1006,1159 Z" id="Wisteria-Floor" fill={this.getFloorFill('Wisteria')} />
              <text id="Wisteria-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="1047.71484" y="1163">{this.getTemp('Wisteria')}</tspan>
              </text>
              <text id="Wisteria-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1036.00854" y="1135">Wisteria</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Portia', e)} >
              <path d="M1006,1031 L1006,994 L1132,994 L1132,1092 L1006,1092 L1006,1052 L1002,1052 L1002,1031 L1006,1031 Z" id="Portia-Floor" fill={this.getFloorFill('Portia')} />
              <text id="Portia-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="1048.21484" y="1062">{this.getTemp('Portia')}</tspan>
              </text>
              <text id="Portia-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1044.91113" y="1035">Portia</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Tamarind', e)} >
              <path d="M1006,921 L1002,921 L1002,900 L1006,900 L1006,892 L1132,892 L1132,990 L1006,990 L1006,921 Z" id="Tamarind-Floor" fill={this.getFloorFill('Tamarind')} />
              <text id="Tamarind-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="1048.21484" y="962">{this.getTemp('Tamarind')}</tspan>
              </text>
              <text id="Tamarind-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1031.37256" y="935">Tamarind</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Guava', e)} >
              <path d="M1006,883 L1002,883 L1002,862 L1006,862 L1006,790 L1132,790 L1132,888 L1006,888 L1006,883 Z" id="Guava-Floor" fill={this.getFloorFill('Guava')} />
              <text id="Guava-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="1048.21484" y="862">{this.getTemp('Guava')}</tspan>
              </text>
              <text id="Guava-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1043.0144" y="835">Guava</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Mangrove', e)} >
              <path d="M1020,564.373626 L1015,564.373626 L1015,543.494505 L1020,543.494505 L1020,508 L1139,508 L1139,603 L1020,603 L1020,564.373626 Z" id="Mangrove-Floor" fill={this.getFloorFill('Mangrove')} />
              <text id="Mangrove-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="1058.71484" y="577">{this.getTemp('Mangrove')}</tspan>
              </text>
              <text id="Mangrove-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1039.85327" y="550">Mangrove</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Aralia', e)} >
              <path d="M1020,461.285714 L1015,461.285714 L1015,438.318681 L1020,438.318681 L1020,407 L1139,407 L1139,502 L1020,502 L1020,461.285714 Z" id="Aralia-Floor" fill={this.getFloorFill('Aralia')} />
              <text id="Aralia-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="1058.71484" y="477">{this.getTemp('Aralia')}</tspan>
              </text>
              <text id="Aralia-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1056.37598" y="450">Aralia</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Marula', e)} >
              <path d="M1020,359.241758 L1015,359.241758 L1015,337.318681 L1020,337.318681 L1020,306 L1139,306 L1139,401 L1020,401 L1020,359.241758 Z" id="Marula-Floor" fill={this.getFloorFill('Marula')} />
              <text id="Marula-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="1058.71484" y="377">{this.getTemp('Marula')}</tspan>
              </text>
              <text id="Marula-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1052.60327" y="350">Marula</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Aloeswood', e)} >
              <path d="M1020,257.197802 L1015,257.197802 L1015,235.274725 L1020,235.274725 L1020,205 L1139,205 L1139,300 L1020,300 L1020,257.197802 Z" id="Aloeswood-Floor" fill={this.getFloorFill('Aloeswood')} />
              <text id="Aloeswood-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="1058.71484" y="277">{this.getTemp('Aloeswood')}</tspan>
              </text>
              <text id="Aloeswood-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1034.66528" y="250">Aloeswood</tspan>
              </text>
            </g>

            <g onClick={e => this.handleClick('Tamboti', e)} >
              <path d="M1020,155.153846 L1015,155.153846 L1015,133.230769 L1020,133.230769 L1020,104 L1139,104 L1139,199 L1020,199 L1020,155.153846 Z" id="Tamboti-Floor" fill={this.getFloorFill('Tamboti')} />
              <text id="Tamboti-Temp" fontFamily="ArialMT, Arial" fontSize="17" fontWeight="normal" fill="#000000">
                <tspan x="1058.71484" y="177">{this.getTemp('Tamboti')}</tspan>
              </text>
              <text id="Tamboti-Name" fontFamily="Arial-BoldMT, Arial" fontSize="17" fontWeight="bold" fill="#000000">
                <tspan x="1047.57715" y="150">Tamboti</tspan>
              </text>
            </g>
          </g>
        </g>
      </svg>
    );
  }

}

FloorMap.propTypes = {
  devices: PropTypes.array.isRequired,
};

export default withApollo(FloorMap);
