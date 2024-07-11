export interface PhotoUlidAndRowKey {
  ulid: string;
  rowKey: number;
}

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

export interface PhotoGridProps {
  isAuthenticated: boolean;
  rows: PhotoRows;
  updateRows: (rows: PhotoRows) => void;
  changes: number;
  increaseChanges: () => void;
  isEditing: boolean;
  selectedPhotos: Array<string>;
  updateSelectedPhotos: (ids: Array<string>) => void;
}

export interface PhotoControlsProps {
  rowKey: string;
  photo: PhotoItem;
  isAuthenticated: boolean;
  isEditing: boolean;
  rowCount: number,
  photoCount: number,
  movePhotoLeft: (e: any) => void;
  movePhotoUp: (e: any) => void;
  movePhotoDown: (e: any) => void;
  movePhotoRight: (e: any) => void;
}

export interface PhotoMenuProps {
  rowKey: string | number;
  isAuthenticated: boolean;
  isEditing: boolean;
  selectedPhotos: Array<string>;
  updateSelectedPhotos: (ids: Array<string>) => void;
  photo: PhotoItem;
  activeDropdown: string;
  openDropdown: (e: any) => void;
  openFileBrowser: (e: any) => void;
  confirmDelete: (e: any) => void;
}

export interface RowControlsProps {
  rowKey: string | number;
  isAuthenticated: boolean;
  isEditing: boolean;
  moveRowUp: (e: any) => void;
  moveRowDown: (e: any) => void;
  rowCount: number
}