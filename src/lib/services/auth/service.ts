import { URL } from "../../RouterConst";

export const SignUp = async (data: any) => {
  const res = await fetch(`${URL}/api/users`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  return resData;
};
