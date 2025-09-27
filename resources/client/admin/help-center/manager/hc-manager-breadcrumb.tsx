import {Breadcrumb} from '@common/ui/breadcrumbs/breadcrumb';
import {BreadcrumbItem} from '@common/ui/breadcrumbs/breadcrumb-item';
import {Trans} from '@common/i18n/trans';
import React from 'react';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {Category, Section} from '@app/help-center/categories/category';

interface Props {
  category?: Category;
  section?: Section;
}
export function HcManagerBreadcrumb({category, section}: Props) {
  const navigate = useNavigate();
  if (!category && !section) return null;
  return (
    <Breadcrumb size="sm" className="-mx-8">
      <BreadcrumbItem onSelected={() => navigate('/admin/hc/arrange')}>
        <Trans message="Categories" />
      </BreadcrumbItem>
      {category && (
        <BreadcrumbItem
          className={!section ? 'text-primary' : undefined}
          onSelected={() =>
            navigate(`/admin/hc/arrange/categories/${category.id}`)
          }
        >
          <Trans message={category.name} />
        </BreadcrumbItem>
      )}
      {section && (
        <BreadcrumbItem className="text-primary">
          <Trans message={section.name} />
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
}
