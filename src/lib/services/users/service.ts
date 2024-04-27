import { URL } from "../../RouterConst";

export const getStudents = async () => {
  const res = await fetch(`${URL}/api/users?role=students`, {
    method: "GET",
  });
  const resData = await res.json();
  return resData;
};

export const getStaffs = async () => {
  const res = await fetch(`${URL}/api/users?role=staffs`, {
    method: "GET",
  });
  const resData = await res.json();
  return resData;
};

export const getDepartmentStaffs = async (id: string) => {
  const res = await fetch(`${URL}/api/users/?role=staffs&&departmentId=${id}`, {
    method: "GET",
  });
  const resData = await res.json();
  return resData;
};

export const getRole = async () => {
  const res = await fetch(`${URL}/api/users`, {
    method: "GET",
  });
  const resData = await res.json();
  return resData;
};
