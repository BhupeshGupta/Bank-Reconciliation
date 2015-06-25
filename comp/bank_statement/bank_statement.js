reconApp.controller('bankStatementController', function ($scope, $mdToast, $http, getFeedLiveBankStatements) {
    if (!$scope.bank) {
        return;
    }

    this.getliveBank = function () {
        getFeedLiveBankStatements.liveFeed($scope.bank.value).then(function (data) {
            $scope.bank_statement = data;
        }, null);
    };

    $scope.disableUpload = false;

    this.getliveBank();
    var me = this;
    $scope.bankFormats = ['J K Bank', 'SBI Bank', 'HDFC Bank'];
    me.toastRef = $mdToast.simple()
        .highlightAction(false);

    // Upload File Data
    $scope.$watch('fdata', function () {
        if (!$scope.fdata)
            return;
        data = $scope.fdata.split(",")[1];
        bank = $scope.bank.value;
        var snd = {
            filedata: data,
            cmd: 'uploadfile',
            _type: 'POST',
            filename: 'sample',
            method: 'flows.flows.doctype.bank_statement.bank_statement.upload_bank_statement',
            params: JSON.stringify({
                bank: bank,
                format: $scope.bankFormat
            })
        };

        $scope.disableUpload = true;
        $http.post(serverBaseUrl, $.param(snd)).success(function (data) {
            $mdToast.show(me.toastRef.content('File Successfully Upload'));
            me.getliveBank();
            $scope.disableUpload = false;
        }).error(function (data) {
            $mdToast.show(me.toastRef.content('Error: Upload once again'));
            $scope.disableUpload = false;
        });
    });
});