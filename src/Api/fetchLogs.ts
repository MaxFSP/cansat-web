import { QueryFunction } from "@tanstack/react-query";
import { APILogResponse } from "./APIResponseTypes";
import axios from "axios";

const fetchLogs: QueryFunction<APILogResponse> = async () => {
  const res = await axios.get(`https://maxfarfan.me/api`);
  return res.data;
};

export default fetchLogs;
