reconApp.controller('reconcileController', function ($http, $scope, getFeedMockBankCheckStatment, getFeedMockAccount) {
    var data_promise_bank = getFeedMockBankCheckStatment.getFeed();
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
        return getFeedMockAccount.getFeed();
    };

    $scope.reconTxn = function (index) {
        $scope.bank_feed.splice(index, 1);
    };

});