import IBEX from "./ibex"
import LYNX from "./lynx"
import MAINNET from "./mainnet"


const abis = {
    1:      MAINNET,
    "0x1":  MAINNET,

    4:      IBEX,
    "0x4":  IBEX,

    "0x5":  LYNX,
    5:      LYNX,
}

export default abis;
