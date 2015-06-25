var serverBaseUrl = 'https://erp.arungas.com/';

// http error interceptor
reconApp.factory('myHttpResponseInterceptor', ['$q', '$location',
    function ($q, $location) {
        return {
            responseError: function (rejection) {
                var stat = rejection.status;
                var msg = '';
                if (stat == 403)
                    msg = 'Login Required';
                else if (stat == 500)
                    msg = 'Internal Server Error';
                else if (stat == 501)
                    msg = 'Server Error';
                else if (stat == 502)
                    msg = 'Server is Offline';
                else if (stat == 503)
                    msg = 'Server is Overload or down';
                else if (stat == 504)
                    msg = 'Server is Offline';
                else
                    msg = "Error";
                alert(msg);
                return $q.reject(rejection);
            }
        }
}]);


//Http Intercpetor to check auth failures for xhr requests
reconApp.config(['$httpProvider',
    function ($httpProvider) {
        $httpProvider.interceptors.push('myHttpResponseInterceptor');
}]);



// Theme Change
reconApp.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('light-blue');
});


// Default Http Header Change
reconApp.config(function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
});


// Get Customer Accounts from API
reconApp.service('getFeedLiveAccount', ['$http', '$q',
    function ($http, $q) {
        this.liveFeed = function (search, company) {
            filters = {};
            filters.group_or_ledger = "Ledger";
            filters.company = company;
            var snd = {
                txt: search,
                doctype: 'Account',
                filters: JSON.stringify(filters),
                cmd: 'frappe.widgets.search.search_link',
                _type: 'POST'
            };

            var promise = $q.defer();

            $http.post(serverBaseUrl, $.param(snd)).success(function (data) {
                promise.resolve(data.results);
            });

            return promise.promise;
        };
}]);


// Get Bank Statements
reconApp.service('getFeedLiveBankStatements', ['$http', '$q',
    function ($http, $q) {
        this.liveFeed = function (bank) {
            var data = {
                fields: JSON.stringify(["name", "from_date", "to_date", "txn_count", "reconciled"]),
                filters: JSON.stringify({
                    bank: bank
                })
            }
            var promise = $q.defer();
            var url = serverBaseUrl + 'api/resource/Bank Statement?' + $.param(data);
            $http.get(url).success(function (data) {
                promise.resolve(data.data);
            });
            return promise.promise;
        };
}]);


// Get Bank Account
reconApp.service('getFeedLiveBankAccount', ['$http', '$q',
    function ($http, $q) {
        this.liveFeed = function () {
            var data = {
                fields: JSON.stringify(["name as value", "company"]),
                filters: JSON.stringify({
                    account_type: 'bank'
                })
            }
            var promise = $q.defer();
            var url = serverBaseUrl + 'api/resource/Account?' + $.param(data);
            $http.get(url).success(function (data) {
                promise.resolve(data.data);
            });
            return promise.promise;
        };
}]);


// Get Bank Reconcile Statements
reconApp.service('getFeedLiveReconcileStatements', ['$http', '$q',
    function ($http, $q) {
        this.liveFeed = function (bank) {
            var data = {
                bank: bank
            };
            var promise = $q.defer();
            var url = serverBaseUrl + 'api/method/flows.flows.doctype.bank_statement.bank_statement.get_recon_list';
            $http.post(url, $.param(data)).success(function (data) {
                promise.resolve(data.message);
            });
            return promise.promise;
        };
}]);


// Get Bank Rules
reconApp.service('getFeedLiveBankRules', ['$http',
    function ($http) {
        this.liveFeed = function (bank) {
            if (!bank)
                return false;
            var snd = {
                txt: search,
                doctype: 'Account',
                filters: JSON.stringify(filters),
                cmd: 'frappe.widgets.search.search_link',
                _type: 'POST'
            };
            return $http.post(serverBaseUrl, $.param(snd));
        };
}]);


// Mock Data Fetch
reconApp.service('getFeedMockOldBankStatement', ['$http', '$q',
    function ($http, $q) {
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

reconApp.service('getFeedMockBankCheckStatment', ['$http', '$q',
    function ($http, $q) {
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

reconApp.service('getFeedMockAccount', ['$http', '$q',
    function ($http, $q) {
        this.getFeed = function () {
            var feed = {
                "results": [
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
                        "value": "AARTI STEEL LTD. ARC - AL"
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
                        "value": "Aggarwal Stock - AL"
    },
                    {
                        "description": "Ledger",
                        "value": "AJAY BAMTRA CATER - AL"
    },
                    {
                        "description": "Ledger",
                        "value": "AJAY INDUSTREIS (JALANDHAR) - AL"
    }
  ]
            };
            var promise = $q.defer();
            promise.resolve(feed['results']);
            return promise.promise;

        };
}]);

reconApp.service('getFeedMockBankStatement', ['$http', '$q',
    function ($http, $q) {
        this.getFeed = function () {
            var feed = [
                {
                    "name": "2cf7d31eb38b8c39e3ad55cb162d07cf22aec79b3c3b22ebe6206425",
                    "txn_count": 1,
                    "reconciled": 0,
                    "from_date": "2015-06-18",
                    "to_date": "2015-06-19",
                    "bank": "J & K Bank A/c # CD-441 - AL"
    },
                {
                    "name": "54c01cbcb09f4d2a033b5a94a967f90a738265f946ef06a422f61646",
                    "txn_count": 1,
                    "reconciled": 0,
                    "from_date": "2015-06-18",
                    "to_date": "2015-06-19",
                    "bank": null
    }
  ];
            var promise = $q.defer();
            promise.resolve(feed);
            var return_promise = promise.promise;
            return return_promise;
        };
}]);

reconApp.service('getFeedMockRules', ['$http', '$q',
    function ($http, $q) {
        this.getFeed = function () {
            var feed = [
                {
                    "rule_name": "The First Principle Of Accounting",
                    "target_account": "7 dez (Ready Pizza) - AL",
                    "match_type": "All",
                    "rule_on": "Credit",
                    "subrules": [
                        {
                            "column": "Reference",
                            "ops": "Fuzzy",
                            "eq_nq": "Equals",
                            "value": "Th"
                    },
                        {
                            "column": "Amount",
                            "ops": "Equal",
                            "eq_nq": "Not Equals",
                            "value": "PF"
                    }
                            ]
            },
                {
                    "rule_name": "Second",
                    "target_account": "A R CATERING HOUSE - AL",
                    "match_type": "Any",
                    "rule_on": "Both",
                    "subrules": [
                        {
                            "column": "Reference",
                            "ops": "Fuzzy",
                            "eq_nq": "Equals",
                            "value": "Th"
                    },
                        {
                            "column": "Amount",
                            "ops": "Equal",
                            "eq_nq": "Not Equals",
                            "value": "PF"
                    }
                            ]
            }
        ];
            var promise = $q.defer();
            promise.resolve(feed);
            var return_promise = promise.promise;
            return return_promise;
        };
}]);

reconApp.service('getFeedMockBanks', ['$http', '$q',
    function ($http, $q) {
        this.getFeed = function () {
            var feed = [
                {
                    "name": "JK Bank (CD441)"
 },
                {
                    "name": "J & K Bank A/c # CD-441 - AL"
 }
];
            var promise = $q.defer();
            promise.resolve(feed);
            var return_promise = promise.promise;
            return return_promise;
        };
}]);