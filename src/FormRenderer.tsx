import React from 'react';

export interface FormRendererProps {
  className?: string;
}

const FormRenderer: React.FC<FormRendererProps> = ({ className }) => {
  return <div className={className}>FormRenderer testing</div>;
};

export default FormRenderer;
