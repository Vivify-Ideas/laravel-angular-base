_app.factory('ContactsService', function(routes, $http) {

  var ContactsService = {
    importFromCsv: function(file, success, error) {
      return $http.post(
          routes.contacts_parse_from_csv,
          {
            'file_id': file.id
          }
        )
        .success(function(data, status, headers, config) {
          if (success) {
            success(data, status, headers, config);
          }
        }).
        error(function(data, status, headers, config) {
          if (error) {
            error(data, status, headers, config);
          }
        });
    }
  };

  return ContactsService;

});