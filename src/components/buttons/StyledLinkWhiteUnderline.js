import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLinkWhiteUnderline = styled(Link)`
    text-decoration: underline;
    color: #FFFFFF;

    &:hover {
        text-decoration: underline;
    }
`;

export default (props) => <StyledLinkWhiteUnderline {...props} />;