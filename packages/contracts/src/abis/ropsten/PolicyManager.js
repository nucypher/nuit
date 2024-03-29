export default ["PolicyManager", "v6.1.2", "0x0000000000000000000000000000000000000000", [{
    "inputs": [{
        "internalType": "contract StakingEscrow",
        "name": "_escrow",
        "type": "address"
    }], "stateMutability": "nonpayable", "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "bytes16", "name": "policyId", "type": "bytes16"}, {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "node", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "ArrangementRevoked",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "sender", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "min",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint256", "name": "defaultValue", "type": "uint256"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "max",
        "type": "uint256"
    }],
    "name": "FeeRateRangeSet",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "node", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "MinFeeRateSet",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "node", "type": "address"}, {
        "indexed": false,
        "internalType": "uint16",
        "name": "period",
        "type": "uint16"
    }],
    "name": "NodeBrokenState",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "bytes16", "name": "policyId", "type": "bytes16"}, {
        "indexed": true,
        "internalType": "address",
        "name": "sponsor",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "feeRate",
        "type": "uint256"
    }, {"indexed": false, "internalType": "uint64", "name": "startTimestamp", "type": "uint64"}, {
        "indexed": false,
        "internalType": "uint64",
        "name": "endTimestamp",
        "type": "uint64"
    }, {"indexed": false, "internalType": "uint256", "name": "numberOfNodes", "type": "uint256"}],
    "name": "PolicyCreated",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "bytes16", "name": "policyId", "type": "bytes16"}, {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
    "name": "PolicyRevoked",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "bytes16", "name": "policyId", "type": "bytes16"}, {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {"indexed": true, "internalType": "address", "name": "node", "type": "address"}, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "RefundForArrangement",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "bytes16", "name": "policyId", "type": "bytes16"}, {
        "indexed": true,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
    "name": "RefundForPolicy",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "testTarget", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }],
    "name": "StateVerified",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "target", "type": "address"}, {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
    }],
    "name": "UpgradeFinished",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "node", "type": "address"}, {
        "indexed": true,
        "internalType": "address",
        "name": "recipient",
        "type": "address"
    }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
    "name": "Withdrawn",
    "type": "event"
}, {
    "inputs": [],
    "name": "DEFAULT_FEE_DELTA",
    "outputs": [{"internalType": "int256", "name": "", "type": "int256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}, {
        "internalType": "address",
        "name": "_node",
        "type": "address"
    }],
    "name": "calculateRefundValue",
    "outputs": [{"internalType": "uint256", "name": "refundValue", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}],
    "name": "calculateRefundValue",
    "outputs": [{"internalType": "uint256", "name": "refundValue", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}, {
        "internalType": "address",
        "name": "_policyOwner",
        "type": "address"
    }, {"internalType": "uint64", "name": "_endTimestamp", "type": "uint64"}, {
        "internalType": "address[]",
        "name": "_nodes",
        "type": "address[]"
    }], "name": "createPolicy", "outputs": [], "stateMutability": "payable", "type": "function"
}, {
    "inputs": [],
    "name": "escrow",
    "outputs": [{"internalType": "contract StakingEscrow", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "feeRateRange",
    "outputs": [{"internalType": "uint128", "name": "min", "type": "uint128"}, {
        "internalType": "uint128",
        "name": "defaultValue",
        "type": "uint128"
    }, {"internalType": "uint128", "name": "max", "type": "uint128"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_target", "type": "address"}],
    "name": "finishUpgrade",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}, {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
    }],
    "name": "getArrangementInfo",
    "outputs": [{"internalType": "address", "name": "node", "type": "address"}, {
        "internalType": "uint256",
        "name": "indexOfDowntimePeriods",
        "type": "uint256"
    }, {"internalType": "uint16", "name": "lastRefundedPeriod", "type": "uint16"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}],
    "name": "getArrangementsLength",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getCurrentPeriod",
    "outputs": [{"internalType": "uint16", "name": "", "type": "uint16"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_node", "type": "address"}],
    "name": "getMinFeeRate",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_node", "type": "address"}, {
        "internalType": "uint16",
        "name": "_period",
        "type": "uint16"
    }],
    "name": "getNodeFeeDelta",
    "outputs": [{"internalType": "int256", "name": "", "type": "int256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}],
    "name": "getPolicyOwner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}, {
        "internalType": "address",
        "name": "_node",
        "type": "address"
    }],
    "name": "getRevocationHash",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "isOwner",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "isUpgrade",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "nodes",
    "outputs": [{"internalType": "uint128", "name": "fee", "type": "uint128"}, {
        "internalType": "uint16",
        "name": "previousFeePeriod",
        "type": "uint16"
    }, {"internalType": "uint256", "name": "feeRate", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "minFeeRate",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "", "type": "bytes16"}],
    "name": "policies",
    "outputs": [{"internalType": "bool", "name": "disabled", "type": "bool"}, {
        "internalType": "address payable",
        "name": "sponsor",
        "type": "address"
    }, {"internalType": "address", "name": "owner", "type": "address"}, {
        "internalType": "uint128",
        "name": "feeRate",
        "type": "uint128"
    }, {"internalType": "uint64", "name": "startTimestamp", "type": "uint64"}, {
        "internalType": "uint64",
        "name": "endTimestamp",
        "type": "uint64"
    }, {"internalType": "uint256", "name": "reservedSlot1", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "reservedSlot2",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "reservedSlot3", "type": "uint256"}, {
        "internalType": "uint256",
        "name": "reservedSlot4",
        "type": "uint256"
    }, {"internalType": "uint256", "name": "reservedSlot5", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "previousTarget",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}, {
        "internalType": "address",
        "name": "_node",
        "type": "address"
    }],
    "name": "refund",
    "outputs": [{"internalType": "uint256", "name": "refundValue", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}],
    "name": "refund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_node", "type": "address"}, {
        "internalType": "uint16",
        "name": "_period",
        "type": "uint16"
    }], "name": "register", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}, {
        "internalType": "address",
        "name": "_node",
        "type": "address"
    }, {"internalType": "bytes", "name": "_signature", "type": "bytes"}],
    "name": "revoke",
    "outputs": [{"internalType": "uint256", "name": "refundValue", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}, {
        "internalType": "address",
        "name": "_node",
        "type": "address"
    }],
    "name": "revokeArrangement",
    "outputs": [{"internalType": "uint256", "name": "refundValue", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "bytes16", "name": "_policyId", "type": "bytes16"}],
    "name": "revokePolicy",
    "outputs": [{"internalType": "uint256", "name": "refundValue", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "secondsPerPeriod",
    "outputs": [{"internalType": "uint32", "name": "", "type": "uint32"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_node", "type": "address"}, {
        "internalType": "uint16",
        "name": "_period",
        "type": "uint16"
    }], "name": "setDefaultFeeDelta", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "uint128", "name": "_min", "type": "uint128"}, {
        "internalType": "uint128",
        "name": "_default",
        "type": "uint128"
    }, {"internalType": "uint128", "name": "_max", "type": "uint128"}],
    "name": "setFeeRateRange",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "uint256", "name": "_minFeeRate", "type": "uint256"}],
    "name": "setMinFeeRate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "target",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_node", "type": "address"}, {
        "internalType": "uint16",
        "name": "_period",
        "type": "uint16"
    }], "name": "updateFee", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{"internalType": "address", "name": "_testTarget", "type": "address"}],
    "name": "verifyState",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "withdraw",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{"internalType": "address payable", "name": "_recipient", "type": "address"}],
    "name": "withdraw",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
}]];