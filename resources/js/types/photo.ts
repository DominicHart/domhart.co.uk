import { PhotoItem } from 'react-editable-photo-grid';

export interface File {
  size: number;
  name: string;
}

export interface ImageUploadedResponse {
  uploaded: boolean
}

export interface PhotoPositionsSavedResponse {
  saved: boolean
}

export interface PhotoReplacedResponse {
  replaced: boolean
}

export interface PhotoMenuProps {
  selectedPhotos: Array<string>;
  updateSelectedPhotos: (ids: Array<string>) => void;
  photo: PhotoItem;
  activeDropdown: string;
  openDropdown: (e: any) => void;
  openFileBrowser: (e: any) => void;
}
