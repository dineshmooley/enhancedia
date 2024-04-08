import { URL } from "../../RouterConst";

export const getStudents = async () => {
  const res = await fetch(`${URL}/api/users?role=students`, {
    method: "GET",
  });
  const resData = await res.json();
  return resData;
};
