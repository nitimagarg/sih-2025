
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';

// A mock user type
export interface SimpleUser {
	displayName: string | null;
	email: string | null;
	photoURL?: string | null; // Keep photoURL for compatibility with UI
}

export function useAuth() {
	const { data: session, status } = useSession();
	const [fallbackUser, setFallbackUser] = useState<SimpleUser | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Load fallback user for the credentials form flow (localStorage)
		try {
			const storedUser = localStorage.getItem('skillSageUser');
			if (storedUser) {
				setFallbackUser(JSON.parse(storedUser));
			}
		} catch (error) {
			console.error("Failed to parse user from localStorage", error);
			localStorage.removeItem('skillSageUser');
		} finally {
			setIsInitialized(true);
		}
	}, []);

	// Derive canonical user and loading state
	const user: SimpleUser | null = session?.user
		? {
			displayName: session.user.name ?? null,
			email: session.user.email ?? null,
			photoURL: session.user.image ?? null,
		}
		: fallbackUser;

	const loading = !isInitialized || status === 'loading';

	const signIn = (
		provider: string,
		options: { callbackUrl: string },
		userData?: { displayName: string; email: string }
	) => {
		if (provider === 'google') {
			// Delegate to NextAuth Google provider
			return nextAuthSignIn('google', { callbackUrl: options.callbackUrl });
		}
		// Preserve existing credentials fallback (localStorage)
		if (userData) {
			const newUser: SimpleUser = {
				displayName: userData.displayName,
				email: userData.email,
				photoURL: `https://api.dicebear.com/8.x/initials/svg?seed=${userData.displayName}`,
			};
			localStorage.setItem('skillSageUser', JSON.stringify(newUser));
			setFallbackUser(newUser);
		}
	};

	const signOut = async () => {
		// Clear fallback user
		localStorage.removeItem('skillSageUser');
		setFallbackUser(null);
		// Also sign out of NextAuth session if present
		await nextAuthSignOut({ callbackUrl: '/' });
		router.push('/');
	};

	return { user, loading, signIn, signOut };
}
