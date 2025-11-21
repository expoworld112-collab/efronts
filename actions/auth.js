import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { API } from "../config";

// -----------------
// Cookie Helpers
// -----------------
export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, { expires: 1 });
  }
};

export const removeCookie = (key) => {
  if (typeof window !== "undefined") {
    cookie.remove(key);
  }
};

export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

// -----------------
// LocalStorage Helpers
// -----------------
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
};

// -----------------
// Handle Response
// -----------------
export const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "An unexpected error occurred");
  }
  return response;
};

// -----------------
// Auth API Calls
// -----------------
export const preSignup = async (user) => {
  const response = await fetch(`${API}/pre-signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include", // ✅ include cookies
  });
  await handleResponse(response);
  return response.json();
};

export const signup = async (user) => {
  const response = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });
  await handleResponse(response);
  return response.json();
};

export const signin = async (user) => {
  const response = await fetch(`${API}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });
  await handleResponse(response);
  return response.json();
};

export const signout = async (next = () => {}) => {
  removeCookie("token");
  removeLocalStorage("user");
  try {
    const response = await fetch(`${API}/signout`, {
      method: "GET",
      credentials: "include",
    });
    await handleResponse(response);
    next();
  } catch (err) {
    console.error("Signout Error:", err);
    throw err;
  }
};

// -----------------
// Authenticate Helpers
// -----------------
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (typeof window === "undefined") return false;
  const token = getCookie("token");
  if (token) return getLocalStorage("user") || false;
  return false;
};

export const updateUser = (user, next) => {
  if (typeof window !== "undefined") {
    const auth = getLocalStorage("user");
    if (auth) {
      setLocalStorage("user", { ...auth, ...user });
      next();
    }
  }
};

// -----------------
// Password Reset
// -----------------
export const forgotPassword = async (email) => {
  const response = await fetch(`${API}/forgot-password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    credentials: "include",
  });
  await handleResponse(response);
  return response.json();
};

export const resetPassword = async (resetInfo) => {
  const response = await fetch(`${API}/reset-password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resetInfo),
    credentials: "include",
  });
  await handleResponse(response);
  return response.json();
};
