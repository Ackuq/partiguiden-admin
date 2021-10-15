import React from 'react';
import { CircularProgress, styled } from '@mui/material';

const Container = styled('div')`
  display: flex;
  justify-content: center;
`;

const LoadingIndicator: React.FC = () => {
  return (
    <Container>
      <CircularProgress size={50} />
    </Container>
  );
};

export default LoadingIndicator;
