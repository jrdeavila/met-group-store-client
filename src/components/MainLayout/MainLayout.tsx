import React from "react";
import styled from "styled-components";
import { AppBar } from "../AppBar";
import { Sidebar } from "../Sidebar";
import "@/styles/main.scss";

export interface MainLayoutInterface {
  children?: React.ReactNode;
  withSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutInterface> = ({
  children,
  withSidebar,
}) => {
  return (
    <MainLayoutStyle>
      <HeadingContent>
        <AppBar />
      </HeadingContent>
      <MainContent>
        {withSidebar ??
          (true && (
            <SidebarContent>
              <Sidebar />
            </SidebarContent>
          ))}
        <BodyContent fullWidth={withSidebar ?? true}>{children}</BodyContent>
      </MainContent>
    </MainLayoutStyle>
  );
};

const HeadingContent = styled.div`
  width: 100%;
  min-height: 10%;
  background-color: var(--bs-gray-100);
`;
const MainContent = styled.div`
  width: 100%;
  height: 90%;
  display: inline-flex;
`;

const SidebarContent = styled.div`
  width: 20%;
  height: 100%;

  @media (max-width: 500px) {
    display: none;
  }
`;
const BodyContent = styled.div<{ fullWidth: boolean }>`
  height: 100%;
  padding-top: 2%;
  width: ${(props) => (props.fullWidth ? "80%" : "100%")};
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const MainLayoutStyle = styled.div`
  width: 100%;
  height: 99.6vh;
`;

export default MainLayout;
