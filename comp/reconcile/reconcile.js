reconApp.controller('reconcileController', function ($http, $scope, $mdToast, getFeedLiveReconcileStatements, getFeedLiveAccountBank) {
    var data_promise_bank = getFeedLiveReconcileStatements.liveFeed($scope.bank.value);
    data_promise_bank.then(function (data) {
        for (feed in data) {
            var feed_obj = data[feed];
            feed_obj.match_expanded = false;
            feed_obj.default_tab = feed_obj.match.length > 0 ? 0 : 1;
        }
        $scope.bank_feed = data;
    }, null);

    $scope.toggleMatchView = function (index) {
        var feed = $scope.bank_feed[index];
        feed.match_expanded = !feed.match_expanded;
    };

    $scope.selectNew = function (pindex, index) {
        var element = $scope.bank_feed[pindex].match.splice(index, 1);
        $scope.bank_feed[pindex].match.unshift(element[0]);
    };

    $scope.querySearch = function (query) {
        return getFeedLiveAccountBank.liveFeed(query);
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
            account = bank.create.account ? bank.create.account.value :$mdToast.show(toastAcc) ;
            ref = bank.create.remarks ? bank.create.remarks : $mdToast.show(toastRef);
        }
        var data = {
            bank_txn_id: bank.bank_txn.bank_txn_id,
            voucher_id: voucher_id,
            account: account,
            ref: ref
        };
        var url = serverBaseUrl + 'api/method/erpnext.accounts.doctype.bank_statement.bank_statement.recon';
        $http.post(url, $.param(data)).success(function (data) {
            $scope.bank_feed.splice(index, 1);
        });
    };

});