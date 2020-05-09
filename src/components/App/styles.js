import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CallEmpty = styled.div`
  width: 100%;
  height: 100%;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CallVideo = styled.video`
  flex: 1;
  background-color: #2d3436;
  transform: scaleX(-1);
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;
`;

export const CallForm = styled.form`
  width: 100%;
  max-width: 420px;
  display: flex;
  align-self: center;
  justify-content: center;

  position: absolute;
  z-index: 10;
  bottom: 32px;
`;

export const CallInput = styled.input`
  border-radius: 24px;
  border: none;
  margin-right: 16px;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 16px;
  outline: none;
  flex: 1;
`;

export const CallButton = styled.button`
  height: 48px;
  width: fit-content;
  border-radius: 24px;
  border: none;
  font-size: 16px;
  background-color: #00b894;
  color: white;
  padding-left: 24px;
  padding-right: 24px;

  &:focus,
  &:hover {
    outline: none;
    opacity: 0.85;
    cursor: pointer;
  }

  &.in_call {
    background-color: #d63031;
  }
`;
