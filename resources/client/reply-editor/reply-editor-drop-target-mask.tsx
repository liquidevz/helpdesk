import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {Trans} from '@common/i18n/trans';
import React from 'react';

interface Props {
  isVisible: boolean;
}
export function ReplyEditorDropTargetMask({isVisible}: Props) {
  const mask = (
    <m.div
      key="dragTargetMask"
      {...opacityAnimation}
      transition={{duration: 0.3}}
      className="pointer-events-none absolute inset-0 min-h-full w-full border-2 border-dashed border-primary bg-primary-light/30"
    >
      <m.div
        initial={{y: '100%', opacity: 0}}
        animate={{y: '-10px', opacity: 1}}
        exit={{y: '100%', opacity: 0}}
        className="fixed bottom-0 left-0 right-0 mx-auto max-w-max rounded bg-primary p-10 text-on-primary"
      >
        <Trans message="Drop files to attach them to this reply." />
      </m.div>
    </m.div>
  );
  return <AnimatePresence>{isVisible ? mask : null}</AnimatePresence>;
}
