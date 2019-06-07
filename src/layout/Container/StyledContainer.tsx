import styled from "styled-components";
import { breakpoints } from "../../components/ui/globalStyles";
export const StyledConsole = styled.div`
 padding: 20px;
@media (${breakpoints.sm}) {
    padding: 0px  20px

  }

  @media (${breakpoints.md}) {
    padding: 0px  7%
  }

  @media (${breakpoints.lg}) {
    padding: 0px  18%
  }
`;

export default StyledConsole;