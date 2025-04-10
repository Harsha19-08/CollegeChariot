import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FooterWrapper = styled.footer`
  background-color: #1743e3;
  color: #fff;
  padding: 60px 0;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: #fff;
    font-size: 24px;
    margin: 0 10px;
    transition: color 0.3s ease;
    &:hover {
      color: black;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <p>&copy; 2024 College Chariot. All rights reserved.</p>
        <SocialIcons>
          <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/company/yourpage" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </SocialIcons>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;