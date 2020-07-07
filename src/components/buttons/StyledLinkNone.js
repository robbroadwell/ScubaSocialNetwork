import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLinkNone = styled(Link)`
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
`;

export default (props) => <StyledLinkNone {...props} />;