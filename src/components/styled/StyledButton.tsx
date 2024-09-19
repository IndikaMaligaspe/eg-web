import styled from 'styled-components';

const StyledInputButton = styled.button<{$primary?: boolean}>`
  font-size: 1em;
  margin: 1em;
  padding: 1em;
  border-radius:0.5em;
  border:none;
  background: ${props => props.$primary ? "#fc7703" : "white"};
  color: ${props => props.$primary ? "white" : "#BF4F74"};
  cursor:pointer;
  width:15em;
` 

export default StyledInputButton;