import { useState, useCallback, useContext } from "react";
import { ModalContext } from '@/components/provider/ModalProvider';
import CommonFunc from "@/tools/commonFunc";

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

const useRequestSync = <T>(userState?: State<T>) => {
    const [state, setState] = useState<State<T>>({ ...initialState, ...userState });
    const { closeModal, openModal } = useContext(ModalContext);
    const setData = useCallback((data: T) => {
        setState({
            data,
            error: null,
            status: "end"
        })
    }, [])

    const setError = (error: any) => {
        setState({
            data: null,
            error: error,
            status: "end"
        })
    }

    const sendHttp = useCallback(
        (promise: Promise<any>) => {
            openModal()
            if (state.status === "end") {
                setState({
                    data: null,
                    error: null,
                    status: "start"
                })
            }
            if (!promise || !promise.then) {
                CommonFunc.toggleMsg('warning', "sendHttp should be a promise")
                throw new Error("sendHttp should be a promise")
            }
            return promise.then((data) => {
                setData(data)
                closeModal()
                return Promise.resolve(data);
            }).catch((error) => {
                CommonFunc.toggleMsg('error', error)
                setError(error);
                closeModal()
                return Promise.reject(error);
            })
        },
        [state, closeModal, openModal, setData]
    );

    return {
        isLoading: state.status !== "end",
        error: state.error,
        setData,
        setError,
        sendHttp,
    }
}


export default useRequestSync;