import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ className: string }>;

const ButtonBar = ({ className, children }: Props) => {
  return (
    <div className={className} role="toolbar">
      {children}
    </div>
  );
};

export default ButtonBar;
