import { URL } from "../../RouterConst";

export const getResult = async (testId: string) => {
  const res = await fetch(`${URL}/api/result?testId=${testId}`, {
    method: "GET",
  });
  const result = await res.json();
  return result;
};
