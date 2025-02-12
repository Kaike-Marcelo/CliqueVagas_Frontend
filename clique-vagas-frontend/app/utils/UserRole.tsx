"use client";

import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    role: string;
    [key: string]: any;
}

export function getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.role;
    } catch (err) {
        console.error('Could not decode token.', err);
        return null;
    }
}
