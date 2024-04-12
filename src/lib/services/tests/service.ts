import { URL } from "../../RouterConst";

export const getQuestions = async () => {
  const res = await fetch(`${URL}/api/tests`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const getTopics = async () => {
  const res = await fetch(`${URL}/api/tests?id=topics`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const getQuestion = async (id) => {
  const res = await fetch(`${URL}/api/tests/${id}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};
