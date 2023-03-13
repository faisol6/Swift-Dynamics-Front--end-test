import { QuestionCircleOutlined, DeleteFilled } from "@ant-design/icons";
import { Popconfirm, Button } from "antd";
import { useTranslation } from "react-i18next";

interface IBtnDelCon {
  onConfirm?: (value?: any) => void;
  onCancel?: (value?: any) => void;
  disabled?: boolean;
}

const DelConfirmBtn = ({
  onConfirm,
  onCancel,
  disabled = false,
}: IBtnDelCon) => {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: "center" }}>
      {disabled ? (
        <Button
          className="ricycle-btn"
          onClick={(e) => {
            e.stopPropagation();
          }}
          disabled={disabled}
        >
          <DeleteFilled />
        </Button>
      ) : (
        <Popconfirm
          className="pop-faq"
          placement="top"
          title={t("AREYOUSURE")}
          onConfirm={(e: any) => {
            e.stopPropagation();
            onConfirm && onConfirm();
          }}
          onCancel={(e: any) => {
            e.stopPropagation();
            onCancel && onCancel();
          }}
          okType="danger"
          okText={t("DEL")}
          cancelText={t("CANCEL")}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okButtonProps={{
            style: { width: 70, height: 30 },
          }}
          cancelButtonProps={{
            style: { width: 70, height: 30 },
          }}
        >
          <Button
            className="ricycle-btn"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DeleteFilled />
          </Button>
        </Popconfirm>
      )}
    </div>
  );
};

export default DelConfirmBtn;
