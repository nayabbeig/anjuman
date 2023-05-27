import axios from "axios";
import path from "../features/router/paths";

const axiosBaseQuery =
  ({ baseUrl = "" }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: path.host + baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err?.status,
          errors: err?.data?.errors,
        },
      };
    }
  };

export default axiosBaseQuery;
