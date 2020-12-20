import axios from 'axios';
import {message} from 'antd';

const isDev = process.env.NODE_ENV === 'development';
const instance = axios.create({
    baseURL: isDev ? 'http://localhost:3000' : window.location.origin
});

instance.interceptors.response.use((res) => {
    return res;
}, (err) => {
    console.log(JSON.stringify(err))
    message.error(`错误编码${err.response.status}: ${err.response.data.msg}`);
});

/**
 * 执行器
 */
export interface Executor {
    readonly id: string
    readonly name: string
}

/**
 * Result
 */
export interface Result<T = any> {
    recordsFiltered: number;
    data?: (T)[] | null;
    recordsTotal: number;
}

/**
 * Job
 */
export interface Job {
    id: number;
    jobGroup: number;
    jobCron: string;
    jobDesc: string;
    addTime: number;
    updateTime: number;
    author: string;
    alarmEmail: string;
    executorRouteStrategy: string;
    executorHandler: string;
    executorParam: string;
    executorBlockStrategy: string;
    executorTimeout: number;
    executorFailRetryCount: number;
    glueType: string;
    glueSource: string;
    glueRemark: string;
    glueUpdatetime: number;
    childJobId: string;
    jobStatus: string;
}

export const queryEnvs = () => instance.get<Array<string>>('/api/envs');
export const queryExecutors = (env: string) => instance.get<Executor[]>(`/api/executors/${env}`);
export const queryJobs = (env: string, jobGroup: string) => instance.get<Result<Job>>(`/api/jobs/${env}/${jobGroup}`);
export const addJobs = (env: string, jobs: string) => instance.post(`/api/jobs/add/${env}`, jobs);
