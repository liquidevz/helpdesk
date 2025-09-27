import {MutableRefObject} from 'react';
import {Editor} from '@tiptap/react';

export function getReplyBody(
  editorRef: MutableRefObject<Editor | null>,
): string | null {
  const body = editorRef.current?.getHTML();
  if (body === '<p></p>') {
    return null;
  }
  return body ?? null;
}
