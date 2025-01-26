import { type ClassValue } from "clsx"

export type WithChildren<T = {}> = T & { children: React.ReactNode } 