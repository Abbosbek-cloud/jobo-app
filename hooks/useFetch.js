import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(endpoint, query) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": "e13979ae19msha2393ed0d8f1301p1d89b8jsne7eac94c54f3",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  async function fetchFunction() {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFunction();
  }, []);

  function reFetch() {
    setIsLoading(true);
    fetchFunction();
  }

  return { data, isLoading, error, reFetch };
}

export default useFetch;
