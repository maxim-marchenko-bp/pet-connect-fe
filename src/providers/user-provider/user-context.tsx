'use client';
import { createContext } from "react";
import { User } from "@/domain/user/user.type";

export const UserContext = createContext<User | null>(null);
