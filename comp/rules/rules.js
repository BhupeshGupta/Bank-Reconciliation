reconApp.controller('ruleController', function ($stateParams, $http, $scope, getFeedMockRules, getFeedLiveAccount) {
    if ($stateParams.amt) {
        $scope.newRule = {};
        $scope.newRule.subrules = [
            {
                column: 'Reference',
                ops: '',
                eq_nq: '',
                value: $stateParams.ref
            }, {
                column: 'Amount',
                ops: '',
                eq_nq: '',
                value: $stateParams.amt
            }
        ];
        $scope.ruleShow = true;
    }
    getFeedMockRules.getFeed().then(function (data) {
        $scope.rules = data;
    }, null);

    $scope.querySearch = function (query) {
        return getFeedLiveAccount.liveFeed(query, $scope.bank.company);
    };

    $scope.editRule = function (index) {
        var tempRule = $scope.rules[index];
        $scope.newRule = {};
        $scope.newRule.name = tempRule.rule_name;
        $scope.newRule.type = tempRule.rule_on;
        $scope.newRule.matching = tempRule.match_type;

        $scope.newRule.target_account = {
            value: tempRule.target_account
        };

        $scope.newRule.subrules = tempRule.subrules;
        $scope.newRule.nameDisable = true;
        $scope.rules.splice(index, 1);
        $scope.ruleShow = true;
    };

    $scope.addSubRule = function () {
        $scope.newRule.subrules.push({
            column: '',
            ops: '',
            eq_nq: '',
            value: ''
        });
    };

    $scope.saveRule = function () {
        var tempNewRule = $scope.newRule;
        var temp = {
            rule_name: tempNewRule.name,
            target_account: tempNewRule.target_account.value,
            match_type: tempNewRule.matching,
            rule_on: tempNewRule.type,
            subrules: tempNewRule.subrules
        }
        $scope.rules.push(temp);
        $scope.ruleShow = false;
    };

    $scope.deleteSubRule = function (index) {
        $scope.newRule.subrules.splice(index, 1);
    };

    $scope.deleteRule = function (index) {
        $scope.rules.splice(index, 1);
    }
});