import { api } from '@/lib/api';
import { BASE_URL } from '@/lib/constants';
import { Button } from '@mantine/core';
import { useState } from 'react';
export default function HomePage() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const register = async (token: string) => {
    try {
      setIsloading(true);
      const rs = await api.get('/auth/success/' + token);
      setIsloading(false);
      console.log(rs);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };
  const handleGithubAuth = () => {
    const windowPopup = window.open(
      BASE_URL + '/auth/github',
      'popupWindow',
      'width=600,height=600'
    );
    if (windowPopup) {
      windowPopup.focus();
      window.addEventListener('message', async (event) => {
        if (event.origin !== BASE_URL) {
          return;
        }
        windowPopup.close();
        const token: string = event.data;
        register(token);
      });
    }
  };

  return (
    <>
      <h1>Hello world</h1>
      <Button loading={isLoading} onClick={handleGithubAuth}>
        Github Auth
      </Button>
    </>
  );
}
