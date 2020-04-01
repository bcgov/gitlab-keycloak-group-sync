
const request = require('request-promise');

module.exports = KeycloakClientApi;

// "username" must have "realm-management" Client Roles:
// - query-groups
// - query-users
// - view-users
//

function KeycloakClientApi(config) {
    if (!(this instanceof KeycloakClientApi))
        return new KeycloakClientApi(config)

    this.config = config;
}

KeycloakClientApi.prototype.findGroups = function () {
    var config = this.config;

    return this.session().then(function(token) {

        var options = {
            url: config.url + "/auth/admin/realms/" + config.realm + "/groups",
            headers: {
                "Authorization" : "bearer " + token
            },
            json: true
        }
        return request(options).catch((err) => {
            console.log("getUsersForGroup() Error calling keycloak", err);
            token = undefined;
        });
    });
};

KeycloakClientApi.prototype.getUsers = function (groupId) {

    var config = this.config;

    return this.session().then(function(token) {
        var options = {
            url: config.url + "/auth/admin/realms/" + config.realm + "/users?max=1000",
            headers: {
                "Authorization" : "bearer " + token
            },
            json: true
        }
        return request(options).catch((err) => {
            console.log("getUsers() Error calling keycloak", err);
            token = undefined;
        });
    });
};

KeycloakClientApi.prototype.getUsersForGroup = function (groupId) {

    var config = this.config;

    return this.session().then(function(token) {
        var options = {
            url: config.url + "/auth/admin/realms/" + config.realm + "/groups/" + groupId + "/members",
            headers: {
                "Authorization" : "bearer " + token
            },
            json: true
        }
        return request(options).catch((err) => {
            console.log("getUsersForGroup() Error calling keycloak", err);
            token = undefined;
        });
    });
};

KeycloakClientApi.prototype.session = function () {
    var config = this.config;

    return new Promise(function (resolve, reject) {
        if (typeof token === "string") {
            resolve(token);
            return;
        }

        return request({
            method: "POST",
            url: config.url + "/auth/realms/" + config.realm + "/protocol/openid-connect/token",
            form: {
                grant_type: 'password',
                client_id: 'admin-cli',
                username: config.username,
                password: config.password
            }
        }).then(function(body) {
            token = JSON.parse(body).access_token;

            setTimeout(() => token = undefined, JSON.parse(body).expires_in * 1000);

            resolve(token);
        }).catch ((err) => {
            console.log("Error authenticating ", err);
            token = undefined;
            reject(err);
        });
    });
};
