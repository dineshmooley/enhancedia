import { URL } from "../../RouterConst";

export const getQuestions = async () => {
  const res = await fetch(`${URL}/api/questions`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const getTopics = async () => {
  const res = await fetch(`${URL}/api/questions?id=topics`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const getQuestion = async (id) => {
  const res = await fetch(`${URL}/api/questions/${id}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const CreateQuestion = async (body) => {
  const res = await fetch(`${URL}/api/questions`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const DeleteQuestion = async (id) => {
  const res = await fetch(`${URL}/api/questions/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
