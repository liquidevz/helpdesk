import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {SearchIcon} from '@common/icons/material/Search';
import {Trans} from '@common/i18n/trans';
import {useTrans} from '@common/i18n/use-trans';
import {useSearchArticles} from '@app/help-center/search/use-search-articles';
import React, {useCallback, useState} from 'react';
import {ComboBox} from '@common/ui/forms/combobox/combobox';
import {Item} from '@common/ui/forms/listbox/item';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {getArticleLink} from '@app/help-center/articles/article-link';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {CloseIcon} from '@common/icons/material/Close';
import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {ArticlePath} from '@app/help-center/articles/article-path';
import {
  SearchTriggerButton,
  SearchTriggerButtonProps,
} from '@app/help-center/search/search-trigger-button';
import {message} from '@common/i18n/message';
import {useSearchTermLogger} from '@app/help-center/search/use-search-term-logger';

interface Props
  extends Omit<SearchTriggerButtonProps, 'children' | 'onTrigger'> {
  placeholder?: MessageDescriptor;
  categoryId?: number;
}
export function HcSearchBar({
  placeholder = message('Search documentation'),
  size = 'sm',
  width = 'w-320',
  categoryId,
  ...buttonProps
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <DialogTrigger
      type="modal"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="top"
    >
      <SearchTriggerButton
        {...buttonProps}
        onTrigger={handleOpen}
        size={size}
        width={width}
      >
        <Trans {...placeholder} />
      </SearchTriggerButton>
      <Dialog size="lg">
        <DialogBody padding="p-0">
          <DialogContent placeholder={placeholder} categoryId={categoryId} />
        </DialogBody>
      </Dialog>
    </DialogTrigger>
  );
}

interface SearchFieldProps {
  placeholder: MessageDescriptor;
  categoryId?: number;
}
function DialogContent({placeholder, categoryId}: SearchFieldProps) {
  const {close} = useDialogContext();
  const {trans} = useTrans();
  const [query, setQuery] = useState('');
  const searchLogger = useSearchTermLogger();
  const {data, isFetching} = useSearchArticles(
    query,
    {categoryIds: categoryId ? [categoryId] : undefined},
    {
      onSearch: r => {
        searchLogger.log({
          term: r.query,
          results: r.pagination.data,
          categoryId: r.categoryIds?.[0],
        });
      },
    }
  );
  const navigate = useNavigate();

  return (
    <ComboBox
      inputValue={query}
      onInputValueChange={setQuery}
      isAsync
      isLoading={isFetching}
      items={data?.pagination.data}
      clearInputOnItemSelection
      endAdornmentIcon={<CloseIcon />}
      placeholder={trans(placeholder)}
      startAdornment={<SearchIcon />}
      prependListbox
      listboxClassName="py-12 px-8"
      inputRadius="rounded-none"
      inputBorder="border-b"
      inputRing="ring-0"
      size="lg"
      inputFontSize="text-md"
      inputShadow="shadow-none"
      onEndAdornmentClick={close}
      selectionMode="none"
      showEmptyMessage
    >
      {result => (
        <Item
          padding="py-8 px-12"
          radius="rounded"
          key={result.id}
          value={result.id}
          onSelected={() => {
            close();
            searchLogger.updateLastSearch({clickedArticle: true});
            navigate(getArticleLink(result));
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
