type ApiInit = RequestInit & { baseUrl?: string };

export async function apiFetch<T = unknown>(
	urlOrPath: string,
	init: ApiInit = {}
): Promise<T> {
	const isAbsolute = /^(?:https?:)?\/\//i.test(urlOrPath);
	const base = init.baseUrl ?? (process.env.NEXT_PUBLIC_BACKEND_URL || "");
	const fullUrl = isAbsolute
		? urlOrPath
		: `${(base || "").replace(/\/$/, "")}${urlOrPath.startsWith("/") ? "" : "/"}${urlOrPath}`;

	const response = await fetch(fullUrl, {
		cache: "no-store",
		...init,
		headers: {
			"Content-Type": "application/json",
			...(init.headers || {}),
		},
	});

	if (!response.ok) {
		let message: string | undefined;
		try {
			const data = await response.json();
			message = (data && (data.message || data.error)) as string | undefined;
		} catch {}
		throw new Error(`API ${response.status}: ${message || response.statusText}`);
	}

	// If there is no content
	if (response.status === 204) {
		return undefined as unknown as T;
	}

	return (await response.json()) as T;
}


