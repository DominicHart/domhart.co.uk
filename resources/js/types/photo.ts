export interface PhotoItem {
  ulid: string;
  column: number;
  image_path: string;
  thumbnail_path: string;
  carousel_key: number;
  width: number;
  height: number;
}

export interface PhotoRows {
  [key: number]: PhotoItem[];
}