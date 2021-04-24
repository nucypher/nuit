import React from 'react'
import { useContext } from 'react';
import { Breadcrumb, Col } from 'react-bootstrap/';
import { ThemeContext } from 'styled-components';
import {
    NavLink,
    useRouteMatch
} from 'react-router-dom'

const activeStyle = function(theme){
    return {
        color: theme.colors.text.standard
    }
}

export default (props) => {
    //[{path: 'some-path', label: "Some Page"}]

    let { url } = useRouteMatch();
    const theme = useContext(ThemeContext);

    return (
        <Col xs={12} className="d-flex justify-content-center">
            <Breadcrumb>
                {props.paths.map((path) => {
                    return path.enabled ? <Breadcrumb.Item linkAs="div" key={path.path}>
                            <NavLink activeStyle={activeStyle(theme)} to={`${url}/${path.path}`}>
                                {`${path.label}`}
                            </NavLink>
                    </Breadcrumb.Item>:<Breadcrumb.Item key={path.path} linkAs="div" active="true" style={{color: theme.colors.grey75}}>{`${path.label}`}</Breadcrumb.Item>
                })}
            </Breadcrumb>
        </Col>
    )

}