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

    const sendHttp = useCallback(
        (promise: Promise<any>) => {
            window.$messageApi.destroy();
            window.$messageApi.open({
                type: 'loading',
                content: 'Action in progress..',
                // duration: 0,
            });
            if (state.status === "end") {
                setState({
                    data: null,
                    error: null,
                    status: "start"
                })
            }
            if (!promise || !promise.then) {
                window.$messageApi.destroy()
                window.$messageApi.open({
                    type: 'warning',
                    content: "sendHttp should be a promise",
                });
                throw new Error("sendHttp should be a promise")
            }
            return promise.then((data) => {
                window.$messageApi.destroy()
                window.$messageApi.open({
                    type: 'success',
                    content: "service success",
                });
                setState({
                    data,
                    error: null,
                    status: "end"
                })
                return Promise.resolve(data);
            }).catch((error) => {
                window.$messageApi.destroy()
                window.$messageApi.open({
                    type: 'error',
                    content: error,
                });
                setState({
                    data: null,
                    error: error,
                    status: "end"
                })
                return Promise.reject(error);
            })
        },
        [state]
    );
    console.error("sendHttp", state)
    return {
        isLoading: state.status !== "end",
        error: state.error,
        sendHttp,
    }
}

export default useAsync;