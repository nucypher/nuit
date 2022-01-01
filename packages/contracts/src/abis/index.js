import IBEX from "./ibex"
import LYNX from "./lynx"
import MAINNET from "./mainnet"
import ROPSTEN from "./ropsten"


const abis = {
    1:      MAINNET,
    "0x1":  MAINNET,

    4:      IBEX,
    "0x4":  IBEX,

    "0x5":  LYNX,
    5:      LYNX,

    "0x3": ROPSTEN,
    3: ROPSTEN
}

export default abis;
