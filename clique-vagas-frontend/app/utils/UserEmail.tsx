"use client";

import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string;
    [key: string]: any;
}

export function getUserEmail(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.sub;
    } catch (err) {
        console.error('Erro ao decodificar token:', err);
        return null;
    }
}
