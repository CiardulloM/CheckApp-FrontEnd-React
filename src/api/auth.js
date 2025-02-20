import axios from 'axios';
import instance from './axios.js';

export const loginRequest = (user, verifyCodeId) => instance.post(`/login`, { ...user, verifyCodeId });
export const registerRequest = (user, verifyCodeId) => instance.post(`/register`, { ...user, verifyCodeId });
export const logoutRequest = () => instance.get(`/logout`);
export const verifyToken = () => instance.get(`/auth/verify`);
export const sendEmail = (user) => instance.post('/getverificationcode', user);
