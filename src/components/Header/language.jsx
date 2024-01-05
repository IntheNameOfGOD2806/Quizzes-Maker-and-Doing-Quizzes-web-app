import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const Language = () => {
    const { t, i18n } = useTranslation();
  return (
    <>
      <NavDropdown style={{ marginRight: "30px" }} title={`${i18n.language==='vi'?'Vietnamese':'English'}`}>
        <NavDropdown.Item onClick={() => i18n.changeLanguage("en")}>English</NavDropdown.Item>
        <NavDropdown.Item onClick={() => i18n.changeLanguage("vi")}>Vietnamese</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Language;
