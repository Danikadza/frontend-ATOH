import axios from "axios";

const accessTokenValidation = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const accessTokenExpiresAt = localStorage.getItem('accessTokenExpiresAt');
    const refreshTokenExpiresAt = localStorage.getItem('refreshTokenExpiresAt');

    if (accessToken) {

            if (Date.now() > Number(accessTokenExpiresAt)) {
                const response = await axios.post('/auth/updateToken', {
                    refreshToken,
                });

                const data = response.data;
                localStorage.setItem('accessToken', data.accessToken);
                console.log(data.accessToken)
                if (response.data.accessToken) {
                    const isAccessTokenValid = true;
                    return isAccessTokenValid;
                }
                else {
                    const isAccessTokenValid = false;
                    return isAccessTokenValid;
                }
            } else {
                const isAccessTokenValid = true;
                return isAccessTokenValid;
            }
        
    } else {
        const isAccessTokenValid = false;
        return isAccessTokenValid;
    }
};


const axiosRequest = async (method: string, url: string, data?: object) => {

    const isAccessTokenValid = await accessTokenValidation();
    const token = localStorage.getItem('accessToken')
    axios.defaults.headers.common['Authorization'] = `${token}`;
    if (isAccessTokenValid) {
        if (method === 'get') {
          const response = await axios.get(url);
          return response.data; 
        } else if (method === 'post') {
          const response = await axios.post(url, data);
          return response.data; 
        }
    }
    else {
        console.log('Access token is not valid')
    }
}

export default axiosRequest