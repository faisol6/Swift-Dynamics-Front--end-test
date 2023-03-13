import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BtnLang from "../components/button/BtnLang";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="App">
      <BtnLang />
      <Row
        justify={"center"}
        align={"middle"}
        className="w-100 "
        style={{ height: "100vh" }}
      >
        <Col span={8} className="p-1">
          <Button
            className="w-100"
            style={{ height: 60 }}
            onClick={() => navigate("/geometry")}
            type="primary"
          >
            {t("GEOMETRY")}
          </Button>
        </Col>
        <Col span={8} className="p-1">
          <Button
            className="w-100"
            style={{ height: 60 }}
            onClick={() => navigate("/calculate")}
            type="primary"
          >
            {t("CALCULATE")}
          </Button>
        </Col>
        <Col span={8} className="p-1">
          <Button
            className="w-100"
            style={{ height: 60 }}
            onClick={() => navigate("/table")}
            type="primary"
          >
            {t("TABLE")}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
