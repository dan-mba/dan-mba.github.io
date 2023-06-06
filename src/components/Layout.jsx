import {styled} from '@mui/material/styles'
import NavBar from "./NavBar";

const StyledContainer = styled('div')({
  width: '100%',
  boxSizing: 'border-box',
  margin: '0 auto',
});

export default function Layout({children}) {
  return (
    <>
      <NavBar/>
      <StyledContainer>
        {children}
      </StyledContainer>
    </>
  );
};
