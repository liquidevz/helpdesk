import {SearchTriggerButton} from '@app/help-center/search/search-trigger-button';
import {Trans} from '@common/i18n/trans';
import React, {JSXElementConstructor, useCallback} from 'react';
import {NavbarProps} from '@common/ui/navigation/navbar/navbar';
import {useNavigate} from '@common/utils/hooks/use-navigate';

interface Props {
  element: JSXElementConstructor<NavbarProps>;
  onOpenSearchPage?: () => void;
}
export function AgentNavbar({element, onOpenSearchPage}: Props) {
  const navigate = useNavigate();
  const defaultOpenSearchPage = useCallback(() => {
    navigate('/agent/search');
  }, [navigate]);

  const Element = element;
  return (
    <Element menuPosition="agent-mailbox" color="bg" size="md">
      <SearchTriggerButton
        size="sm"
        width="w-320"
        onTrigger={onOpenSearchPage || defaultOpenSearchPage}
      >
        <Trans message="Search" />
      </SearchTriggerButton>
    </Element>
  );
}
