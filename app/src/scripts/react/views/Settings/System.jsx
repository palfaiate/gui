// System Settings
// ===============
// Display and Modify FreeNAS GUI and OS settings.

"use strict";

import React from "react";
import TWBS from "react-bootstrap";
import _ from "lodash";

import SM from "../../../flux/middleware/SystemMiddleware";
import SS from "../../../flux/stores/SystemStore";

const languageChoices =
  [ "English"
  , "Afrikaans"
  , "Azerbaijani"
  , "Belarusian"
  , "Bengali"
  , "Breton"
  , "Bosnian"
  , "Catalan"
  , "Czech"
  , "Welsh"
  , "Danish"
  , "German"
  , "Greek"
  , "British English"
  , "Esperanto"
  , "Spanish"
  , "Argentinian Spanish"
  , "Mexican Spanish"
  , "Nicaraguan Spanish"
  , "Venezuelan Spanish"
  , "Estonian"
  , "Basque"
  , "Persian"
  , "Finnish"
  , "French"
  , "Frisian"
  , "Irish"
  , "Galician"
  , "Hebrew"
  , "Hindi"
  , "Croatian"
  , "Hungarian"
  , "Interlingua"
  , "Indonesian"
  , "Icelandic"
  , "Italian"
  , "Japanese"
  , "Georgian"
  , "Kazach"
  , "Khmer"
  , "Kannada"
  , "Korean"
  , "Luxembourish"
  , "Lithuanian"
  , "Latvian"
  , "Macedonian"
  , "Malayan"
  , "Mongolian"
  , "Burmese"
  , "Norwegian Bokmal"
  , "Nepali"
  , "Dutch"
  , "Norwegian Nyorsk"
  , "Ossetic"
  , "Punjabi"
  , "Polish"
  , "Portuguese"
  , "Brazilian Portuguese"
  , "Romanian"
  , "Russian"
  , "Slovak"
  , "Slovenian"
  , "Albanian"
  , "Serbian"
  , "Serbian Latin"
  , "Swedish"
  , "Swahili"
  , "Tamil"
  , "Telugu"
  , "Thai"
  , "Turkish"
  , "Tatar"
  , "Udmurt"
  , "Urdu"
  , "Vietnamese"
  , "Simplified Chinese"
  , "Traditional Chinese"
  ]

function getSystemUIConfig () {
  return SS.systemUIConfig;
}

function createOptions ( optionsArray ) {
  var options =
    _.map( optionsArray
         , function mapOptions ( optionValue, index ) {
           return (
             <option
               value = { optionValue }
               key = { index }>
               { optionValue }
             </option>
             );
         }
         );
  return options;
}

// All settings in this panel are from system.advanced
const HardwareSettings = React.createClass(
  { getDefaultProps () {
    return { console_screensaver: null
           , serial_console: null
           , serial_port: null
           , serial_speed: null
           };
  }

  , render () {
    return (
      <TWBS.Panel>
        <h4>Hardware</h4>
      </TWBS.Panel>
    );
  }
});

const LocalizationSettings = React.createClass(
  { getDefaultProps () {
    return { language: "English"
           , timezone: "America/Los_Angeles"
           , console_keymap: "us.iso"
           };
  }

  , handleLocalizationChange( key, event ) {
    var language = "";
    var timezone = "";
    var console_keymap = "";

    switch ( key ) {
      case "language":
        this.setState( { language: event.target.value } );
        break;
      case "timezone":
        this.setState( { timezone: event.target.value } );
        break;
      case "console_keymap":
        this.setState( { console_keymap: event.target.value } );
        break;
    }
  }

  , render () {
    var language = null;
    var languageValue = this.props[ "language" ];
    var timezone = null;
    var timezoneValue = this.props[ "timezone" ];
    var console_keymap = null;
    var console_keymapValue = this.props[ "console_keymap" ];

    if ( _.has( this, [ "state", "language" ] ) ) {
      languageValue = this.state.language;
    }
    language =
      <TWBS.Input
        type = "select"
        label = "Language"
        value = { languageValue }
        onChange = { this.handleLocalizationChange.bind( this, "language" ) }>
        { createOptions( languageChoices ) }
      </TWBS.Input>;

    if ( _.has( this, [ "state", "timezone" ] ) ) {
      timezoneValue = this.state.language;
    }
    timezone =
      <TWBS.Input
        type = "select"
        label = "Timezone"
        value = { timezoneValue }
        onChange = { this.handleLocalizationChange.bind( this, "timezone" ) }>
      </TWBS.Input>;

    if ( _.has( this, [ "state", "console_keymap" ] ) ) {
      console_keymapValue = this.state.language;
    }
    console_keymap =
      <TWBS.Input
        type = "select"
        label = "Console Keymap"
        value = { console_keymapValue }
        onChange = { this.handleLocalizationChange.bind( this, "console" ) }>
      </TWBS.Input>

    return (
      <TWBS.Panel>
        <h4>Localization</h4>
        <form className = "settings-config-form">
          { language }
          { timezone }
          { console_keymap }
        </form>
      </TWBS.Panel>
    );
  }
});

