import { QueryFunction } from "@tanstack/react-query";
import { APILogResponse } from "./APIResponseTypes";
import axios from "axios";

const fetchLogs: QueryFunction<APILogResponse> = async () => {
  const res = await axios.get(`http://maxfarfan.me:3000/logs`);
  return res.data;
};

export default fetchLogs;
