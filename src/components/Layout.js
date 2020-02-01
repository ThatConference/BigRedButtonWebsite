import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const StyledDiv = styled.div`
  max-width: 120rem;
  margin: auto;
`;

const StyledHeader = styled.header`
  width: 100vw;
  min-height: 8rem;
  margin-bottom: 3rem;
  background-color: ${({ theme }) => theme.colors.gray};
`;

const Logo = styled.img`
  height: 7rem;
  padding: 1rem 2rem;
`;

const StyledFooter = styled.footer`
  width: 100vw;
  height: 12rem;
  margin-top: 3rem;
  background-color: ${({ theme }) => theme.colors.gray};
  display flex;
  position: absolute;
  bottom: 0;
`;

const MessageRoosterLogo = styled.img`
  width: 16rem;
  object-fit: contain;
  margin-right: 3rem;
`;

const FooterDetail = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 2.5rem;
`;

const Subtitle = styled.p`
  text-transform: uppercase;
  text-align: left;
  margin: 0;
  font-size: 1rem;
  line-height: 1;
  margin-right: 3rem;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const Layout = ({ children }) => (
  <>
    <StyledHeader>
      <Logo src="/images/THATConference.svg" alt="THAT Conference" />
    </StyledHeader>
    <StyledDiv>{children}</StyledDiv>
    <StyledFooter>
      <div style={{ flexGrow: 2 }} />
      <FooterDetail>
        <Subtitle>Powered By</Subtitle>
        <MessageRoosterLogo src="/images/message-rooster-logo.png" />
      </FooterDetail>
    </StyledFooter>
  </>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
