reconApp.controller('reconcileController', function ($http, $scope, $mdToast, getFeedLiveReconcileStatements, getFeedLiveAccount) {
    var data_promise_bank = getFeedLiveReconcileStatements.liveFeed($scope.bank.value);
    data_promise_bank.then(function (data) {
        for (feed in data) {
            var feed_obj = data[feed];
            feed_obj.match_expanded = false;
            feed_obj.default_tab = feed_obj.match.length > 0 ? 0 : 1;
            feed_obj.disableButton = false;
        }
        $scope.bank_feed = data;
    }, null);

    $scope.shiftToLast = function (index) {
        var temp = $scope.bank_feed.splice(index, 1);
        $scope.bank_feed.push(temp['0']);
    };

    $scope.toggleMatchView = function (index) {
        var feed = $scope.bank_feed[index];
        feed.match_expanded = !feed.match_expanded;
    };

    $scope.selectNew = function (pindex, index) {
        var element = $scope.bank_feed[pindex].match.splice(index, 1);
        $scope.bank_feed[pindex].match.unshift(element[0]);
    };

    $scope.querySearch = function (query) {
        return getFeedLiveAccount.liveFeed(query, $scope.bank.company);
    };

    $scope.reconTxn = function (index) {
        var bank = $scope.bank_feed[index];
        if (bank.default_tab == 0) {
            account = '';
            ref = '';
            voucher_id = bank.match[0]['id'];
        } else {
            voucher_id = '';
            var toastAcc = $mdToast.simple()
                .content('Add Account')
                .highlightAction(false);
            var toastRef = $mdToast.simple()
                .content('Add Remarks')
                .highlightAction(false);
            if (bank.create.account)
                account = bank.create.account.value;
            else {
                $mdToast.show(toastAcc);
                return;
            }
            if (bank.create.remarks)
                ref = bank.create.remarks;
            else {
                $mdToast.show(toastRef);
                return;
            }
        }
        bank.disableButton = true;
        var data = {
            bank_txn_id: bank.bank_txn.bank_txn_id,
            voucher_id: voucher_id,
            account: account,
            ref: ref
        };
        var url = serverBaseUrl + 'api/method/flows.flows.doctype.bank_statement.bank_statement.recon';
        $http.post(url, $.param(data)).success(function (data) {
            $scope.bank_feed.splice(index, 1);
        }).error(function (data) {
            var toastErr = $mdToast.simple()
                .content('Error Please Wait')
                .highlightAction(false);
            $mdToast.show(toastErr);
            bank.disableButton = false;
        });
    };

});
