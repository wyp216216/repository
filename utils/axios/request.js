import axios from "axios";
// 在发送请求之前做某件事
const INTERCEPTORS_REQUEST = (example) => {
  example.interceptors.request.use((config, b, c) => {
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  return example;
};

// 返回响应之后拦截
const INTERCEPTORS_RESPONSE = (example) => {
  example.interceptors.response.use((res) => {
    // 对响应数据做些事
    if (!res.data.success) {
      return Promise.resolve(res);
    }
    return res;
  }, (error) => {
    return Promise.reject(error);
  });
};

/**
 * @name wangyanpeng
 * @param {*} type 'post'|'get'
 * @returns
 */
const SEND = (type = "get") => {
  return (url, data = {}) => {
    /* 公共参数配置 */
    const CONFIG = { baseURL: "/api", timeout: 10000 };
    /* 请求拦截 */
    const INTERCEPTORS = (example) => {
      INTERCEPTORS_REQUEST(example);
      INTERCEPTORS_RESPONSE(example);
      return example;
    };
    /* 请求实例类型区分 */
    const methods = {
      get: () => {
        const AXIOS_INSTANCE = axios.create({
          ...CONFIG, params: data
        });
        return INTERCEPTORS(AXIOS_INSTANCE).get(url, data);
      },
      post: () => {
        const AXIOS_INSTANCE = axios.create({
          ...CONFIG, data: data
        });
        return INTERCEPTORS(AXIOS_INSTANCE).post(url, data);
      }
    };
    if (methods[type]) {
      return methods[type]();
    }
    throw new Error("Request type error");
  };
};

const POST = SEND("post");
const GET = SEND("get");

export { POST, GET };
