import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserInfoAuth = () => {
    const [isAuthenticated, setAuthenticationStatus] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkIfAuthenticated = async () => {
            try {
                // const result = await axios({
                //     url: "http://localhost:4000/",
                //     method: "GET",
                //     withCredentials: "include",
                //     headers: {
                //       Accept: "application/json",
                //       "Content-Type": "application/json",
                //       "Access-Control-Allow-Credentials": true
                //     }
                // });
                // console.log("result data", result.data);

                const mockData = {
                    name: 'Jae Hoon Yoo',
                    screenName: 'benyoo5222',
                    twitterId: '963230759946506240',
                    profileImageUrl: 'http://pbs.twimg.com/profile_images/1300914657700478983/Kxtn3dB8_normal.jpg',
                    access_token_key: '963230759946506240-d91uJdoNUzVsaFjy7tUvp0hwuSgtGWL',
                    access_token_secret: 'lwVWJZh6SGjym8GL0ZnZ6FWmBubJGVPlk6KMS74qgeKRg'
                };

                setAuthenticationStatus(true);
                //setUser({...result.data.user});
                setUser({...mockData});
            } catch (err) {
                console.log("Error checking auth status", err);
                setAuthenticationStatus(false);
            }
        };

        checkIfAuthenticated();
    }, []);

    return {
        isAuthenticated,
        setAuthenticationStatus,
        user,
        setUser,
    };
};

export default useUserInfoAuth;