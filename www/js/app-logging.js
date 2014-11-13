var app = angular.module('swMobile');
app.run(['$log', '$location', enhanceAngularLog]);

function enhanceAngularLog($log, $location) {

    var debugMode = false;
    if ($location.host() === 'localhost') {
        debugMode = true;
    }

    $log.enabledContexts = [];
    $log.getInstance = function (context) {
        return {
            log: enhanceLogging($log.log, context, debugMode),
            info: enhanceLogging($log.info, context, debugMode),
            warn: enhanceLogging($log.warn, context, debugMode),
            debug: enhanceLogging($log.debug, context, debugMode),
            error: enhanceLogging($log.error, context, debugMode)
        };
    };

    function enhanceLogging(loggingFunc, context, debugMode) {
        return function () {

            var showdebug = sessionStorage.showdebug;

            //if browser variable missing, don't show messages by default
            if (showdebug == undefined) {
                showdebug = 'false';
            }

            //override browser variable if in local dev
            if (debugMode) {
                showdebug = 'true';
            }

            //don't show log message unless browser variable set
            if (showdebug !== 'true') {
                return;
            }

            //update the log message
            var currentargs = [].slice.call(arguments);
            var contextarg = ['[' + context + ']'];
            var modifiedArguments = contextarg.concat(currentargs);

            loggingFunc.apply(null, modifiedArguments);
        };
    }
}