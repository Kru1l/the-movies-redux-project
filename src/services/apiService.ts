import axios from "axios";

import {accessToken, baseURL} from "../constans";

const apiService = axios.create({baseURL});

apiService.interceptors.request.use(req => {
    req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
});

export {apiService};