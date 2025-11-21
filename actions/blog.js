import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { isAuth } from './auth';
import queryString from 'query-string';

// ------------------------
// BLOG CRUD FUNCTIONS
// ------------------------

// Create blog
export const createBlog = async (blog, token) => {
  let endpoint = isAuth()?.role === 1 ? `${API}/blog` : `${API}/user/blog`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: blog, // FormData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Create Blog Error:", err);
    return { error: err.message };
  }
};

// Update blog
export const updateBlog = async (blog, token, slug) => {
  let endpoint = isAuth()?.role === 1 ? `${API}/blog/${slug}` : `${API}/user/blog/${slug}`;

  try {
    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: blog, // FormData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Update Blog Error:", err);
    return { error: err.message };
  }
};

// Remove blog
export const removeBlog = async (slug, token) => {
  let endpoint = isAuth()?.role === 1 ? `${API}/blog/${slug}` : `${API}/user/blog/${slug}`;

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Remove Blog Error:", err);
    return { error: err.message };
  }
};

// Get single blog
export const singleBlog = async (slug) => {
  try {
    const response = await fetch(`${API}/blog/${slug}`, { method: 'GET' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Single Blog Error:", err);
    return { error: err.message };
  }
};

// List blogs with categories and tags
export const listBlogsWithCategoriesAndTags = async () => {
  try {
    const response = await fetch(`${API}/blogs-categories-tags`, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("List Blogs Error:", err);
    return { error: err.message };
  }
};

// List all blogs
export const allblogs = async () => {
  try {
    const response = await fetch(`${API}/allblogs`, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("All Blogs Error:", err);
    return { error: err.message };
  }
};

// List related blogs
export const listRelated = async (slug) => {
  try {
    const response = await fetch(`${API}/blog/related/${slug}`, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("List Related Error:", err);
    return { error: err.message };
  }
};

// List blogs for specific user with pagination
export const list2 = async (username, page) => {
  try {
    const response = await fetch(`${API}/${username}/userblogs?page=${page}`, { method: 'GET' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("User Blog List Error:", err);
    return { error: err.message };
  }
};

// List blogs with pagination
export const list = async (page) => {
  try {
    const response = await fetch(`${API}/blogs?page=${page}`, { method: 'GET' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("List Blogs Error:", err);
    return { error: err.message };
  }
};

// Blog search
export const listSearch = async (params) => {
  const query = queryString.stringify(params);

  try {
    const response = await fetch(`${API}/blogs/search?${query}`, { method: 'GET' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Search Blogs Error:", err);
    return { error: err.message };
  }
};

// RSS feed
export const feedsApi = async () => {
  try {
    const response = await fetch(`${API}/rss`, {
      method: 'GET',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Feeds API Error:", err);
    return { error: err.message };
  }
};

// Get all blog slugs
// export const getAllBlogSlugs = async () => {
//   try {
//     const response = await fetch(`${API}/allblogslugs`, {
//       method: 'GET',
//       headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`API Error: ${response.status} - ${errorText}`);
//     }

//     return await response.json();
//   } catch (err) {
//     console.error("All Blog Slugs Error:", err);
//     return { error: err.message };
//   }
// };
export const getAllBlogSlugs = async () => {
  try {
    const res = await fetch(`${API}/allblogslugs`);

    const text = await res.text(); // read raw response

    // Check content type or if JSON is valid
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("ERROR: API returned non-JSON:", text.slice(0, 150));
      return [];
    }

  } catch (err) {
    console.error("getAllBlogSlugs fetch failed:", err);
    return [];
  }
};


// ------------------------
// FORM DATA UTILITY
// ------------------------
export const prepareBlogFormData = (values, checkedCategories = [], checkedTags = []) => {
  const formData = new FormData();
  formData.set('title', values.title);
  formData.set('mtitle', values.mtitle);
  formData.set('mdesc', values.mdesc);
  formData.set('slug', values.slug);
  if (values.photo instanceof File) formData.set('photo', values.photo);
  formData.set('body', values.body);
  formData.set('date', values.date);

  checkedCategories.forEach(c => formData.append('categories', c));
  checkedTags.forEach(t => formData.append('tags', t));

  return formData;
};
