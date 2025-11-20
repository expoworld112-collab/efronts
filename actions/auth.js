import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import Router from 'next/router';
import { API } from '../config';

// Utility functions for cookies and localStorage
export const setCookie = (key, value) => {
    if (typeof window !== 'undefined') {
        cookie.set(key, value, { expires: 1 });
    }
};

export const removeCookie = key => {
    if (typeof window !== 'undefined') {
        cookie.remove(key);
    }
};

export const getCookie = key => {
    if (typeof window !== 'undefined') {
        return cookie.get(key);
    }
};

export const setLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = key => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

export const getLocalStorage = key => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(key));
    }
};

// Handle response status codes and errors
export const handleResponse = async (response) => {
    if (!response.ok) { // Non-2xx status code
        let errorData = await response.json().catch(() => 'Unknown error');
        const errorMessage = errorData?.error || 'An unexpected error occurred';
        console.error('Error:', errorMessage);
        throw new Error(errorMessage);
    }
    return response;
};

// Signin & Signup Functions
export const preSignup = async (user) => {
    try {
        const response = await fetch(`${API}/pre-signup`, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        await handleResponse(response);
        return await response.json();
    } catch (err) {
        console.error('Pre-Signup Error:', err);
        throw err;
    }
};

export const signup = async (user) => {
    try {
        const response = await fetch(`${API}/signup`, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        await handleResponse(response);
        return await response.json();
    } catch (err) {
        console.error('Signup Error:', err);
        throw err;
    }
};

export const signin = async (user) => {
    try {
        const response = await fetch(`${API}/signin`, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        await handleResponse(response);
        return await response.json();
    } catch (err) {
        console.error('Signin Error:', err);
        throw err;
    }
};

// Signout and Authentication Functions
export const signout = async (next = () => {}) => {
    removeCookie('token');
    removeLocalStorage('user');
    try {
        const response = await fetch(`${API}/signout`, { method: 'GET' });
        await handleResponse(response);
        console.log('Signout success');
        next();
    } catch (err) {
        console.error('Signout Error:', err);
        throw err;
    }
};

// Authenticate User (after successful login/signup)
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

// Google Authentication
export const googleauthenticate = (data) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
};

// Check if user is authenticated
export const isAuth = () => {
    if (typeof window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            return getLocalStorage('user') || false;
        }
    }
};

// Update user information after login or change
export const updateUser = (user, next) => {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
        const auth = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({ ...auth, ...user }));
        next();
    }
};

// Forgot Password
export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${API}/forgot-password`, {
            method: 'PUT',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        await handleResponse(response);
        return await response.json();
    } catch (err) {
        console.error('Forgot Password Error:', err);
        throw err;
    }
};

// Reset Password
export const resetPassword = async (resetInfo) => {
    try {
        const response = await fetch(`${API}/reset-password`, {
            method: 'PUT',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(resetInfo),
        });
        await handleResponse(response);
        return await response.json();
    } catch (err) {
        console.error('Reset Password Error:', err);
        throw err;
    }
};
