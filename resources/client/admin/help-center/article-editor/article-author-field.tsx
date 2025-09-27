import {message} from '@common/i18n/message';
import {FormNormalizedModelField} from '@common/ui/forms/normalized-model-field';
import {Trans} from '@common/i18n/trans';
import React from 'react';

const placeholder = message('Select author...');
const searchPlaceholder = message('Find a user');
export function ArticleAuthorField() {
  return (
    <FormNormalizedModelField
      endpoint="autocomplete/article-authors"
      name="author_id"
      background="bg"
      className="mb-24"
      label={<Trans message="Author" />}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
    />
  );
}
