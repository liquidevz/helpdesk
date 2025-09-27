import React, {useRef, useState} from 'react';
import {useSearchArticles} from '@app/help-center/search/use-search-articles';
import {ComboBox} from '@common/ui/forms/combobox/combobox';
import {SearchIcon} from '@common/icons/material/Search';
import {Item} from '@common/ui/forms/listbox/item';
import {ArticlePath} from '@app/help-center/articles/article-path';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {Article} from '@app/help-center/articles/article';
import {useKeybind} from '@common/utils/keybinds/use-keybind';
import {useTicketHcCategories} from '@app/agent/agent-ticket-page/requests/use-ticket';

interface Props {
  onSelected: (article: Article) => void;
}
export function TicketPageDocsSearchInput({onSelected}: Props) {
  const hcCategories = useTicketHcCategories();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const {data, isFetching} = useSearchArticles(query, {
    categoryIds: hcCategories,
  });
  const {trans} = useTrans();

  useKeybind(
    'window',
    'ctrl+/',
    () => {
      inputRef.current?.focus();
    },
    {allowedInputSelector: '.ProseMirror'},
  );

  return (
    <ComboBox
      inputValue={query}
      onInputValueChange={setQuery}
      isAsync
      isLoading={isFetching}
      items={data?.pagination.data}
      clearInputOnItemSelection
      hideEndAdornment
      placeholder={trans(message('Search documentation... (ctrl+/)'))}
      startAdornment={<SearchIcon />}
      className="mb-10"
      selectionMode="none"
      showEmptyMessage
      ref={inputRef}
    >
      {result => (
        <Item
          key={result.id}
          value={result.id}
          onSelected={() => {
            close();
            onSelected(result);
          }}
          description={<ArticlePath article={result} />}
          textLabel={result.title}
        >
          {result.title}
        </Item>
      )}
    </ComboBox>
  );
}
