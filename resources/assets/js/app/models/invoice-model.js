'use strict';

_app.factory('InvoiceModel', function(BaseModel, routes) {
    var InvoiceModel = BaseModel(
      routes.invoices,
      {
        id: '@id',
        user_id: '@user_id'
      }
    );

    return InvoiceModel;
  });