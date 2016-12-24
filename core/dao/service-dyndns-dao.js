"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_dao_ng_1 = require('./abstract-dao-ng');
var ServiceDyndnsDao = (function (_super) {
    __extends(ServiceDyndnsDao, _super);
    function ServiceDyndnsDao() {
        _super.call(this, 'ServiceDyndns', { queryMethod: 'service.dyndns.get_config' });
    }
    ServiceDyndnsDao.prototype.getProviders = function () {
        return this.middlewareClient.callRpcMethod('service.dyndns.providers');
    };
    return ServiceDyndnsDao;
}(abstract_dao_ng_1.AbstractDao));
exports.ServiceDyndnsDao = ServiceDyndnsDao;
