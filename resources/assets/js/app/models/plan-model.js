_app.factory('PlanModel', function(BaseModel, routes) {
    var PlanModel = BaseModel(
      routes.plans,
      {
        id: '@id'
      }
    );

    PlanModel.prototype.isFreePlan = function() {
      return this.amount <= 0;
    };

    return PlanModel;
  });