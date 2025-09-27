import {Trans} from '@common/i18n/trans';
import {Button} from '@common/ui/buttons/button';
import {CheckIcon} from '@common/icons/material/Check';
import {CloseIcon} from '@common/icons/material/Close';
import {useSubmitArticleFeedback} from '@app/help-center/articles/article-page/use-submit-article-feedback';

export function ArticlePageFeedback() {
  const submitFeedback = useSubmitArticleFeedback();
  if (submitFeedback.isSuccess) {
    return (
      <Trans message="Thank you! Your feedback will help us improve the support experience. If you need more help, try searching for what you need at the top of the page." />
    );
  }
  return (
    <div className="flex items-center gap-8">
      <div className="mr-10">
        <Trans message="Was this article helpful?" />
      </div>
      <Button
        variant="outline"
        radius="rounded-full"
        startIcon={<CheckIcon />}
        color="positive"
        disabled={submitFeedback.isPending}
        onClick={() => submitFeedback.mutate({wasHelpful: true})}
      >
        <Trans message="Yes" />
      </Button>
      <Button
        variant="outline"
        radius="rounded-full"
        startIcon={<CloseIcon />}
        color="danger"
        disabled={submitFeedback.isPending}
        onClick={() => submitFeedback.mutate({wasHelpful: false})}
      >
        <Trans message="No" />
      </Button>
    </div>
  );
}
