import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  DatePicker,
} from "antd";
import { ReactElement, ReactNode } from "react";
import { _isEmpty } from "../../tools/util";
import FRadio from "../field/FRadio";

export interface IFormItem {
  fieldProps: IFieldProp;
  colProps?: object;
}

export interface IFieldProp {
  type?: string;
  name: string;
  label: string | ReactNode;
  loading?: boolean | string;
  fieldOption?: {} | any;
  innerOption?: {} | any;
  fieldList?: any[];
  selectOption?: {
    selectlist?: [] | any;
    keyValue: string;
    keyName: string;
  };
}

type PropsForm = {
  form?: FormInstance;
  field: IFormItem[];
  onFinish?: (values?: any) => void;
  onCancel?: (values?: any) => void;
  formOption?: any;
  actionBtn?: boolean;
  actionBtnCol?: object;
  onlyField?: boolean;
  cardClass?: string;
  formClass?: string;
};

const { Option } = Select;
const { TextArea } = Input;

const FormGenerate = ({
  form,
  field,
  onFinish,
  onCancel,
  actionBtn = true,
  formOption,
  actionBtnCol,
  onlyField = false,
  cardClass = "my-2",
  formClass = "",
}: PropsForm) => {
  const HandleOnFinish = (values: any) => {
    let result: any = {};
    for (const [key, value] of Object.entries(values)) {
      result[key] =
        typeof value === "boolean" ? value : _isEmpty(value) ? "" : value;
    }
    onFinish && onFinish(result);
  };

  const generateField = (_field: IFormItem[]): ReactElement[] => {
    return _field.map((item: any, index: number) => {
      const option =
        item?.fieldProps?.type === "Switch"
          ? { valuePropName: "checked", ...item?.fieldProps?.fieldOption }
          : { ...item?.fieldProps?.fieldOption };

      return (
        <Col
          key={index}
          {...(item.colProps || { xl: 6, lg: 6, md: 8 })}
          style={{
            alignSelf: _isEmpty(item?.fieldProps?.label) ? "end" : "start",
          }}
        >
          <Form.Item
            label={
              <span style={{ color: "#757783" }}>
                {item?.fieldProps?.label}
              </span>
            }
            id={item?.fieldProps?.name}
            name={item?.fieldProps?.name}
            {...option}
          >
            {ChildrenRender(item.fieldProps)}
          </Form.Item>
        </Col>
      );
    });
  };

  const ChildrenRender = (field: IFieldProp) => {
    const isLoading = field?.innerOption?.loading || false;
    const isSuffix: ReactNode | string | boolean =
      field?.innerOption?.suffix || false;
    const isDisabled: boolean = field?.innerOption?.disabled || isLoading;

    let innerOpt = {};
    if (!_isEmpty(field?.innerOption)) {
      for (const [key, value] of Object.entries(field?.innerOption)) {
        if (
          field?.type !== "Select" &&
          field?.type !== "DatePicker" &&
          key !== "loading"
        ) {
          innerOpt = { ...innerOpt, [key]: value };
        }
      }
    }

    const inputOpt =
      field?.type !== "Select" && field?.type !== "DatePicker"
        ? innerOpt
        : field?.innerOption;

    const fieldOption = {
      ...inputOpt,
      disabled: isDisabled,
      suffix: isSuffix ? (
        isSuffix
      ) : isLoading ? (
        <LoadingOutlined style={{ color: "#fed189", fontSize: 14 }} />
      ) : null,
    };

    return field?.type === "DatePicker" ? (
      <DatePicker {...fieldOption} className="w-100" />
    ) : field?.type === "TextArea" ? (
      <TextArea {...fieldOption} maxLength={100} />
    ) : field?.type === "Select" ? (
      <Select {...fieldOption}>
        {field?.selectOption?.selectlist?.map((item: any, idx: number) => (
          <Option
            key={`${idx}`}
            value={field?.selectOption && item[field?.selectOption.keyValue]}
          >
            {field?.selectOption && item[field?.selectOption.keyName]}
          </Option>
        ))}
      </Select>
    ) : field?.type === "Password" ? (
      <Input.Password {...fieldOption} />
    ) : field?.type === "Radio" ? (
      <FRadio {...fieldOption} />
    ) : field?.type === "Number" ? (
      <InputNumber className="w-100" controls={false} {...fieldOption} />
    ) : (
      <Input {...fieldOption} />
    );
  };

  const ActionBtn = () => {
    return (
      <Col {...(actionBtnCol || { xl: 3, lg: 4, md: 6 })}>
        <Button
          className="w-100 action-form-btn"
          style={{ marginTop: "0.5rem" }}
          onClick={() => form?.submit()}
        >
          SUBMIT
        </Button>
      </Col>
    );
  };

  return onlyField ? (
    <Row gutter={10} align="middle" className={`${formClass}`}>
      {generateField(field)}
    </Row>
  ) : (
    <Card className={`w-100 ${cardClass}`}>
      <Form
        className={`${formClass}`}
        scrollToFirstError
        layout={"vertical"}
        form={form}
        onFinish={HandleOnFinish}
        {...formOption}
      >
        <Row gutter={10} align="middle">
          {generateField(field)}
          {actionBtn && ActionBtn()}
        </Row>
      </Form>
    </Card>
  );
};

export default FormGenerate;
