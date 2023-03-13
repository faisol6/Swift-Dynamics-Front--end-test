import { Col, Row } from "antd";
import { useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

const Geometry = () => {
  const { t } = useTranslation();

  const [arr, setArr] = useState<any[]>([
    { id: "triangle-box" },
    { id: "triangle-cicle" },
    { id: "triangle-cicle-round" },
    { id: "trapezoid" },
    { id: "triangle-box-long" },
    { id: "parallelogram" },
  ]);
  const [swapGrid, setSwapGrid] = useState(true);

  const array_move = (position?: string | undefined) => {
    const newArr = [...arr];
    const to = position && position === "left" ? 5 : 0;
    const from = position && position === "left" ? 0 : 5;
    // 5 = to, 0 = from
    newArr.splice(to, 0, newArr.splice(from, 1)[0]);
    setArr(newArr);
  };

  const ControlListBtn = [
    {
      text: t("MOVESHAPE"),
      id: "triangle-left",
      onClick: () => array_move("left"),
    },
    {
      text: t("MOVEPOSITION"),
      id: "triangle-up",
      onClick: () => setSwapGrid(!swapGrid),
    },
    {
      text: t("MOVEPOSITION"),
      id: "triangle-down",
      onClick: () => setSwapGrid(!swapGrid),
    },
    { text: t("MOVESHAPE"), id: "triangle-right", onClick: () => array_move() },
  ];

  const Random = () => {
    let kept = [];
    let tmp = [];
    let old = [...arr];

    while (kept.length <= 5) {
      tmp.push(old.splice(Math.floor(Math.random() * old.length - 1), 1)[0]);
      kept.push(tmp.pop());
    }
    setArr(kept);
  };

  return (
    <div className="App p-3">
      <Header title={t("GEOMETRY")} />
      <Row justify={"center"} className="mb-2" gutter={[10, 10]}>
        {ControlListBtn?.map((ct, idx: number) => {
          return (
            <Col xl={6} lg={6} md={6} xs={12} key={idx}>
              <div className="block-gemetry">
                <div id={ct?.id} onClick={ct?.onClick} />
                <div className="text-geometry">{ct?.text}</div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Row justify={swapGrid ? "start" : "end"}>
        {arr.map(
          (i, idx: number) =>
            idx < 3 && (
              <Col
                style={{ padding: "0.3rem" }}
                xl={7}
                lg={7}
                md={7}
                xs={12}
                key={idx}
                onClick={Random}
              >
                <div className="block-gemetry">
                  <div id={i?.id} />
                </div>
              </Col>
            )
        )}
      </Row>
      <Row justify={swapGrid ? "end" : "start"}>
        {arr.map(
          (i, idx: number) =>
            idx >= 3 && (
              <Col
                style={{ padding: "0.3rem" }}
                xl={7}
                lg={7}
                md={7}
                xs={12}
                key={idx}
                onClick={Random}
              >
                <div className="block-gemetry">
                  <div id={i?.id} />
                </div>
              </Col>
            )
        )}
      </Row>
    </div>
  );
};

export default Geometry;
