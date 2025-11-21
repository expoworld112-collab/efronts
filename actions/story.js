import { API } from '../config';

// Utility: SAFE JSON PARSER
async function safeJSON(res) {
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        console.error("❌ API returned non-JSON:", text);
        return null;
    }
}

export const createwebstory = async (story, token) => {
    try {
        const res = await fetch(`${API}/webstory`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: story
        });

        return await safeJSON(res);
    } catch (err) {
        console.error("Create Story Error:", err);
        return null;
    }
};


// ⭐ FIXED — prevents build failure
export const singleStory = async (slug) => {
    try {
        const res = await fetch(`${API}/webstories/${slug}`);
        return await safeJSON(res);
    } catch (err) {
        console.error("Single Story Error:", err);
        return null;
    }
};


export const list = async () => {
    try {
        const res = await fetch(`${API}/allwebstories`);
        return await safeJSON(res);
    } catch (err) {
        console.error("List Stories Error:", err);
        return [];
    }
};


// ⭐⭐ MAIN FIX — THIS WAS BREAKING VERCEL
export const allslugs = async () => {
    try {
        const res = await fetch(`${API}/allslugs`);
        const data = await safeJSON(res);

        return Array.isArray(data) ? data : [];
    } catch (err) {
        console.error("All Slugs Error:", err);
        return [];
    }
};


export const sitemap = async () => {
    try {
        const res = await fetch(`${API}/sitemap`);
        return await safeJSON(res);
    } catch (err) {
        console.error("Sitemap Error:", err);
        return [];
    }
};


export const DeleteStory = async (slug, token) => {
    try {
        const res = await fetch(`${API}/webstorydelete/${slug}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        return await safeJSON(res);
    } catch (err) {
        console.error("Delete Story Error:", err);
        return null;
    }
};


export const updateStory = async (story, token, slug) => {
    try {
        const res = await fetch(`${API}/webstoriesupdate/${slug}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: story
        });

        return await safeJSON(res);
    } catch (err) {
        console.error("Update Story Error:", err);
        return null;
    }
};
