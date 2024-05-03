import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const LoadingAnimation = keyframes`
from {
    transform: rotate(0deg) scale(2);;
}
to {
    transform: rotate(360deg) scale(2);
}
`;

export const LoadingContainer = styled.div`
  display: inline-grid;
  border-radius: 50%;
  place-items: center;
  width: 16px;
  height: 16px;
  background: conic-gradient(white 80%, transparent 80%);
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  background-color: inherit;
  animation: ${LoadingAnimation} 1s linear infinite;
`;

export const LoadingMiddle = styled.div`
  background-color: inherit;
  width: 80%;
  height: 80%;
  border-radius: 50%;
`;
