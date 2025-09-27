import {UseQueryResult} from '@tanstack/react-query';
import {ProgressBar} from '@common/ui/progress/progress-bar';
import React from 'react';

interface Props {
  query: UseQueryResult<unknown>;
}
export function GlobalLoadingProgress({query}: Props) {
  if (query.fetchStatus === 'fetching') {
    return (
      <ProgressBar
        isIndeterminate
        size="xs"
        className="fixed left-0 right-0 top-0"
      />
    );
  }
  return null;
}
