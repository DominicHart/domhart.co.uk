import React from 'react';

type props = {
  title: string;
  closeModal: () => void;
}

const ModalHeader: React.FC = (props: props) => {
  return (
    <div className="relative border-b border-gray-300 mb-6 pb-4">
      <h2 className="font-semibold text-left text-2xl m-0">{props.title}</h2>
      <button onClick={props.closeModal} className="absolute right-1 top-1/2 -translate-y-1/2 text-4xl">&times;</button>
    </div>
  );
};

export default ModalHeader;
