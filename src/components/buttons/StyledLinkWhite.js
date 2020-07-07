import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLinkWhite = styled(Link)`
    text-decoration: none;
    color: #FFFFFF;

    &:hover {
        text-decoration: underline;
    }
`;

export default (props) => <StyledLinkWhite {...props} />;