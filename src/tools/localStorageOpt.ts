export interface ITableList {
  name: string;
  gender: string;
  phone: string;
  nationality: string;
}

const _getDataSouce = () => {
  const list = localStorage.getItem("data_source") || "";
  let tableList = list ? JSON?.parse(list) : [];
  return tableList;
};

const _setDataSouce = (listMenu: ITableList[]) => {
  localStorage.setItem("data_source", JSON.stringify(listMenu));
};

const _clearLocalStorage = () => {
  // localStorage.removeItem("data_source");
  localStorage.clear();
};

export { _clearLocalStorage, _setDataSouce, _getDataSouce };
