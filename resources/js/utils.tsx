import { PhotoItem } from "./types/photo";

export const apiUrl = (): string => {
    return '/api';
}

export const sortRow = (row: PhotoItem[]) => {
    return row.sort((a, b) => parseFloat(a.column) - parseFloat(b.column))
}