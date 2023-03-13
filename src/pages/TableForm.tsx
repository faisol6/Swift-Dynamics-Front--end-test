/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Row, Select, Table } from "antd";
import FormGenerate, { IFormItem } from "../components/form/FormGenerate";
import { NationalityList, NumberAreaCode } from "../tools/util";
import DelConfirmBtn from "../components/button/DelConfirmBtn";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { listTable } from "../tools/recoil/recoil-atom";
import {
  ITableList,
  _getDataSouce,
  _setDataSouce,
} from "../tools/localStorageOpt";
import Header from "../components/Header";
import { useTranslation } from "react-i18next";

export interface DataType {
  name: string;
  gender: string;
  phone: string;
  nationality: string;
}

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="66">
    {NumberAreaCode?.map((nb, idx: number) => (
      <Option key={idx} value={nb?.code}>{`${nb?.code}+`}</Option>
    ))}
  </Select>
);

const TableForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useRecoilState<ITableList[]>(listTable);
  const [dataSelect, setDataSelect] = useState<{
    selectedRowKeys: React.Key[];
    selectedRows: ITableList[] | any[];
  }>();

  const field: IFormItem[] = [
    {
      fieldProps: {
        type: "Select",
        name: "title",
        label: t("TITLE"),
        fieldOption: {
          rules: [{ required: true, message: `${t("PLASE")} ${t("TITLE")}` }],
        },
        innerOption: {
          placeholder: t("TITLE"),
          loading: false,
        },
        selectOption: {
          selectlist: [
            { value: "mr", name: t("MR") },
            { value: "mrs", name: t("MRS") },
          ],
          keyValue: "value",
          keyName: "name",
        },
      },
      colProps: { xs: 24, xl: 2, lg: 2, md: 3 },
    },
    {
      fieldProps: {
        name: "firstName",
        label: t("FISRTNAME"),
        fieldOption: {
          rules: [
            { required: true, message: `${t("PLASE")} ${t("FISRTNAME")}` },
          ],
        },
        innerOption: {
          placeholder: t("FISRTNAME"),
        },
      },
      colProps: { xs: 24, xl: 8, lg: 11, md: 10 },
    },
    {
      fieldProps: {
        name: "lastName",
        label: t("LASTNAME"),
        fieldOption: {
          rules: [
            { required: true, message: `${t("PLASE")} ${t("LASTNAME")}` },
          ],
        },
        innerOption: {
          placeholder: t("LASTNAME"),
        },
      },
      colProps: { xs: 24, xl: 8, lg: 11, md: 11 },
    },
    {
      fieldProps: {
        type: "DatePicker",
        name: "birth",
        label: t("BIRTDAY"),
        fieldOption: {
          rules: [{ required: true, message: `${t("PLASE")} ${t("BIRTDAY")}` }],
        },
        innerOption: {
          placeholder: t("BIRTDAY"),
          format: "DD/MM/YYYY",
        },
      },
      colProps: { xs: 24, xl: 6, lg: 8, md: 12 },
    },
    {
      fieldProps: {
        type: "Select",
        name: "nationality",
        label: t("NATIONALITY"),
        innerOption: {
          placeholder: t("NATIONALITY"),
          showSearch: true,
          loading: false,
        },
        selectOption: {
          selectlist: NationalityList,
          keyValue: "Nationality",
          keyName: "Nationality",
        },
      },
      colProps: { xs: 24, xl: 7, lg: 8, md: 12 },
    },
    {
      fieldProps: {
        name: "citizenId",
        label: t("CITIZEN"),
        fieldOption: {
          rules: [
            { required: true, message: `${t("PLASE")} ${t("CITIZEN")}` },
            {
              pattern: new RegExp("^\\d+(\\d+)*$"),
              message: t("PLASENUMBER"),
            },
          ],
        },
        innerOption: {
          placeholder: t("CITIZEN"),
          maxLength: 13,
        },
      },
      colProps: { xs: 24, xl: 10, lg: 8, md: 14 },
    },
    {
      fieldProps: {
        type: "Radio",
        label: t("GENDER"),
        name: "gender",
        innerOption: {
          options: [
            { label: t("MALE"), value: "Male" },
            { label: t("FEMALE"), value: "Female" },
            { label: t("UNISEX"), value: "Unisex" },
          ],
          keyValue: "label",
          keyName: "label",
        },
      },
      colProps: { xs: 24, xxl: 5, xl: 5, lg: 7, md: 10 },
    },
    {
      fieldProps: {
        name: "phone",
        label: t("MOBILE"),
        fieldOption: {
          rules: [
            { required: true, message: `${t("PLASE")} ${t("MOBILE")}` },
            {
              pattern: new RegExp("^[0][0-9]{9,9}$"),
              message: "NumberPhone is not valid! (0xxxxxxxxx)",
            },
          ],
        },
        innerOption: {
          placeholder: t("MOBILE"),
          addonBefore: selectBefore,
          maxLength: 10,
        },
      },
      colProps: { xs: 24, xl: 8, lg: 8, md: 12 },
    },
    {
      fieldProps: {
        name: "passport",
        label: t("PASSPORT"),
        fieldOption: {
          rules: [
            { required: false, message: `${t("PLASE")} ${t("PASSPORT")}` },
          ],
        },
        innerOption: {
          placeholder: t("PASSPORT"),
        },
      },
      colProps: { xs: 24, xl: 6, lg: 9, md: 12 },
    },
    {
      fieldProps: {
        name: "salary",
        label: t("SALARY"),
        fieldOption: {
          rules: [{ required: true, message: `${t("PLASE")} ${t("SALARY")}` }],
        },
        innerOption: {
          placeholder: t("SALARY"),
        },
      },
      colProps: { xs: 24, xl: 6, lg: 8, md: 12 },
    },
  ];

  const OnFinish = (value: any) => {
    const result = {
      ...value,
      name: `${value?.firstName} ${value?.lastName}`,
      birth: value?.birth.format("DD-MM-YYYY"),
    };
    const dataInfo = _getDataSouce();
    _setDataSouce([...dataInfo, result]);
    const reList = [result, ...dataSource];
    setDataSource(reList);
  };

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: ITableList[] | any[]
    ) => {
      setDataSelect({
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows,
      });
    },
  };

  const OnDeleteSelected = () => {
    const dataSelected = [...(dataSelect?.selectedRows || [])];
    let refact =
      dataSource?.filter(
        (item: any) =>
          !dataSelected?.some(
            (f) => f?.name?.toLowerCase() === item?.name?.toLowerCase()
          )
      ) || [];
    setDataSource(refact);
    setDataSelect({
      selectedRowKeys: [],
      selectedRows: [],
    });
  };

  const columns: any = [
    {
      title: t("NAME"),
      dataIndex: "name",
      sorter: (a: any, b: any) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: t("GENDER"),
      dataIndex: "gender",
      sorter: (a: any, b: any) => {
        return a.gender.localeCompare(b.gender);
      },
    },
    {
      title: t("PHONE"),
      dataIndex: "phone",
      sorter: (a: any, b: any) => {
        return a.phone.localeCompare(b.phone);
      },
    },
    {
      title: t("NATIONALITY"),
      dataIndex: "nationality",
      sorter: (a: any, b: any) => {
        return a.nationality.localeCompare(b.nationality);
      },
    },
    {
      title: t("ACTION"),
      dataIndex: "",
      align: "center" as "center",
      render: (data: any, row: any) => {
        return (
          <DelConfirmBtn
            onConfirm={() => {
              console.log(data);
              const dataTable = [...dataSource];
              const refact = dataTable?.filter(
                (item) =>
                  item?.name?.toLowerCase() !== data?.name?.toLowerCase()
              );
              setDataSource(refact);
              setDataSelect({
                selectedRowKeys: [],
                selectedRows: [],
              });
            }}
          />
        );
      },
    },
  ];

  return (
    <div className="App p-3">
      <Header title={t("TABLE")} />
      <FormGenerate field={field} onFinish={OnFinish} form={form} />
      <Row className="mt-3" align={"middle"}>
        <div style={{ color: "white" }} className="pr-1">
          {t("DELALLSELECT")}
        </div>
        <DelConfirmBtn onConfirm={OnDeleteSelected} />
      </Row>
      <Table
        rowKey={"index"}
        className="mt-1"
        scroll={{ x: 1000 }}
        rowSelection={{
          selectedRowKeys: dataSelect?.selectedRowKeys,
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={
          dataSource?.map((i: ITableList | any, idx: number) => {
            return { ...i, index: idx };
          }) || []
        }
      />
    </div>
  );
};

export default TableForm;
