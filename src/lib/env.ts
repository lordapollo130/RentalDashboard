export const env = {
	/** Base URL for your backend API (client-safe). */
	backendUrl:
		process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || "http://localhost:5173",
};

export function getBackendUrl(): string {
	return env.backendUrl.replace(/\/$/, "");
}


