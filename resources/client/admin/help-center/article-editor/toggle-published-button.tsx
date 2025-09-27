import {Article} from '@app/help-center/articles/article';
import {useUpdateArticle} from '@app/admin/help-center/requests/use-update-article';
import {Button} from '@common/ui/buttons/button';
import {Trans} from '@common/i18n/trans';
import React from 'react';

interface Props {
  article: Article;
}
export function TogglePublishedButton({article}: Props) {
  const updateArticle = useUpdateArticle();
  return (
    <Button
      variant="link"
      color="primary"
      disabled={updateArticle.isPending}
      onClick={() => {
        updateArticle.mutate({
          id: article.id,
          draft: !article.draft,
        });
      }}
    >
      {article.draft ? (
        <Trans message="Publish" />
      ) : (
        <Trans message="Unpublish" />
      )}
    </Button>
  );
}
