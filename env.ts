export const getEnv = () => {
    const viteEnv =
        typeof import.meta !== "undefined" && import.meta.env
            ? import.meta.env
            : undefined;

    return {
        VITE_API_BASE_URL: viteEnv?.VITE_API_BASE_URL ?? "http://localhost:3000/api",
        VITE_API_KEY: viteEnv?.VITE_API_KEY ?? "",
    };
};
