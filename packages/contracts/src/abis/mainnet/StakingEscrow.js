export default [
   "StakingEscrow",
   "v5.7.1",
   "0x18eFb520dA5D387982C860a64855C14C0AcADF3F",
   [
     {
        "inputs":[
           {
              "internalType":"contract NuCypherToken",
              "name":"_token",
              "type":"address"
           },
           {
              "internalType":"contract WorkLockInterface",
              "name":"_workLock",
              "type":"address"
           },
           {
              "internalType":"contract IStaking",
              "name":"_tStaking",
              "type":"address"
           }
        ],
        "stateMutability":"nonpayable",
        "type":"constructor"
     },
     {
        "anonymous":false,
        "inputs":[
           {
              "indexed":true,
              "internalType":"address",
              "name":"staker",
              "type":"address"
           },
           {
              "indexed":false,
              "internalType":"uint256",
              "name":"value",
              "type":"uint256"
           }
        ],
        "name":"Deposited",
        "type":"event"
     },
     {
        "anonymous":false,
        "inputs":[
           {
              "indexed":true,
              "internalType":"address",
              "name":"staker",
              "type":"address"
           },
           {
              "indexed":true,
              "internalType":"address",
              "name":"stakingProvider",
              "type":"address"
           }
        ],
        "name":"MergeRequested",
        "type":"event"
     },
     {
        "anonymous":false,
        "inputs":[
           {
              "indexed":true,
              "internalType":"address",
              "name":"previousOwner",
              "type":"address"
           },
           {
              "indexed":true,
              "internalType":"address",
              "name":"newOwner",
              "type":"address"
           }
        ],
        "name":"OwnershipTransferred",
        "type":"event"
     },
     {
        "anonymous":false,
        "inputs":[
           {
              "indexed":true,
              "internalType":"address",
              "name":"staker",
              "type":"address"
           },
           {
              "indexed":false,
              "internalType":"uint256",
              "name":"penalty",
              "type":"uint256"
           },
           {
              "indexed":true,
              "internalType":"address",
              "name":"investigator",
              "type":"address"
           },
           {
              "indexed":false,
              "internalType":"uint256",
              "name":"reward",
              "type":"uint256"
           }
        ],
        "name":"Slashed",
        "type":"event"
     },
     {
        "anonymous":false,
        "inputs":[
           {
              "indexed":true,
              "internalType":"address",
              "name":"testTarget",
              "type":"address"
           },
           {
              "indexed":false,
              "internalType":"address",
              "name":"sender",
              "type":"address"
           }
        ],
        "name":"StateVerified",
        "type":"event"
     },
     {
        "anonymous":false,
        "inputs":[
           {
              "indexed":true,
              "internalType":"address",
              "name":"target",
              "type":"address"
           },
           {
              "indexed":false,
              "internalType":"address",
              "name":"sender",
              "type":"address"
           }
        ],
        "name":"UpgradeFinished",
        "type":"event"
     },
     {
        "anonymous":false,
        "inputs":[
           {
              "indexed":true,
              "internalType":"address",
              "name":"staker",
              "type":"address"
           },
           {
              "indexed":false,
              "internalType":"uint256",
              "name":"releaseTimestamp",
              "type":"uint256"
           },
           {
              "indexed":false,
              "internalType":"uint256",
              "name":"releaseRate",
              "type":"uint256"
           }
        ],
        "name":"VestingSet",
        "type":"event"
     },
     {
        "anonymous":false,
        "inputs":[
           {
              "indexed":true,
              "internalType":"address",
              "name":"staker",
              "type":"address"
           },
           {
              "indexed":false,
              "internalType":"uint256",
              "name":"value",
              "type":"uint256"
           }
        ],
        "name":"Withdrawn",
        "type":"event"
     },
     {
        "inputs":[

        ],
        "name":"currentPeriodSupply",
        "outputs":[
           {
              "internalType":"uint128",
              "name":"",
              "type":"uint128"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"_staker",
              "type":"address"
           },
           {
              "internalType":"uint256",
              "name":"_value",
              "type":"uint256"
           },
           {
              "internalType":"uint16",
              "name":"_unlockingDuration",
              "type":"uint16"
           }
        ],
        "name":"depositFromWorkLock",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"_target",
              "type":"address"
           }
        ],
        "name":"finishUpgrade",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"_staker",
              "type":"address"
           }
        ],
        "name":"getAllTokens",
        "outputs":[
           {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"_staker",
              "type":"address"
           }
        ],
        "name":"getCompletedWork",
        "outputs":[
           {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"getStakersLength",
        "outputs":[
           {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"_staker",
              "type":"address"
           }
        ],
        "name":"getUnvestedTokens",
        "outputs":[
           {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"isOwner",
        "outputs":[
           {
              "internalType":"bool",
              "name":"",
              "type":"bool"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"isUpgrade",
        "outputs":[
           {
              "internalType":"uint8",
              "name":"",
              "type":"uint8"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"owner",
        "outputs":[
           {
              "internalType":"address",
              "name":"",
              "type":"address"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"previousTarget",
        "outputs":[
           {
              "internalType":"address",
              "name":"",
              "type":"address"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"renounceOwnership",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"_staker",
              "type":"address"
           },
           {
              "internalType":"address",
              "name":"_stakingProvider",
              "type":"address"
           }
        ],
        "name":"requestMerge",
        "outputs":[
           {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
           }
        ],
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"_staker",
              "type":"address"
           },
           {
              "internalType":"bool",
              "name":"_measureWork",
              "type":"bool"
           }
        ],
        "name":"setWorkMeasurement",
        "outputs":[
           {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
           }
        ],
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address[]",
              "name":"_stakers",
              "type":"address[]"
           },
           {
              "internalType":"uint256[]",
              "name":"_releaseTimestamp",
              "type":"uint256[]"
           },
           {
              "internalType":"uint256[]",
              "name":"_releaseRate",
              "type":"uint256[]"
           }
        ],
        "name":"setupVesting",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"_staker",
              "type":"address"
           },
           {
              "internalType":"uint256",
              "name":"_penalty",
              "type":"uint256"
           },
           {
              "internalType":"address",
              "name":"_investigator",
              "type":"address"
           },
           {
              "internalType":"uint256",
              "name":"_reward",
              "type":"uint256"
           }
        ],
        "name":"slashStaker",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"",
              "type":"address"
           }
        ],
        "name":"stakerInfo",
        "outputs":[
           {
              "internalType":"uint256",
              "name":"value",
              "type":"uint256"
           },
           {
              "internalType":"uint16",
              "name":"stub1",
              "type":"uint16"
           },
           {
              "internalType":"uint16",
              "name":"stub2",
              "type":"uint16"
           },
           {
              "internalType":"uint16",
              "name":"lastCommittedPeriod",
              "type":"uint16"
           },
           {
              "internalType":"uint16",
              "name":"stub4",
              "type":"uint16"
           },
           {
              "internalType":"uint256",
              "name":"stub5",
              "type":"uint256"
           },
           {
              "internalType":"uint16",
              "name":"stub6",
              "type":"uint16"
           },
           {
              "internalType":"address",
              "name":"stub7",
              "type":"address"
           },
           {
              "internalType":"uint256",
              "name":"flags",
              "type":"uint256"
           },
           {
              "internalType":"uint256",
              "name":"vestingReleaseTimestamp",
              "type":"uint256"
           },
           {
              "internalType":"uint256",
              "name":"vestingReleaseRate",
              "type":"uint256"
           },
           {
              "internalType":"address",
              "name":"stakingProvider",
              "type":"address"
           },
           {
              "internalType":"uint256",
              "name":"reservedSlot4",
              "type":"uint256"
           },
           {
              "internalType":"uint256",
              "name":"reservedSlot5",
              "type":"uint256"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
           }
        ],
        "name":"stakers",
        "outputs":[
           {
              "internalType":"address",
              "name":"",
              "type":"address"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"supportsHistory",
        "outputs":[
           {
              "internalType":"bool",
              "name":"",
              "type":"bool"
           }
        ],
        "stateMutability":"pure",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"tStaking",
        "outputs":[
           {
              "internalType":"contract IStaking",
              "name":"",
              "type":"address"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"target",
        "outputs":[
           {
              "internalType":"address",
              "name":"",
              "type":"address"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"token",
        "outputs":[
           {
              "internalType":"contract NuCypherToken",
              "name":"",
              "type":"address"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"uint256",
              "name":"_blockNumber",
              "type":"uint256"
           }
        ],
        "name":"totalStakedAt",
        "outputs":[
           {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"_owner",
              "type":"address"
           },
           {
              "internalType":"uint256",
              "name":"_blockNumber",
              "type":"uint256"
           }
        ],
        "name":"totalStakedForAt",
        "outputs":[
           {
              "internalType":"uint256",
              "name":"",
              "type":"uint256"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"newOwner",
              "type":"address"
           }
        ],
        "name":"transferOwnership",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"address",
              "name":"_testTarget",
              "type":"address"
           }
        ],
        "name":"verifyState",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "inputs":[
           {
              "internalType":"uint256",
              "name":"_value",
              "type":"uint256"
           }
        ],
        "name":"withdraw",
        "outputs":[

        ],
        "stateMutability":"nonpayable",
        "type":"function"
     },
     {
        "inputs":[

        ],
        "name":"workLock",
        "outputs":[
           {
              "internalType":"contract WorkLockInterface",
              "name":"",
              "type":"address"
           }
        ],
        "stateMutability":"view",
        "type":"function"
     }
  ]
];