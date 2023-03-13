import { Checkbox, Row, Col } from "antd";
import React from "react";

interface IFCheckBox {
  disabled: boolean;
  id: string;
  onChange: (value?: any) => void;
  options: [];
  value: any;
}

const FCheckBox = ({ disabled, id, onChange, options, value }: IFCheckBox) => {
  return (
    <Checkbox.Group
      onChange={onChange}
      value={value}
      disabled={disabled}
      key={id}
    >
      <Row className="w-100">
        {options &&
          options.map((i: any, index: number) => (
            <Col
              key={`${index}-${i?.label}`}
              style={{ padding: "5px 0" }}
              className="h-100"
            >
              <Checkbox value={i?.value} key={`${index}-${i?.label}`}>
                {i?.label}
              </Checkbox>
            </Col>
          ))}
      </Row>
    </Checkbox.Group>
  );
};

export default FCheckBox;
