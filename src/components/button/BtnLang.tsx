import { Row, Divider } from "antd";
import i18n from "../../i18n";
import { useRecoilState } from "recoil";
import { langChange } from "../../tools/recoil/recoil-atom";

const BtnLang = () => {
  const [lang, setLang] = useRecoilState(langChange);

  return (
    <Row align={"middle"} className="p-1">
      <div
        onClick={() => {
          setLang(true);
          i18n.changeLanguage("th");
        }}
        style={{
          cursor: "pointer",
          fontWeight: lang ? "bold" : "normal",
          color: "white",
        }}
      >
        TH
      </div>
      <Divider type="vertical" style={{ backgroundColor: "white" }} />
      <div
        onClick={() => {
          setLang(false);
          i18n.changeLanguage("en");
        }}
        style={{
          cursor: "pointer",
          fontWeight: !lang ? "bold" : "normal",
          color: "white",
        }}
      >
        EN
      </div>
    </Row>
  );
};

export default BtnLang;
