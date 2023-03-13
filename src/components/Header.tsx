import { Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import BtnLang from "./button/BtnLang";
import { useTranslation } from "react-i18next";

const Header = ({ title = "" }: { title: string }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: "left" }}>
      <Row justify={"space-between"} align={"middle"}>
        <Button danger type="primary" onClick={() => navigate("/")}>
          {t("GOBACK")}
        </Button>
        <BtnLang />
      </Row>
      <div
        style={{
          color: "white",
          textAlign: "center",
          fontSize: 28,
          padding: "3rem 0",
        }}
      >
        {title}
      </div>
    </div>
  );
};

export default Header;
