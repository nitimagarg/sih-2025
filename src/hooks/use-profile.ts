"use client";

import { useEffect, useState } from "react";

export interface UserProfile {
	name: string;
	email: string;
	phone?: string;
	skills: string[];
	education: string[];
	experience: string[];
}

const STORAGE_KEY = "skillSageProfile";

export function useProfile() {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setProfile(JSON.parse(raw));
		} finally {
			setLoading(false);
		}
	}, []);

	const saveProfile = (p: UserProfile) => {
		setProfile(p);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
	};

	return { profile, saveProfile, loading };
} 