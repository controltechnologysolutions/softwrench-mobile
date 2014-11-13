angular.module('swMobile', [])
    .controller('SigninController', function ($scope, $http, $location, $log) {

        //setup local dev environment
        $scope.debugMode = ($location.host() === 'localhost');
        var log = $log.getInstance('init');

        //TODO: remove test data & load form stored values
        $scope.server = 'http://10.50.100.125:8090/SW4OTB';
        $scope.username = 'swadmin';
        $scope.password = 'sw@dm1n';

        $scope.signin = function () {
            log = $log.getInstance('signin');
            log.debug('enter');

            var urlToUse = $scope.server + '/SignIn';
            //var urlToUse = 'http://10.50.100.125:8090/SW4OTB/api/generic/signin/index';
            //var urlToUse = 'http://10.50.100.125:8090/SW4OTB/api/generic/Data/UpdateAssociation';
            //var urlToUse = 'http://ip.jsontest.com/';

            $http({
                method: 'JSONP',
                url: urlToUse
            }).success(function (data, status, headers, config) {
                $scope.json = data;

                log.info('HTTP Success', data);

            }).error(function (data, status, headers, config) {
                $scope.json = status + ' Error';

                log.info('HTTP Error', status);
            });
        };
    });