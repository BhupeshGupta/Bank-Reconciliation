var reconApp = angular.module('reconApp', ['ngMaterial', 'ui.router']);


// Main Controller
reconApp.controller('selectBank', function ($http, $scope, getFeedLiveAccountBank) {
    getFeedLiveAccountBank.liveFeed('', filters = {
        account_type: 'Bank'
    }).then(function (data) {
        $scope.banks = data;
    }, null);

    $scope.$watch('bank', function () {
        if (!$scope.bank)
            return;
        /*    data = $scope.fdata.split(",")[1];
            bank = $scope.bank.value;
            var snd = {
                filedata: data,
                cmd: 'uploadfile',
                _type: 'POST',
                filename: 'sample',
                method: 'erpnext.accounts.doctype.bank_statement.bank_statement.upload_bank_statement',
                params: JSON.stringify({
                    bank: bank
                })
            };
    
            $http.post(serverBaseUrl, $.param(snd));*/

    });
});


// Angular ui-router
reconApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");

    $stateProvider.state('bank_select', {
            url: '/main',
            views: {
                'on_bank_select': {
                    templateUrl: 'content.html',
                }
            }
        })
        .state('bank_select.reconcile', {
            url: '/reconcile',
            views: {
                'reconcile_view': {
                    templateUrl: 'comp/reconcile/reconcile.html',
                    controller: 'reconcileController'
                },
                'on_bank_select': {
                    templateUrl: 'content.html'
                }
            }
        })
        .state('bank_select.reconcile.create_rule', {
            url: '^/create_rule/:ref/:amt',
            parent: 'bank_select.reconcile',
            views: {
                'rules_view@bank_select': {
                    templateUrl: 'comp/rules/rules.html',
                    controller: 'ruleController'
                },
                'reconcile_view@bank_select': {
                    templateUrl: ''
                },
                'on_bank_select': {
                    templateUrl: 'content.html'
                }
            }
        })
        .state('bank_select.bank_statement', {
            url: '/bank_statement',
            views: {
                'bank_statement_view': {
                    templateUrl: 'comp/bank_statement/bank_statement.html',
                    controller: 'bankStatementController'
                },
                'on_bank_select': {
                    templateUrl: 'content.html'
                }
            }
        })
        .state('bank_select.rules', {
            url: '/rules',
            parent: 'bank_select',
            views: {
                'rules_view': {
                    templateUrl: 'comp/rules/rules.html',
                    controller: 'ruleController'
                },
                'on_bank_select': {
                    templateUrl: 'content.html'
                }
            }
        });
});


// For uploading the file
reconApp.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    };
}]);