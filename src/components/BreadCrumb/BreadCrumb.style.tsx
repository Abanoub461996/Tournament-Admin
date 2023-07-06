import styled from "styled-components";

export const BreadcrumbsContainer = styled.div`
  max-width: 1200px;
  margin-right: 10px;
  display: flex;
  font-family: 'Manrope', sans-serif !important;
`;

export const Crumb = styled.div`

  font-size: 1em;
  font-weight: 600;

  :after {
    content: ">";
    margin: 0px 10px;
    color: #e1e1e1;
  }
  :last-child:after {
    display: none;
  }
  a {
    color: #e1e1e1;
    text-decoration:none;
  }

  :last-child a {
    color: var(--main-color);
  }
`;
