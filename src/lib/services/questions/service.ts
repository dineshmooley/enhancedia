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

export const getTopicsByType = async (type: string) => {
  const res = await fetch(`${URL}/api/questions?type=${type}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const getQuestionsByTopic = async (topic) => {
  const res = await fetch(`${URL}/api/questions?topic=${topic}`, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const getPsychometricQuestions = async () => {
  const res = await fetch(`${URL}/api/questions?type=psychometric`, {
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

export const QuestionToTest = async (id, test, work) => {
  const res = await fetch(
    `${URL}/api/questions/${id}?testId=${test}&action=${work}`,
    {
      method: "PUT",
    }
  );
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
