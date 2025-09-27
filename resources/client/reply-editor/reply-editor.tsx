import React, {
  cloneElement,
  Fragment,
  MutableRefObject,
  ReactElement,
  Suspense,
  useCallback,
  useRef,
  useState,
} from 'react';
import {Editor, FocusPosition} from '@tiptap/react';
import debounce from 'just-debounce-it';
import {useDroppable} from '@common/ui/interactions/dnd/use-droppable';
import {MixedDraggable} from '@common/ui/interactions/dnd/use-draggable';
import {ReplyEditorDropTargetMask} from '@app/reply-editor/reply-editor-drop-target-mask';
import {useCallbackRef} from '@common/utils/hooks/use-callback-ref';
import {FileEntry} from '@common/uploads/file-entry';
import {useUploadReplyAttachments} from '@app/reply-editor/use-upload-reply-attachments';
import {ReplyEditorAttachments} from '@app/reply-editor/reply-editor-attachments';
import {ReplyEditorMenubar} from '@app/reply-editor/reply-editor-menubar';
import {getReplyBody} from '@app/reply-editor/get-reply-body';

const ArticleBodyEditor = React.lazy(
  () => import('@common/article-editor/article-body-editor'),
);

export interface ReplyEditorToolbarButtonsProps {
  onSubmit?: () => void;
  isLoading?: boolean;
}

interface Props {
  onSubmit: (reply: {body: string | null; attachments: FileEntry[]}) => void;
  isLoading: boolean;
  initialContent?: string;
  onChange?: () => void;
  className?: string;
  editorRef: MutableRefObject<Editor | null>;
  attachments: FileEntry[];
  onAttachmentsChange: (attachments: FileEntry[]) => void;
  footerButtons?: ReactElement<ReplyEditorToolbarButtonsProps>;
  menubarButtons?: ReactElement<{size: 'sm' | 'md'}>;
  minHeight?: string;
  autoFocus?: FocusPosition;
}
export function ReplyEditor(props: Props) {
  const onSubmit = useCallbackRef(props.onSubmit);
  const {
    initialContent,
    isLoading,
    onChange,
    footerButtons,
    className,
    editorRef,
    attachments,
    onAttachmentsChange,
    menubarButtons,
    minHeight = 'min-h-[243px]',
    autoFocus = 'end',
  } = props;
  const uploadAttachments = useUploadReplyAttachments({
    onSuccess: entry => onAttachmentsChange([...attachments, entry]),
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const {droppableProps} = useDroppable({
    id: 'driveRoot',
    ref: containerRef,
    types: ['nativeFile'],
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    onDrop: async (draggable: MixedDraggable) => {
      if (draggable.type === 'nativeFile') {
        uploadAttachments(await draggable.getData());
      }
    },
  });

  const handleSubmit = useCallback(() => {
    onSubmit({
      body: getReplyBody(editorRef),
      attachments,
    });
  }, [attachments, onSubmit, editorRef]);

  return (
    <div className={className}>
      {!!attachments.length && (
        <ReplyEditorAttachments
          attachments={attachments}
          onRemove={attachment => {
            onAttachmentsChange(
              attachments.filter(a => a.id !== attachment.id),
            );
          }}
        />
      )}
      <div
        className="relative overflow-hidden rounded border"
        {...droppableProps}
      >
        <div className={minHeight}>
          <Suspense>
            <ArticleBodyEditor
              autoFocus={autoFocus}
              initialContent={initialContent}
              minHeight="min-h-184"
              onCtrlEnter={handleSubmit}
              onLoad={editor => {
                editorRef.current = editor;
                //editor.commands.focus('end');
                editor.on(
                  'update',
                  debounce(() => onChange?.(), 300),
                );
              }}
            >
              {(content, editor) => (
                <Fragment>
                  <ReplyEditorMenubar
                    endButtons={menubarButtons}
                    editor={editor}
                    onAttachmentUploaded={entry => {
                      onAttachmentsChange([...attachments, entry]);
                    }}
                  />
                  <div className="m-14">
                    <div className="ticket-reply-body max-w-none text-sm">
                      {content}
                    </div>
                  </div>
                </Fragment>
              )}
            </ArticleBodyEditor>
          </Suspense>
        </div>
        {footerButtons ? (
          <div className="flex justify-end border-t">
            {cloneElement(footerButtons, {isLoading, onSubmit: handleSubmit})}
          </div>
        ) : null}
        <ReplyEditorDropTargetMask isVisible={isDragOver} />
      </div>
    </div>
  );
}
