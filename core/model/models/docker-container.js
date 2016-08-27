var AbstractModel = require("core/model/abstract-model").AbstractModel;

exports.DockerContainer = AbstractModel.specialize({
    _command: {
        value: null
    },
    command: {
        set: function (value) {
            if (this._command !== value) {
                this._command = value;
            }
        },
        get: function () {
            return this._command;
        }
    },
    _environment: {
        value: null
    },
    environment: {
        set: function (value) {
            if (this._environment !== value) {
                this._environment = value;
            }
        },
        get: function () {
            return this._environment;
        }
    },
    _expose_ports: {
        value: null
    },
    expose_ports: {
        set: function (value) {
            if (this._expose_ports !== value) {
                this._expose_ports = value;
            }
        },
        get: function () {
            return this._expose_ports;
        }
    },
    _host: {
        value: null
    },
    host: {
        set: function (value) {
            if (this._host !== value) {
                this._host = value;
            }
        },
        get: function () {
            return this._host;
        }
    },
    _hostname: {
        value: null
    },
    hostname: {
        set: function (value) {
            if (this._hostname !== value) {
                this._hostname = value;
            }
        },
        get: function () {
            return this._hostname;
        }
    },
    _id: {
        value: null
    },
    id: {
        set: function (value) {
            if (this._id !== value) {
                this._id = value;
            }
        },
        get: function () {
            return this._id;
        }
    },
    _image: {
        value: null
    },
    image: {
        set: function (value) {
            if (this._image !== value) {
                this._image = value;
            }
        },
        get: function () {
            return this._image;
        }
    },
    _memory_limit: {
        value: null
    },
    memory_limit: {
        set: function (value) {
            if (this._memory_limit !== value) {
                this._memory_limit = value;
            }
        },
        get: function () {
            return this._memory_limit;
        }
    },
    _names: {
        value: null
    },
    names: {
        set: function (value) {
            if (this._names !== value) {
                this._names = value;
            }
        },
        get: function () {
            return this._names;
        }
    },
    _ports: {
        value: null
    },
    ports: {
        set: function (value) {
            if (this._ports !== value) {
                this._ports = value;
            }
        },
        get: function () {
            return this._ports;
        }
    },
    _status: {
        value: null
    },
    status: {
        set: function (value) {
            if (this._status !== value) {
                this._status = value;
            }
        },
        get: function () {
            return this._status;
        }
    },
    _volumes: {
        value: null
    },
    volumes: {
        set: function (value) {
            if (this._volumes !== value) {
                this._volumes = value;
            }
        },
        get: function () {
            return this._volumes;
        }
    }
}, {
    propertyBlueprints: {
        value: [{
            mandatory: false,
            name: "command",
            valueType: "array"
        }, {
            mandatory: false,
            name: "environment",
            valueType: "object"
        }, {
            mandatory: false,
            name: "expose_ports",
            valueType: "boolean"
        }, {
            mandatory: false,
            name: "host",
            valueType: "String"
        }, {
            mandatory: false,
            name: "hostname",
            valueType: "String"
        }, {
            mandatory: false,
            name: "id",
            valueType: "String"
        }, {
            mandatory: false,
            name: "image",
            valueType: "String"
        }, {
            mandatory: false,
            name: "memory_limit",
            valueType: "number"
        }, {
            mandatory: false,
            name: "names",
            valueType: "array"
        }, {
            mandatory: false,
            name: "ports",
            valueType: "array"
        }, {
            mandatory: false,
            name: "status",
            valueType: "String"
        }, {
            mandatory: false,
            name: "volumes",
            valueObjectPrototypeName: "DockerVolume",
            valueType: "array"
        }]
    },
    userInterfaceDescriptor: {
        value: {
            collectionInspectorComponentModule: {
                id: 'ui/controls/viewer.reel'
            },
            nameExpression: "id.defined() ? id : 'Create a container'",
            collectionNameExpression: "'Containers'",
            creatorComponentModule: {
                id: 'ui/inspectors/container.reel'
            }
        }
    }
});
