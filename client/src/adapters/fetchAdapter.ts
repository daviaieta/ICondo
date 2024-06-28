import axios from "axios";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetchAdapter = async ({
  method,
  path,
  body,
}: {
  method: HttpMethod;
  path: string;
  body?: Record<any, any>;
}) => {
  const res = await axios({
    method,
    baseURL: "http://localhost:5000/" + path,
    data: body,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responses = {
    data: res.data,
    status: res.status,
    statusText: res.statusText,
  };
  return responses;
};
