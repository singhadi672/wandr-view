import axios from "axios";

export const YOUTUBE_LINK =
  "https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=50";

export const API_KEY = "AIzaSyBaKOviqO4JBR2O4f5MSze0v-DijMGSEUw";

export async function axiosCall(method, url, data) {
  if (method === "GET" || "get") {
    return await axios({ method: method, url: url });
  }
  return await axios({ method: method, url: url, data: data });
}
