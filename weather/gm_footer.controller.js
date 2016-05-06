/**
 * User: Thanh Tran
 * Date: 7/2/2015
 * Time: 23:16
 */
/* global twc */
/*jshint -W065 */
angular
  .module('gm_footer')
  .controller('twc_gm_footer_controller', ['$scope', 'settings', 
    function($scope, settings) {
      'use strict';

      $scope.currentYear = (new Date()).getFullYear();
      $scope.footer_twc_logo = settings.footer_twc_logo;
      $scope.footer_twc_companies_logo = settings.footer_twc_companies_logo;
      $scope.footer_show_social = settings.footer_show_social;

      $scope.footer_links = {
        international: settings.footer_international_links,
        app_store: settings.footer_app_store_links,
        social: settings.footer_social_links,
        company: settings.footer_company_links,
        legal: settings.footer_legal_links
      };

      $scope.truste_consent = settings.truste_consent;

      $scope.collapsedStates = {
        international: true,
        download: true,
        social: true
      };

      $scope.toggleCollapse = function(section) {
        var currentState = $scope.collapsedStates[section];
        angular.forEach($scope.collapsedStates, function(val, key) {
          $scope.collapsedStates[key] = true;
        });
        $scope.collapsedStates[section] = !currentState;
      };
    }
  ]);
