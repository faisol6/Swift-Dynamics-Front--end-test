import { atom } from "recoil";
import { mockData } from "../util";
import { _getDataSouce } from "../localStorageOpt";
const dataInfo = _getDataSouce();

export const listTable = atom({
  key: "listTable",
  default: [...dataInfo, ...mockData],
});

export const langChange = atom({
  key: "langChange",
  default: false,
});
