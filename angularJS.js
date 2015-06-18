var reconApp = angular.module('reconApp', ['ngMaterial']);

reconApp.controller('bankController', function ($http, $scope, getFeedMockBank, getFeedMockAccount) {
    console.log("Loaded!!");
    var data_promise_bank = getFeedMockBank.getFeed();
    data_promise_bank.then(function (data) {
        for (feed in data) {
            var feed_obj = data[feed];
            feed_obj.match_expanded = false;
            feed_obj.default_tab = feed_obj.match.length > 0?0:1;
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
    }
    
    $scope.reconTxn = function (index) {
        console.log($scope.bank_feed.splice(index, 1)); 
    }
});

reconApp.service('getFeedLive', ['$http', function ($http) {
    this.getFeed = function () {
        return $http.get('https://dl.dropboxusercontent.com/u/12174655/al_sample_txns.json');
    };
}]);

reconApp.service('getFeedMockOldBankStatement', ['$http', '$q', function ($http, $q) {
    this.getFeed = function () {
        var feed = [
            {
                "txn_date": "16/06/15",
                "description": "NEFT-VISHAL CYCLES PRIVATE LIMITED-HDFC0000034",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "52,250.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "NEFT-D B CORP LTD EXPENSE ACCOUNT-IBKL0000143",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "1,71,843.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "NEFT-PERFECT FORGINGS-HDFC0000240",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "13,568.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "RTGS-PERFECTFORGINGS-HDFC0000240",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "4,24,775.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "NEFT-EMSON PROCESS INDUSTRIES-SBIN0000731",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "73,206.62"
  },
            {
                "txn_date": "16/06/15",
                "description": "NEFT-PADMA BHAVAM ENGRS P LTD-SBIN0000731",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "38,529.62"
  },
            {
                "txn_date": "16/06/15",
                "description": "NEFT-BRIGHT MOULDING WORKS-ORBC0100917",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "95,130.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "NEFT-SINGHANIA INTERNATIONAL LIMITED-HDFC0000240",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "36,274.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "NEFT-SINGHANIA INTERNATIONAL LIMITED-HDFC0000240",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "2,226.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "BY INST 341 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "2,00,000.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "BY INST 12740 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "88,427.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "BY INST 12739 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "12,241.95"
  },
            {
                "txn_date": "16/06/15",
                "description": "BY INST 74926 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "2,67,154.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "BY INST 74927 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "22,216.92"
  },
            {
                "txn_date": "16/06/15",
                "description": "BY INST 943534 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "84,694.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "BY INST 5151 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "1,35,768.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "BY INST 868033 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "1,00,000.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "BY INST 151838 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "74,228.00"
  },
            {
                "txn_date": "16/06/15",
                "description": "BY INST 90021 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "8,947.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "NEFT-SDC2062869-AVTAR SINGH",
                "ceque_no": null,
                "cr_dr": "DR",
                "txn_amt": "30,196.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "eBIL/161943117-/002692423",
                "ceque_no": null,
                "cr_dr": "DR",
                "txn_amt": "5,500.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "RTGS-SDC2062152-MOSAIC SBI",
                "ceque_no": null,
                "cr_dr": "DR",
                "txn_amt": "3,00,000.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "RTGS-SDC2062143-KHALSA TRANSPORT SBI",
                "ceque_no": null,
                "cr_dr": "DR",
                "txn_amt": "3,00,000.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "PUNJAB KESARI",
                "ceque_no": 448864,
                "cr_dr": "DR",
                "txn_amt": "25,000.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "SELF",
                "ceque_no": 448870,
                "cr_dr": "DR",
                "txn_amt": "4,00,000.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "BY INST 223716 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "2,280.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "BY INST 22321 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "950"
  },
            {
                "txn_date": "15/06/15",
                "description": "BY INST 70012 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "3,12,185.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "BY INST 123354 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "2,15,517.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "BY INST 728438 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "57,994.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "BY INST 354473 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "5,320.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "BY INST 337379 : OUTWARD CLG. MICR",
                "ceque_no": null,
                "cr_dr": "CR",
                "txn_amt": "78,280.00"
  },
            {
                "txn_date": "15/06/15",
                "description": "NEFT-SDC2061571-MOSAIC SBI",
                "ceque_no": null,
                "cr_dr": "DR",
                "txn_amt": "1,50,000.00"
  }
];
        var promise = $q.defer();
        promise.resolve(feed);
        var return_promise = promise.promise;
        return return_promise;
    };
}]);


reconApp.service('getFeedMockBank', ['$http', '$q', function ($http, $q) {
    this.getFeed = function () {
        var feed = [
            {
                "bank_txn": {
                    "bank_txn_id": 1,
                    "txn_date": "16/06/15",
                    "description": "NEFT-VISHAL CYCLES PRIVATE LIMITED-HDFC0000034",
                    "ceque_no": null,
                    "cr_dr": "CR",
                    "txn_amt": "52,250.00"
                },
                "autosuggest": {
                    "account": "Padma Bhawan - AL"
                },
                "match": [
                    {
                        "id": "JV-2019",
                        "date": "16/06/15",
                        "remarks": "",
                        "ref": "asbdvasjhd",
                        "cr_dr": "CR",
                        "against_account": "VK Logis223tics - AL",
                        "amount": "23423"
      },
                    {
                        "id": "JV-2019",
                        "date": "16/06/15",
                        "remarks": "",
                        "ref": "",
                        "cr_dr": "CR",
                        "against_account": "VK Log57istics - AL",
                        "amount": "234"
      },
                    {
                        "id": "JV-2019",
                        "date": "16/06/15",
                        "remarks": "",
                        "ref": "",
                        "cr_dr": "CR",
                        "against_account": "VK zxc - AL",
                        "amount": "565"
      }
    ]
  },
            {
                "bank_txn": {
                    "bank_txn_id": 1,
                    "txn_date": "16/06/15",
                    "description": "NEFT-VISHAL CYCLES PRIVATE LIMITED-HDFC0000034",
                    "ceque_no": null,
                    "cr_dr": "CR",
                    "txn_amt": "52,250.00"
                },
                "autosuggest": {
                    "account": "Padma Bhawan - AL"
                },
                "match": [
                    {
                        "id": "JV-2019",
                        "date": "16/06/15",
                        "remarks": "",
                        "ref": "",
                        "cr_dr": "CR",
                        "against_account": "VK Logistics - AL",
                        "amount": "234"
      },
                    {
                        "id": "JV-2019",
                        "date": "16/06/15",
                        "remarks": "",
                        "ref": "",
                        "cr_dr": "CR",
                        "against_account": "VK Logistics - AL",
                        "amount": "235"
      },
                    {
                        "id": "JV-2019",
                        "date": "16/06/15",
                        "remarks": "",
                        "ref": "",
                        "cr_dr": "CR",
                        "against_account": "VK Logistics - AL",
                        "amount": ""
      }
    ]
  },
            {
                "bank_txn": {
                    "bank_txn_id": 1,
                    "txn_date": "16/06/15",
                    "description": "NEFT-VISHAL CYCLES PRIVATE LIMITED-HDFC0000034",
                    "ceque_no": null,
                    "cr_dr": "DR",
                    "txn_amt": "52,250.00"
                },
                "autosuggest": {
                    "account": "Padma Bhawan - AL"
                },
                "match": [
    ]
  }
];
        var promise = $q.defer();
        promise.resolve(feed);
        var return_promise = promise.promise;
        return return_promise;
    };
}]);

reconApp.service('getFeedMockAccount', ['$http', '$q', function ($http, $q) {
    this.getFeed = function () {

        var feed = {
            "results": [
                {
                    "description": "Ledger",
                    "value": "7 dez (Ready Pizza) - AL"
    },
                {
                    "description": "Ledger",
                    "value": "A K Multimetals Pvt. LTD - AL"
    },
                {
                    "description": "Ledger",
                    "value": "A L COLD FORGE PVT. LTD. - AL"
    },
                {
                    "description": "Ledger",
                    "value": "A P ORGANICS PVT. LTD. - AL"
    },
                {
                    "description": "Ledger",
                    "value": "A R CATERING HOUSE - AL"
    },
                {
                    "description": "Ledger",
                    "value": "A S CATERING HOUSE - AL"
    },
                {
                    "description": "Ledger",
                    "value": "A.P. AUTO INDUSTRIES - AL"
    },
                {
                    "description": "Ledger",
                    "value": "AAR AAR INDUSTRY - AL"
    },
                {
                    "description": "Ledger",
                    "value": "AARTI STEEL LTD. AFD II - AL"
    },
                {
                    "description": "Ledger",
                    "value": "AARTI STEEL LTD. ARC  - AL"
    },
                {
                    "description": "Ledger",
                    "value": "AARTI STEEL ROLLING MILLS - AL"
    },
                {
                    "description": "Ledger",
                    "value": "AARTI STRIPS PVT. LTD. - AL"
    },
                {
                    "description": "Ledger",
                    "value": "ACME AUTO TECH PVT LTD - AL"
    },
                {
                    "description": "Ledger",
                    "value": "ADI MAJESTIC - AL"
    },
                {
                    "description": "Ledger",
                    "value": "Administrative Expenses - AL"
    },
                {
                    "description": "Ledger",
                    "value": "Administrator - AL"
    },
                {
                    "description": "Ledger",
                    "value": "Aggarwal Enterprises - AL"
    },
                {
                    "description": "Ledger",
                    "value": "AGGARWAL FIBERS - AL"
    },
                {
                    "description": "Ledger",
                    "value": "Aggarwal Stock - AL"
    },
                {
                    "description": "Ledger",
                    "value": "AGGARWAL YARNS - AL"
    }
  ]
        };
        var promise = $q.defer();
        promise.resolve(feed['results']);
        return promise.promise;

    };
}]);