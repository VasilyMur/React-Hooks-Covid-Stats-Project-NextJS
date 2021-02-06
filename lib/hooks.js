import { useEffect, useState } from 'react';

export const useGetCountries = apiUrl => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(apiUrl)
        .then(res => res.json())
        .catch(err => console.log(err));

      setData(response);
    };
    fetchData();
  }, [apiUrl]);

  return {
    data,
  };
};

export const useGetStats = country => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  function pause() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      await pause();

      const response = await fetch(
        `https://covid19.mathdro.id/api/countries/${country}`
      )
        .then(res => res.json())
        .catch(err => console.log(err));

      if (!response.error) {
        setData(response);
      } else {
        setError(response.error.message);
      }

      setLoading(false);
    };
    fetchData();
  }, [country]);

  return {
    data,
    error,
    loading,
  };
};