// All settings in this panel are from system.advanced
const OSSettings = React.createClass(
  { getDefaultProps () {
    return { motd: ""
           , uploadcrash: null
           , swapondrive: null
           , powerd: null
           , console_cli: null
           , autotune: null
           };
  }

  , handleOSSettingsChange( key, event ) {
    var language = "";
    var timezone = "";
    var console_keymap = "";

    switch ( key ) {
      // FIXME: Wrong way to work with checkboxes
      case "autotune":
        this.setState( { autotune: event.target.value } );
        break;
      // FIXME: Wrong way to work with checkboxes
      case "console_cli":
        this.setState( { console_cli: event.target.value } );
        break;
      // FIXME: Wrong way to work with checkboxes
      case "powerd":
        this.setState( { powerd: event.target.value } );
        break;
      // FIXME: Wrong way to work with checkboxes
      case "uploadcrash":
        this.setState( { uploadcrash: event.target.value } );
        break;
      case "swapondrive":
        this.setState( { swapondrive: event.target.value } );
        break;
      case "motd":
        this.setState( { motd: event.target.value } );
        break;
    }
  }

  , render () {
    var autotune = null;
    var autotuneValue = this.props[ "autotune" ];
    var console_cli = null;
    var console_cliValue = this.props[ "console_cli" ];
    var powerd = null;
    var powerdValue = this.props[ "powerd" ];
    var uploadcrash = null;
    var uploadcrashValue = this.props[ "uploadcrash" ];
    var swapondrive = null;
    var swapondriveValue = this.props[ "swapondrive" ];
    var motd = null;
    var motdValue = this.props[ "motd" ];

    if (_.has( this, [ "state", "autotune" ] ) ) {
      autotuneValue = this.state[ "autotune" ];
    }
    autotune =
      <TWBS.Input
        type = "checkbox"
        label = "Enable Autotune"
        checked = { autotuneValue }
        onChange = { this.handleOSSettingsChange.bind( this, "autotune" ) }>
      </TWBS.Input>;

    if (_.has( this, [ "state", "console_cli" ] ) ) {
      console_cliValue = this.state[ "console_cli" ];
    }
    console_cli =
      <TWBS.Input
        type = "checkbox"
        label = "Enable Console CLI"
        checked = { console_cliValue }
        onChange = { this.handleOSSettingsChange.bind( this, "console_cli" ) }>
      </TWBS.Input>;

    if (_.has( this, [ "state", "powerd" ] ) ) {
      powerdValue = this.state[ "powerd" ];
    }
    powerd =
      <TWBS.Input
        type = "checkbox"
        label = "Enable powerd"
        checked = { powerdValue }
        onChange = { this.handleOSSettingsChange.bind( this, "powerd" ) }>
      </TWBS.Input>;

    if (_.has( this, [ "state", "uploadcrash" ] ) ) {
      uploadcrashValue = this.state[ "uploadcrash" ];
    }
    uploadcrash =
      <TWBS.Input
        type = "checkbox"
        label = "Automatically upload crash dumps to iXsystems"
        checked = { uploadcrashValue }
        onChange = { this.handleOSSettingsChange.bind( this, "uploadcrash" ) }>
      </TWBS.Input>;

    if (_.has( this, [ "state", "swapondrive" ] ) ) {
      swapondriveValue = this.state[ "swapondrive" ];
    }
    // Validate that it's an integer
    swapondrive =
      <TWBS.Input
        type = "text"
        label = "Default swap on drive, in GB"
        value = { swapondriveValue }
        onChange = { this.handleOSSettingsChange.bind( this, "swapondrive" ) }>
      </TWBS.Input>;

    if (_.has( this, [ "state", "motd" ] ) ) {
      motdValue = this.state[ "motd" ];
    }
    motd =
      <TWBS.Input
        type = "textarea"
        label = "Message of the Day to display at shell login"
        value = { motdValue }
        onChange = { this.handleOSSettingsChange.bind( this, "motd" ) }>
      </TWBS.Input>;


    return (
      <TWBS.Panel>
        <h4>Operating System </h4>
        <form className = "settings-config-form">
          { autotune }
          { console_cli }
          { swapondrive }
          { powerd }
          { uploadcrash }
          { motd }
        </form>
      </TWBS.Panel>
    );
  }
});

const Tuneables = React.createClass(
  { render () {
    return (
      <TWBS.Panel>
        <h4>Tuneables</h4>
      </TWBS.Panel>
    );
  }
});

