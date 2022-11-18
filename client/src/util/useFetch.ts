import { useEffect, useState } from "react";



export default function useFetch(url: string = "", options = {}) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const sendRequest = (url: string, options = {}, abortController = new AbortController()) => {
        setLoading(true);
        fetch(process.env.REACT_APP_API_URL + url, { ...options, signal: abortController.signal }).then(res => {
            if (!res.ok) {
                throw Error("can't fetch data!");
            }
            return res.json();
        }).then((data) => {
            setData(data);
            setLoading(false);
            setError("");
        }).catch((err) => {
            if (err.name === "AbortError") {
                console.log("fetch aborted");
                console.log(err);
            } else {
                setLoading(false);
                setError(err.message);
            }
        });
        return abortController;
    }

    useEffect(() => {
        const abortController = new AbortController();

        if (url !== null && url !== "") {
            sendRequest(url, options, abortController);
        }
        return () => abortController.abort();
    }, [url]);

    return { data, loading, error, sendRequest };
}