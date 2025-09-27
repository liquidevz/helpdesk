import {IconButton} from '@common/ui/buttons/icon-button';
import clsx from 'clsx';
import {KeyboardArrowDownIcon} from '@common/icons/material/KeyboardArrowDown';
import {ReactNode} from 'react';
import {useLocalStorage} from '@common/utils/hooks/local-storage';

interface Props {
  label: ReactNode;
  children: ReactNode;
  name: string;
  className?: string;
}
export function UserDetailsSection({label, children, name, className}: Props) {
  const [isVisible, setIsVisible] = useLocalStorage(name, true);
  return (
    <section className={clsx('border-b pb-14 text-sm', className)}>
      <div className="flex items-center justify-between gap-14 px-14">
        <div className="font-semibold">{label}</div>
        <IconButton
          onClick={() => setIsVisible(!isVisible)}
          className={clsx('transition-transform', isVisible && 'rotate-180')}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
      {isVisible && <div className="pt-8">{children}</div>}
    </section>
  );
}
