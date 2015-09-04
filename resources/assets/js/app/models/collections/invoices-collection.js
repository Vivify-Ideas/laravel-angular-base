'use strict';

_app.factory('InvoicesCollection', function(BaseCollection, InvoiceModel) {
    var InvoicesCollection = BaseCollection(InvoiceModel);

    return InvoicesCollection;
  });