import { useState } from 'react';
import axios from 'axios';

const GITHUB_BASE_URL = 'https://api.github.com/users';

export function useGithub() {
  const [userData, setUserData] = useState(null);
  const [topRepos, setTopRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState('generic');

  const fetchUser = async (username) => {
    setLoading(true);
    setError('');
    setErrorType('generic');

    try {
      // User profile and top repos are fetched in parallel to reduce waiting time.
      const [userResponse, reposResponse] = await Promise.all([
        axios.get(`${GITHUB_BASE_URL}/${username}`),
        axios.get(`${GITHUB_BASE_URL}/${username}/repos?sort=stars&per_page=6`)
      ]);

      setUserData(userResponse.data);
      setTopRepos(reposResponse.data || []);

      return {
        ok: true,
        data: userResponse.data,
        repos: reposResponse.data || []
      };
    } catch (requestError) {
      setUserData(null);
      setTopRepos([]);

      if (requestError?.response?.status === 404) {
        setError('User not found');
        setErrorType('not-found');
        return { ok: false, type: 'not-found' };
      }

      setError('Something went wrong');
      setErrorType('generic');
      return { ok: false, type: 'generic' };
    } finally {
      setLoading(false);
    }
  };

  return {
    userData,
    topRepos,
    loading,
    error,
    errorType,
    fetchUser
  };
}
