import { URL } from "../../RouterConst";

export const getDepartments = async () => {
  const res = await fetch(`${URL}/api/departments`, {
    method: "GET",
  });
  const data = await res.json();
  return data.data;
};

export const addDepartment = async (name: string) => {
  const res = await fetch(`${URL}/api/departments`, {
    method: "POST",
    body: JSON.stringify({ name: name }),
  });
  const data = await res.json();
  return data;
};

export const deleteDepartment = async (id: string) => {
  const res = await fetch(`${URL}/api/departments/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
