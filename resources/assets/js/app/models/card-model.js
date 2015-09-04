'use strict';

_app.factory('CardModel', function(BaseModel, routes) {
    var CardModel = BaseModel(
      routes.cards,
      {
        id: '@id',
        user_id: '@user_id'
      }
    );

    return CardModel;
  });