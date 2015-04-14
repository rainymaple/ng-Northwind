(function (app) {
    app.factory('currentUser', [currentUser]);
    function currentUser() {

        var profile = {
            username: '',
            token: '',
            get loggedIn() {
                return !!this.token;
            }
        };

        return {
            setProfile: setProfile,
            profile: profile
        };

        // Service Functions

        function setProfile(username, token) {
            profile.username = username;
            profile.token = token;
        }

    }
})(angular.module('appNorthwind'));
