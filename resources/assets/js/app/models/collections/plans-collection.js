_app.factory('PlansCollection', function(BaseCollection, PlanModel) {
    var PlansCollection = BaseCollection(PlanModel);

    PlansCollection.prototype.getFreePlan = function () {
      return this[0];
    };

    return PlansCollection;
  });
