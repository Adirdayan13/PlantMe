import React, { useState } from "react";
import axios from "../../src/axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState();

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(url, values)
            .then(({ data }) => {
                if (!data.success) {
                    console.log("error");
                    setError(true);
                } else {
                    console.log("success");
                    location.replace("/");
                }
            })
            .catch(err => {
                console.log("error from post login: ", err);
                setError(true);
            });
    };

    return [error, handleSubmit];
}
