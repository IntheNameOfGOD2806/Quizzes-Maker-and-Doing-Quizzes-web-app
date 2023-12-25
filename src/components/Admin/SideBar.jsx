import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
  FaAirbnb,
} from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import { DiGithubBadge } from "react-icons/di";

import sidebarBg from "../../assets/bg1.jpg";

const SideBar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <div className="sidebar-container">
        <ProSidebar
          image={sidebarBg}
          collapsed={collapsed}
          toggled={toggled}
          breakPoint="md"
          onToggle={handleToggleSidebar}
        >
          <SidebarHeader>
            <div
              style={{
                padding: "24px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 14,
                letterSpacing: "1px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <DiGithubBadge size={"3em"} />{" "}
              <span
                style={{
                  marginLeft: "10px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Admin DashBoard
              </span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem
                icon={<FaTachometerAlt />}
                // suffix={<span className="badge red">Dat</span>}
              >
                <NavLink to="">dashboard</NavLink>
              </MenuItem>
              <MenuItem icon={<FaGem />}> components</MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu
                suffix={<span className="badge yellow"></span>}
                icon={<FaGem />}
                title={"Manage"}
              >
                <MenuItem>
                  {" "}
                  <Link to="ManageUser">Manage Users</Link>{" "}
                </MenuItem>

                <MenuItem>
                  {" "}
                  <Link to="ManageQuiz">Manage Quiz</Link>{" "}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link to="ManageQuestion">Manage Question</Link>{" "}
                </MenuItem>
              </SubMenu>
              <SubMenu
                prefix={<span className="badge gray"></span>}
                icon={<FaHeart />}
              >
                <MenuItem> 1</MenuItem>
                <MenuItem> 2</MenuItem>
                <MenuItem> 3</MenuItem>
              </SubMenu>
              <SubMenu
                prefix={<span className="badge gray"></span>}
                icon={<FaHeart />}
              >
                <MenuItem> 1 </MenuItem>
                <MenuItem> 2 </MenuItem>
                <SubMenu title={`$ 3`}>
                  <MenuItem> 3.1 </MenuItem>
                  <MenuItem> 3.2 </MenuItem>
                  <SubMenu title={`$ 3.3`}>
                    <MenuItem> 3.3.1 </MenuItem>
                    <MenuItem> 3.3.2 </MenuItem>
                    <MenuItem> 3.3.3 </MenuItem>
                  </SubMenu>
                </SubMenu>
              </SubMenu>
            </Menu>
          </SidebarContent>

          <SidebarFooter style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: "20px 24px",
              }}
            >
              <a
                href="https://github.com/azouaoui-med/react-pro-sidebar"
                target="_blank"
                className="sidebar-btn"
                rel="noopener noreferrer"
              >
                {/* <FaGithub /> */}
                <FaAirbnb></FaAirbnb>
                <span
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  Sources
                </span>
              </a>
            </div>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};
export default SideBar;
