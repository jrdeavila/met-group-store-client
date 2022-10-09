import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useRoute } from "@/hooks";
export interface SidebarInterface {}

const Sidebar: React.FC<SidebarInterface> = () => {
  const { userRoutes } = useRoute();
  const navigate = useNavigate();

  return (
    <SidebarStyle>
      <div className="px-3 pt-5">
        {userRoutes.map((e, i) => (
          <SidebarItem
            key={i}
            active={location.pathname == e.path}
            onClick={() => navigate(e.path)}
          >
            <div className="item-icon">{e.icon}</div>
            <div className="item-name">{e.name}</div>
          </SidebarItem>
        ))}
      </div>
    </SidebarStyle>
  );
};

const SidebarItem = styled.div<{ active: boolean }>`
  margin-top: 0.25rem;
  color: var(--bs-gray-800);
  display: flex;
  justify-content: start;
  align-items: center;
  user-select: none;
  cursor: pointer;
  padding: 1rem 1rem;
  border-bottom: 1px solid var(--bs-gray-500);
  ${(props) =>
    props.active
      ? css`
          background-color: var(--bs-primary);
          border-radius: var(--bs-border-radius);
          color: var(--bs-gray-300);
          border-bottom: none;

          @media (max-width: 800px) {
            border-radius: var(--bs-border-radius);
          }
        `
      : ""}

  * {
    font-size: 18px;
    margin-right: 0.5rem;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  @media (max-width: 800px) {
    justify-content: center;
    .item-name {
      display: none;
    }

    .item-icon {
      margin-right: 0;
    }
  }
`;

export const SidebarStyle = styled.div`
  width: inherit;
  height: inherit;
  position: fixed;
  background-color: var(--bs-gray-300);
`;

export default Sidebar;
