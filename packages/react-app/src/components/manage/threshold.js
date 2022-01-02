import {InputBox, PurpleButton, TokenBalance} from "../index";
import React, {useContext} from "react";
import {Col, Row, Tooltip} from "react-bootstrap";
import {Context} from "../../services";
import {makeEtherscanAccountLink, PUBLIC_CHAINS} from "../../constants";


export default function ThresholdBalance(props) {
    const context = useContext(Context)

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {props.contract} Threshold Token on Etherscan
        </Tooltip>
    );

    const {provider, contracts} = context.wallet
    let chainId, networkName, Taddress;
    if (provider && provider.networkVersion && contracts.T) {
        chainId = provider.networkVersion
        networkName = PUBLIC_CHAINS[chainId].toLowerCase();
        Taddress = contracts.T._address
    }

    async function AddToMetamask() {
        const tokenImage = 'https://stake.nucypher.network/static/media/t.f2a76c09.svg';
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: Taddress,
                        symbol: 'T',
                        decimals: 18,
                        image: tokenImage,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <InputBox>

            <Row noGutters>
                <Col className="d-flex justify-content-flex-start mb-1">
                    <h5>Threshold Balance</h5>
                </Col>
            </Row>

            <Row noGutters>
                <Col xs={6}>
                    <Row className="d-flex flex-row align-items-center align-content-center">
                        <Col xs={12} sm={6}>
                            <div className="assetDisplay">
                                <img src={require('../../assets/icons/t.svg')}/>
                                <TokenBalance label={"T"} balance={context.availableT.get}/>
                                <a href={makeEtherscanAccountLink(Taddress, networkName)}>
                                    <img className="contractIcon" src={require('../../assets/icons/contract.png')}/>
                                </a>
                            </div>

                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <PurpleButton onClick={AddToMetamask}>
                        <img className="mr-1" src={require('../../assets/icons/metamask.svg')}/>
                        Add to Metamask
                    </PurpleButton>
                </Col>
            </Row>
        </InputBox>)
}
