import React from 'react';
import { UserData } from '../../types/user';
import { PhotoItem } from '../../types/photo';

type props = {
    rowKey: string;
    photo: PhotoItem;
    user: UserData | undefined;
    isEditing: boolean;
}

const PhotoControls: React.FC = (props: props) => {
  if (!props.user || !props.isEditing) {
    return '';
  }

  return (
    
  );
};

export default PhotoControls;