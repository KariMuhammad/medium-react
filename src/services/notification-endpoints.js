import axios from "axios";
import config from "../config";

export const endpoint = axios.create({
  baseURL: config.serverDomain,
  headers: {
    Accept: "application/json",
  },
});

export async function getNotificationStatus(token) {
  try {
    const response = await endpoint.get("/notifications/status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch ({ data }) {
    console.log(data.errors);
  }
}

export async function fetchNotifications({ page = 1, token, filter }) {
  const path = `/notifications?page=${page}`;
  if (filter) path += `&type=${filter}`;

  try {
    const response = await endpoint.get(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch ({ data }) {
    console.log(data.errors);
  }
}
