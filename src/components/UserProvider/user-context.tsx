'use client';
import { createContext } from "react";

export const UserContext = createContext<{ name: string } | null>(null);
