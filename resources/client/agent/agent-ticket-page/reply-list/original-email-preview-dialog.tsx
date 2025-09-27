import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import React, {useState} from 'react';
import {
  OriginalReplyEmailResponse,
  useOriginalReplyEmail,
} from '@app/agent/agent-ticket-page/reply-list/requests/use-original-reply-email';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {UseQueryResult} from '@tanstack/react-query';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {ErrorIcon} from '@common/icons/material/Error';
import {ButtonGroup} from '@common/ui/buttons/button-group';
import {Button} from '@common/ui/buttons/button';
import {useSettings} from '@common/core/settings/use-settings';

type ActiveTab = 'html' | 'plain' | 'headers';

interface Props {
  replyId: number;
}
export function OriginalEmailPreviewDialog({replyId}: Props) {
  const {base_url} = useSettings();
  const query = useOriginalReplyEmail(replyId);
  const [activeTab, setActiveTab] = useState<ActiveTab>('html');

  return (
    <Dialog size="fullscreen" className="h-dialog">
      <DialogHeader
        showDivider
        padding="px-24 py-12"
        titleFontWeight="font-normal"
        titleTextSize="text-base"
        justify="justify-start"
        actions={
          <div>
            <ButtonGroup
              variant="outline"
              radius="rounded-md"
              size="xs"
              value={activeTab}
              onChange={setActiveTab}
            >
              <Button value="html">
                <Trans message="HTML" />
              </Button>
              <Button value="plain">
                <Trans message="Plain" />
              </Button>
              <Button value="headers">
                <Trans message="Headers" />
              </Button>
            </ButtonGroup>
            <Button
              className="ml-34"
              variant="outline"
              size="xs"
              elementType="a"
              download
              href={`${base_url}/api/v1/replies/${replyId}/original/download`}
            >
              <Trans message="Download" />
            </Button>
          </div>
        }
      >
        <Trans message="Original email" />
      </DialogHeader>
      <DialogBody>
        {query.data?.email ? (
          <Content data={query.data} activeTab={activeTab} />
        ) : (
          <Status query={query} />
        )}
      </DialogBody>
    </Dialog>
  );
}

interface ContentProps {
  data: OriginalReplyEmailResponse;
  activeTab: ActiveTab;
}
function Content({data, activeTab}: ContentProps) {
  if (activeTab === 'html') {
    return <div dangerouslySetInnerHTML={{__html: data.email.body.html}} />;
  } else if (activeTab === 'plain') {
    return (
      <pre className="whitespace-pre-wrap break-words">
        {data.email.body.plain}
      </pre>
    );
  } else {
    return (
      <table>
        <tbody>
          {Object.entries(data.email.headers).map(([key, value]) => (
            <tr key={key}>
              <th className="whitespace-nowrap border px-20 py-10 text-left">
                {key}
              </th>
              <td className="whitespace-nowrap border px-20 py-10 text-left">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

interface StatusProps {
  query: UseQueryResult;
}
export function Status({query}: StatusProps) {
  if (query.isLoading) {
    return <FullPageLoader className="absolute inset-0 m-auto" />;
  }

  return (
    <IllustratedMessage
      className="mt-40"
      image={
        <div>
          <ErrorIcon size="xl" />
        </div>
      }
      imageHeight="h-auto"
      title={<Trans message="Original email for this reply does not exist" />}
    />
  );
}
