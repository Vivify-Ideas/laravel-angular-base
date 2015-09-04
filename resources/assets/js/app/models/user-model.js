_app.factory('UserModel', function(BaseModel, routes) {
    var UserModel = BaseModel(
      routes.users,
      {
        id: '@id'
      },
      {
        photo: 'FileModel'
      },
      {
        '_changePassword': { method:'PUT', url: routes.users + '/password', transformRequest: function(data) {
            return angular.toJson(data.password);
          }
        },
        '_updateBasicInfo': { method:'PUT', transformRequest: function(data) {
            return angular.toJson({
              first_name : data.first_name,
              last_name : data.last_name,
              email : data.email,
              action: "basic_info"
            });
          }
        },
        '_changePlan': { method:'PUT', url: routes.users + '/plan'
        },
        '_cancelPlan': { method:'PUT', url: routes.users + '/plan/cancel'
        },

      }
    );

    UserModel.prototype.changePassword = function (success, error) {
      return this.$_changePassword({}, success, error);
    };

    UserModel.prototype.updateBasicInfo = function (success, error) {
      return this.$_updateBasicInfo({}, success, error);
    };

    UserModel.prototype.getPhotoUrl = function () {
      return this.photo && this.photo.url ? this.photo.url : '/images/profile-default.png';
    };

    UserModel.prototype.changePlan = function (plan, token, success, error) {
      return this.$_changePlan({plan_id: plan.id, token: token}, success, error);
    };

    UserModel.prototype.cancelPlan = function (success, error) {
      return this.$_cancelPlan({}, success, error);
    };

    return UserModel;
  });