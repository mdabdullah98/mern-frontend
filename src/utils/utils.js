export const BASE_URL = "http://localhost:4000";
// "http://ec2-35-154-96-163.ap-south-1.compute.amazonaws.com/api";

export const token = JSON.parse(sessionStorage.getItem("token"));

export const headers = {
  headers: { Authorization: `${token}` },
};

export const PaginationNumber = (totalPage, postPerPage) => {
  let numberArr = [];
  for (let i = 1; i <= Math.ceil(totalPage / postPerPage); i++) {
    numberArr.push(i);
  }
  return numberArr;
};

export const setTimeOutFunc = (timer, setStatus, val) => {
  setTimeout(() => {
    setStatus(val);
  }, timer);
};
