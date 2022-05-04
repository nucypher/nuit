export default [
    "TokenStaking",
    "v0.0.0",
    "0x818bc355572F4F7C0A2dED95Eebd495eB0972b64",
[
    {
      "inputs": [
        {
          "internalType": "contract T",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "contract IKeepTokenStaking",
          "name": "_keepStakingContract",
          "type": "address"
        },
        {
          "internalType": "contract INuCypherStakingEscrow",
          "name": "_nucypherStakingContract",
          "type": "address"
        },
        {
          "internalType": "contract VendingMachine",
          "name": "_keepVendingMachine",
          "type": "address"
        },
        {
          "internalType": "contract VendingMachine",
          "name": "_nucypherVendingMachine",
          "type": "address"
        },
        {
          "internalType": "contract KeepStake",
          "name": "_keepStake",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "application",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "enum TokenStaking.ApplicationStatus",
          "name": "newStatus",
          "type": "uint8"
        }
      ],
      "name": "ApplicationStatusChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ceiling",
          "type": "uint256"
        }
      ],
      "name": "AuthorizationCeilingSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "application",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "fromAmount",
          "type": "uint96"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "toAmount",
          "type": "uint96"
        }
      ],
      "name": "AuthorizationDecreaseApproved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "application",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "fromAmount",
          "type": "uint96"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "toAmount",
          "type": "uint96"
        }
      ],
      "name": "AuthorizationDecreaseRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "application",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "fromAmount",
          "type": "uint96"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "toAmount",
          "type": "uint96"
        }
      ],
      "name": "AuthorizationIncreased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "application",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "fromAmount",
          "type": "uint96"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "toAmount",
          "type": "uint96"
        },
        {
          "indexed": true,
          "internalType": "bool",
          "name": "successfulCall",
          "type": "bool"
        }
      ],
      "name": "AuthorizationInvoluntaryDecreased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "delegator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "fromDelegate",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "toDelegate",
          "type": "address"
        }
      ],
      "name": "DelegateChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "delegate",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "previousBalance",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newBalance",
          "type": "uint256"
        }
      ],
      "name": "DelegateVotesChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "oldGovernance",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newGovernance",
          "type": "address"
        }
      ],
      "name": "GovernanceTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "MinimumStakeAmountSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "reward",
          "type": "uint96"
        }
      ],
      "name": "NotificationRewardPushed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "reward",
          "type": "uint96"
        }
      ],
      "name": "NotificationRewardSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "NotificationRewardWithdrawn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "notifier",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "NotifierRewarded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnerRefreshed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "application",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "panicButton",
          "type": "address"
        }
      ],
      "name": "PanicButtonSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "caller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "count",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tAmount",
          "type": "uint256"
        }
      ],
      "name": "SlashingProcessed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "penalty",
          "type": "uint96"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "rewardMultiplier",
          "type": "uint256"
        }
      ],
      "name": "StakeDiscrepancyPenaltySet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "enum IStaking.StakeType",
          "name": "stakeType",
          "type": "uint8"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "authorizer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "Staked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        },
        {
          "indexed": true,
          "internalType": "bool",
          "name": "discrepancy",
          "type": "bool"
        }
      ],
      "name": "TokensSeized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "ToppedUp",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "Unstaked",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "applicationInfo",
      "outputs": [
        {
          "internalType": "enum TokenStaking.ApplicationStatus",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "panicButton",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "applications",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "application",
          "type": "address"
        }
      ],
      "name": "approveApplication",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "approveAuthorizationDecrease",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "authorizationCeiling",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "application",
          "type": "address"
        }
      ],
      "name": "authorizedStake",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint32",
          "name": "pos",
          "type": "uint32"
        }
      ],
      "name": "checkpoints",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint32",
              "name": "fromBlock",
              "type": "uint32"
            },
            {
              "internalType": "uint96",
              "name": "votes",
              "type": "uint96"
            }
          ],
          "internalType": "struct Checkpoints.Checkpoint",
          "name": "checkpoint",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "delegatee",
          "type": "address"
        }
      ],
      "name": "delegateVoting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "delegates",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "application",
          "type": "address"
        }
      ],
      "name": "disableApplication",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "application",
          "type": "address"
        }
      ],
      "name": "forceDecreaseAuthorization",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getApplicationsLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "application",
          "type": "address"
        }
      ],
      "name": "getAvailableToAuthorize",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "availableTValue",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "enum IStaking.StakeType",
          "name": "stakeTypes",
          "type": "uint8"
        }
      ],
      "name": "getMinStaked",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "blockNumber",
          "type": "uint256"
        }
      ],
      "name": "getPastTotalSupply",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "blockNumber",
          "type": "uint256"
        }
      ],
      "name": "getPastVotes",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSlashingQueueLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "getStartStakingTimestamp",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getVotes",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "governance",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "application",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "increaseAuthorization",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minTStakeAmount",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "notificationReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "notifiersTreasury",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "notifyKeepStakeDiscrepancy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "notifyNuStakeDiscrepancy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "numCheckpoints",
      "outputs": [
        {
          "internalType": "uint32",
          "name": "",
          "type": "uint32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "application",
          "type": "address"
        }
      ],
      "name": "pauseApplication",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "count",
          "type": "uint256"
        }
      ],
      "name": "processSlashing",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "reward",
          "type": "uint96"
        }
      ],
      "name": "pushNotificationReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "refreshKeepStakeOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "application",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "requestAuthorizationDecrease",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "requestAuthorizationDecrease",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "rolesOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "authorizer",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        },
        {
          "internalType": "uint256",
          "name": "rewardMultiplier",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "notifier",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "_stakingProviders",
          "type": "address[]"
        }
      ],
      "name": "seize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ceiling",
          "type": "uint256"
        }
      ],
      "name": "setAuthorizationCeiling",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "setMinimumStakeAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "reward",
          "type": "uint96"
        }
      ],
      "name": "setNotificationReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "application",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "panicButton",
          "type": "address"
        }
      ],
      "name": "setPanicButton",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "penalty",
          "type": "uint96"
        },
        {
          "internalType": "uint256",
          "name": "rewardMultiplier",
          "type": "uint256"
        }
      ],
      "name": "setStakeDiscrepancyPenalty",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        },
        {
          "internalType": "address[]",
          "name": "_stakingProviders",
          "type": "address[]"
        }
      ],
      "name": "slash",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "slashingQueue",
      "outputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        },
        {
          "internalType": "address",
          "name": "application",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "slashingQueueIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "authorizer",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stakeDiscrepancyPenalty",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stakeDiscrepancyRewardMultiplier",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "stakeKeep",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "authorizer",
          "type": "address"
        }
      ],
      "name": "stakeNu",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "stakedNu",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "nuAmount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "stakes",
      "outputs": [
        {
          "internalType": "uint96",
          "name": "tStake",
          "type": "uint96"
        },
        {
          "internalType": "uint96",
          "name": "keepInTStake",
          "type": "uint96"
        },
        {
          "internalType": "uint96",
          "name": "nuInTStake",
          "type": "uint96"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "topUp",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "topUpKeep",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "topUpNu",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newGuvnor",
          "type": "address"
        }
      ],
      "name": "transferGovernance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "unstakeAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        }
      ],
      "name": "unstakeKeep",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "unstakeNu",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "stakingProvider",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "unstakeT",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint96",
          "name": "amount",
          "type": "uint96"
        }
      ],
      "name": "withdrawNotificationReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
]