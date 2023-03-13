import { Col, Radio, Row } from "antd";
import React from "react";

interface IFRadio {
  disabled: boolean;
  id: string;
  onChange: (value?: any) => void;
  options: [];
  value: any;
}

const FRadio = ({ disabled, id, onChange, options, value }: IFRadio) => {
  return (
    <Radio.Group onChange={onChange} value={value} disabled={disabled} id={id}>
      <Row className="w-100">
        {options &&
          options.map((i: any, index: number) => (
            <Col
              key={`${index}-${i?.label}`}
              style={{ padding: "5px 0" }}
              className="h-100"
            >
              <Radio value={i?.value} key={`${index}-${i?.label}`}>
                {i?.label}
              </Radio>
            </Col>
          ))}
      </Row>
    </Radio.Group>
  );
};

export default FRadio;
