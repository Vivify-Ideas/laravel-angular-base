_app
  .provider("$exceptionHandler", {
      $get: function( ErrorLogService ) {
        return( ErrorLogService );
      }
    }
  )
  .factory('ErrorLogService', function($log, $window, stacktraceService, routes) {

    var userAgentData = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
    userAgentData+= "<p>Browser Name: " + navigator.appName + "</p>";
    userAgentData+= "<p>Browser Version: " + navigator.appVersion + "</p>";
    userAgentData+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
    userAgentData+= "<p>Browser Language: " + navigator.language + "</p>";
    userAgentData+= "<p>Browser Online: " + navigator.onLine + "</p>";
    userAgentData+= "<p>Platform: " + navigator.platform + "</p>";
    userAgentData+= "<p>User-agent header: " + navigator.userAgent + "</p>";
    userAgentData+= "<p>User-agent language: " + navigator.systemLanguage + "</p>";

    var lastErrorStackTrace = '';

    function log( exception, cause ) {
      $log.error.apply( $log, arguments );

      try {
        var errorMessage = exception.toString();
        var stackTrace = stacktraceService.print({ e: exception });

        if (!_.isEqual(stackTrace, lastErrorStackTrace)) {
          lastErrorStackTrace = stackTrace;

          $.ajax({
            type: "POST",
            url: routes.error_log,
            contentType: "application/json",
            data: angular.toJson({
              errorUrl: $window.location.href,
              errorMessage: errorMessage,
              stackTrace: stackTrace,
              cause: ( cause || "" ),
              userAgentData: userAgentData
            })
          });
        }

      } catch ( loggingError ) {
        $log.warn( "Error logging failed" );
        $log.log( loggingError );
      }
    }

    return( log );
  })
  .factory("stacktraceService", function() {
      return({
        print: printStackTrace
      });
    }
  );