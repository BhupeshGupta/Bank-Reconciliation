reconApp.controller('bankStatementController', function ($scope, $http, getFeedLiveBankStatements) {
    if (!$scope.bank) {
        return;
    }

    getFeedLiveBankStatements.liveFeed($scope.bank.value).then(function (data) {
        $scope.bank_statement = data;
    }, null);

    $scope.bankFormats = ['J K Bank', 'SBI Bank', 'HDFC Bank'];

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

        $http.post(serverBaseUrl, $.param(snd));
    });
});