const UISettings = React.createClass(
  { getDefaultProps () {
    return { webui_protocol: ""
           , webui_http_port: null
           , webui_http_redirect_https: null
           , webui_https_certificate: null
           , webui_listen: []
           , webui_https_port: null
           };
  }

  , handleUISettingsChange( key, event ) {
    switch ( key ) {
      case "webui_protocol":
        this.setState( { webui_protocol: event.target.value } );
        break;
      case "webui_http_port":
        this.setState( { webui_http_port: event.target.value } );
        break;
      case "webui_https_port":
        this.setState( { webui_https_port: event.target.value } );
        break;
      case "webui_https_certificate":
        this.setState( { webui_https_certificate: event.target.value } );
        break;
      // FIXME: Wrong way to work with checkboxes
      case "webui_http_redirect_https":
        this.setState( { webui_http_redirect_https: event.target.value } );
        break;
      case "webui_listen":
        this.setState( { webui_listen: event.target.value } );
        break;
    }
  }

  , render () {
    var webui_protocol = null;
    var webui_protocolValue = this.props[ "webui_protocol" ];
    var webui_http_port = null;
    var webui_http_redirect_httpsValue = this.props[ "webui_http_redirect_https" ];
    var webui_https_port = null;
    var webui_https_portValue = this.props[ "webui_https_port" ];
    var webui_https_certificate = null;
    var webui_https_certificateValue = this.props[ "webui_https_certificate" ];
    var webui_http_portValue = this.props[ "webui_http_port" ];
    var webui_http_redirect_https = null;
    var webui_listen = null;
    var webui_listenValue = this.props[ "webui_listen" ];

    if (_.has( this, [ "state", "webui_protocol" ] ) ) {
      webui_protocolValue = this.state[ "webui_protocol" ];
    }
    webui_protocol =
      <TWBS.Input
        type = "select"
        label = "Webapp Protocol"
        value = { webui_protocolValue }
        onChange = { this.handleUISettingsChange.bind( this, "webui_protocol" ) }>
      </TWBS.Input>;

    if (_.has( this, [ "state", "webui_http_port" ] ) ) {
      webui_http_portValue = this.state[ "webui_http_port" ];
    }
    // TODO: Check that it's an integer in the valid range
    webui_http_port =
      <TWBS.Input
        type = "text"
        label = "Webapp HTTP Port"
        value = { webui_http_portValue }
        onChange = { this.handleUISettingsChange.bind( this, "webui_http_port" ) }>
      </TWBS.Input>;

    if (_.has( this, [ "state", "webui_https_port" ] ) ) {
      webui_https_portValue = this.state[ "webui_https_port" ];
    }
    // TODO: Check that it's an integer in the valid range
    webui_https_port =
      <TWBS.Input
        type = "text"
        label = "Webapp HTTPS Port"
        value = { webui_https_portValue }
        onChange = { this.handleUISettingsChange.bind( this, "webui_https_port" ) }>
      </TWBS.Input>;

    if (_.has( this, [ "state", "webui_https_certificate" ] ) ) {
      webui_https_certificateValue = this.state[ "webui_https_certificate" ];
    }
    // Depends on certificat configuration
    webui_https_certificate =
      <TWBS.Input
        type = "select"
        label = "Webapp SSL/TLS Certificate"
        value = { webui_https_certificateValue }
        onChange = { this.handleUISettingsChange.bind( this, "webui_https_certificate" ) }
        disabled>
      </TWBS.Input>;

    if (_.has( this, [ "state", "webui_http_redirect_https" ] ) ) {
      webui_http_redirect_httpsValue = this.state[ "webui_http_redirect_https" ];
    }
    webui_http_redirect_https =
      <TWBS.Input
        type = "checkbox"
        label = "Redirect HTTP to HTTPS"
        checked = { webui_http_redirect_httpsValue }
        onChange = { this.handleUISettingsChange.bind( this, "webui_http_redirect_https" ) }>
      </TWBS.Input>;

    if (_.has( this, [ "state", "webui_listen" ] ) ) {
      webui_listenValue = this.state[ "webui_listen" ];
    }
    // Choose among available IPs
    webui_listen =
      <TWBS.Input
        type = "select"
        multiple
        label = "Webapp IP Addresses"
        value = { webui_listenValue }
        onChange = { this.handleUISettingsChange.bind( this, "webui_listen" ) }>
      </TWBS.Input>;

    return (
      <TWBS.Panel>
        <h4>Webapp</h4>
        <form className = "settings-config-form">
          { webui_protocol }
          { webui_http_port }
          { webui_https_port }
          { webui_https_certificate }
          { webui_http_redirect_https }
          { webui_listen }
        </form>
      </TWBS.Panel>
    );
  }
});

const System = React.createClass(
  { render () {
    return (
      <TWBS.Grid>
        <TWBS.Row>
          <TWBS.Col xs = {4}>
            <UISettings/>
          </TWBS.Col>
          <TWBS.Col xs = {4}>
            <OSSettings/>
          </TWBS.Col>
          <TWBS.Col xs = {4}>
            <LocalizationSettings/>
          </TWBS.Col>
        </TWBS.Row>
        <TWBS.Row>
          <TWBS.Col xs = {4}>
            <HardwareSettings/>
          </TWBS.Col>
          <TWBS.Col xs = {8}>
            <Tuneables/>
          </TWBS.Col>
        </TWBS.Row>
      </TWBS.Grid>
    );
  }
});

export default System;
