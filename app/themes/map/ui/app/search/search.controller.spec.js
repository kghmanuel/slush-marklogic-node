/* jshint -W117, -W030 */
(function() {
  'use strict';

  describe('Controller: SearchCtrl', function() {

    var controller;

    var results = [{
      uri: 'abc',
      extracted: {
        content: [{
          location: {
            latitude: 1,
            longitude: 2
          }
        }]
      }
    }, {
      uri: 'def',
      extracted: {
        content: [{
          location: {
            latitude: 1,
            longitude: 2
          }
        }]
      }
    }];

    beforeEach(function() {
      bard.appModule('app.search');
      bard.inject('$controller', '$q', '$rootScope', '$location',
        'userService', 'MLSearchFactory', 'MLRest', 'MLUiGmapManager', 'uiGmapGoogleMapApi');

      bard.mockService(MLRest, {
        search: $q.when({
          data: {
            results: results
          }
        })
      });

    });

    beforeEach(function() {
      controller = $controller('SearchCtrl', { $scope: $rootScope.$new() });
      $rootScope.$apply();
    });

    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    it('should run a search', function() {
      controller.search('stuff');
      $rootScope.$apply();
      expect(controller.response.results).to.eq(results);
    });
  });
}());
