/* eslint-disable no-eval */
import { Card, Col, Row } from "antd";
import { useState } from "react";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

const Calculate = () => {
  const { t } = useTranslation();
  const [process, setProcess] = useState("");

  const NumCal = ({
    value,
    onClick,
  }: {
    value: number | string;
    onClick?: (value?: number | string | undefined) => void;
  }) => {
    return (
      <Col span={8}>
        <Row
          justify={"center"}
          align={"middle"}
          onClick={() => (onClick ? onClick() : setProcess(process + value))}
          className="num-btn-cal"
        >
          {value}
        </Row>
      </Col>
    );
  };

  const Operator = ({
    value,
    onClick,
  }: {
    value: number | string;
    onClick?: (value?: number | string | undefined) => void;
  }) => {
    return (
      <Row
        justify={"center"}
        align={"middle"}
        onClick={() => (onClick ? onClick() : setProcess(process + value))}
        className="operater-btn-cal"
      >
        {value}
      </Row>
    );
  };
  return (
    <div className="App p-3">
      <Header title={t("CALCULATE")} />
      <Row justify={"center"} className="mt-3">
        <Col xl={10} lg={12} md={16} xs={24}>
          <Card className="w-100">
            <Col span={24} className="result-cal">
              <b>{process}</b>
            </Col>
            <Row className="w-100" justify={"center"}>
              <Col xl={19} lg={19} md={19} xs={16}>
                <Row>
                  <NumCal value={7} />
                  <NumCal value={8} />
                  <NumCal value={9} />
                  <NumCal value={6} />
                  <NumCal value={5} />
                  <NumCal value={4} />
                  <NumCal value={3} />
                  <NumCal value={2} />
                  <NumCal value={1} />
                  <NumCal value={0} />
                  <NumCal value={"."} />
                  <NumCal value={"c"} onClick={() => setProcess("")} />
                </Row>
              </Col>
              <Col xl={5} lg={5} md={5} xs={8}>
                <Operator value={"+"} />
                <Operator value={"-"} />
                <Operator value={"*"} />
                <Operator value={"/"} />
              </Col>
            </Row>
            <Col span={24}>
              <Operator value={"="} onClick={() => setProcess(eval(process))} />
            </Col>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Calculate;
