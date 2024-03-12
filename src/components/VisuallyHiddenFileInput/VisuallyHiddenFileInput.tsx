import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export default function VisuallyHiddenFileInput({
  accept
}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      style={{
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1
      }}
      type="file"
      accept={accept}
    />
  );
}
