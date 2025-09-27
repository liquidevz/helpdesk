import React, {Fragment, ReactNode} from 'react';
import {useFormContext} from 'react-hook-form';
import {UpdateArticlePayload} from '@app/admin/help-center/requests/use-update-article';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import {Item} from '@common/ui/forms/listbox/item';
import {ArticleSectionSelector} from '@app/admin/help-center/article-editor/article-section-selector';
import {useTrans} from '@common/i18n/use-trans';
import {FormChipField} from '@common/ui/forms/input-field/chip-field/form-chip-field';
import {useTags} from '@common/tags/use-tags';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {ArticleAttachmentsEditor} from '@app/admin/help-center/article-editor/article-attachments-editor';
import {ArticleAuthorField} from '@app/admin/help-center/article-editor/article-author-field';
import {VisibleToField} from '@app/admin/help-center/visible-to-field';
import {ManagedByField} from '@app/admin/help-center/managed-by-field';

interface Props {
  children?: ReactNode;
  onSave: () => void;
  isSaving: boolean;
}
export function ArticleEditorAside({children, onSave, isSaving}: Props) {
  const form = useFormContext<UpdateArticlePayload>();
  return (
    <Fragment>
      <Button
        variant="flat"
        color="primary"
        className="min-h-46 w-full"
        onClick={() => onSave()}
        disabled={isSaving}
      >
        <Trans message="Save" />
      </Button>
      <div className="mt-34">
        {children}
        <VisibleToField
          className="mb-24"
          description={
            <Trans message="Control who can see this article in help center" />
          }
        />
        <ArticleAuthorField />
        <ManagedByField
          className="mb-24"
          description={
            <Trans message="Control who can edit and publish this article" />
          }
        />
        <ArticleSectionSelector
          onSave={sections => {
            form.setValue('sections', sections);
          }}
        />
        <TagSelector />
        <FileUploadProvider>
          <ArticleAttachmentsEditor />
        </FileUploadProvider>
      </div>
    </Fragment>
  );
}

function TagSelector() {
  const {data} = useTags({type: 'custom', perPage: 10});
  const tags = data?.pagination.data || [];
  const {trans} = useTrans();

  if (!tags.length) return null;

  return (
    <FormChipField
      className="mt-24"
      placeholder={trans({message: 'Add tag...'})}
      background="bg"
      label={<Trans message="Tags" />}
      name="tags"
      chipSize="sm"
      suggestions={tags}
      description={
        <Trans message="Add content tags to help users find articles easier" />
      }
    >
      {tag => (
        <Item value={tag.id} key={tag.id} capitalizeFirst>
          <Trans message={tag.display_name || tag.name} />
        </Item>
      )}
    </FormChipField>
  );
}
