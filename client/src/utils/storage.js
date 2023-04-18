const getStoredToken = () => {
    return JSON.parse(localStorage.getItem('sc-token'));
};

const setStoredToken = (token) => {
    return localStorage.setItem('sc-token', JSON.stringify(token));
};

const clearStoredToken = () => {
    localStorage.removeItem('sc-token');
};

const getStoredUser = () => {
    return JSON.parse(localStorage.getItem('sc-user'));
};

const setStoredUser = (user) => {
    return localStorage.setItem('sc-user', JSON.stringify(user));
};

const clearStoredUser = () => {
    localStorage.removeItem('sc-user');
};

export {
    getStoredToken,
    setStoredToken,
    clearStoredToken,
    getStoredUser,
    setStoredUser,
    clearStoredUser
};