import { useState, useCallback } from "react";
interface State<T> {
    data: T | null;
    status: "start" | "end";
    error: null | string;
}
const initialState: State<null> = {
    data: null,
    status: "start",
    error: null,
}

const useAsync = <T>(userState?: State<T>) => {
    const [state, setState] = useState<State<T>>({ ...initialState, ...userState });
    const setData = (data: T) => {
        setState({
            data,
            error: null,
            status: "end"
        })
    }

    const setError = (error: any) => {
        setState({
            data: null,
            error: error,
            status: "end"
        })
    }

    const sendHttp = useCallback(
        (promise: Promise<any>) => {
            if (state.status === "end") {
                setState({
                    data: null,
                    error: null,
                    status: "start"
                })
            }
            if (!promise || !promise.then) {
                throw new Error("sendHttp should be a promise")
            }
            return promise.then((data) => {
                window.$messageApi.open({
                    type: 'success',
                    content: "service success",
                });
                setData(data)
                return Promise.resolve(data);
            }).catch((error) => {
                window.$messageApi.open({
                    type: 'error',
                    content: error,
                });
                setError(error);
                return Promise.reject(error);
            })
        },
        [state]
    );

    return {
        isLoading: state.status !== "end",
        error: state.error,
        setData,
        setError,
        sendHttp,
    }
}

export default useAsync;