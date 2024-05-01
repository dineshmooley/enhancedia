import { URL } from "../../RouterConst";

export const getResult = async (testId: string) => {
  const res = await fetch(`${URL}/api/result?testId=${testId}`, {
    method: "GET",
  });
  const result = await res.json();
  return result;
};

export const updateStatus = async (data: any) => {
  const res = await fetch(`${URL}/api/result`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  return resData;
};
