import { useEffect, useState } from "react";



export default function useFetch(url: string = "", options = {}) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const request = {
        post: async (url: string, body: {}) => {
            await sendRequest(url, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        },
        patch: async (url: string, body: {}) => {
            await sendRequest(url, {
                method: "patch",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        },
        delete: async (url: string, body: {}) => {
            await sendRequest(url, {
                method: "delete",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        },
        get: async (url: string) => {
            await sendRequest(url);
        }
    }


    const sendRequest = async (url: string, options = {}, abortController = new AbortController()) => {
        setLoading(true);
        setData(null);
        await fetch(process.env.REACT_APP_API_URL + url, { ...options, signal: abortController.signal }).then(res => {
            if (!res.ok) {
                throw Error("can't fetch data!");
            }
            return res.json();
        }).then((data) => {
            setData(data);
            setLoading(false);
            setError("");
            if (!data.success) setError(data.message);
        }).catch((err) => {
            if (err.name === "AbortError") {
                console.log("fetch aborted");
                console.log(err);
            } else {
                setLoading(false);
                setError(err.message);
            }
        });
    }

    useEffect(() => {
        const abortController = new AbortController();
        if (url !== null && url !== "") {
            sendRequest(url, options);
        }
        return () => abortController.abort();
    }, [url]);

    return { data, loading, error, request };
}