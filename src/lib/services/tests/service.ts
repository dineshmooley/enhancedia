export const GetTestService = async (id: string) => {
  const res = await fetch(`/api/tests/${id}`);
  const result = await res.json();
  return result;
};

export const DeleteTestService = async (id: string) => {
  const res = await fetch(`/api/tests/${id}`, {
    method: "DELETE",
  });
  const result = await res.json();
  return result;
};

export const CreateTestService = async (data: any) => {
  const res = await fetch("/api/tests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

export const UpdateTestService = async (id: string, data: any) => {
  const res = await fetch(`/api/tests/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};
