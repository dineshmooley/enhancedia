import { URL } from "../../RouterConst";

export const getClass = async (id: string) => {
  const res = await fetch(`${URL}/api/classes/${id}`, {
    method: "GET",
  });
  const data = await res.json();
  return data.data;
};
