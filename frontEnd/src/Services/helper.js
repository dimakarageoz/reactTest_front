
export const setToken = (token) => localStorage.setItem('token', token)
export const getToken = () => localStorage.getItem('token');

export const setEmail = (email) => localStorage.setItem('email', email)
export const getEmail = () => localStorage.getItem('email');

export const removeProps = () => localStorage.clear();

export const requestWithToken = () => `?token=${getToken()}`