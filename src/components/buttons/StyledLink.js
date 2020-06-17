import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #A00000;

    &:hover {
        text-decoration: underline;
    }
`;

export default (props) => <StyledLink {...props} />;