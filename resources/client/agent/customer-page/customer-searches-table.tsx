import {useParams} from 'react-router-dom';
import React from 'react';
import {SearchReportTable} from '@app/admin/reports/search-report/search-report-table';
import {Trans} from '@common/i18n/trans';

export function CustomerSearchesTable() {
  const {userId} = useParams();
  return (
    <SearchReportTable
      description={
        <Trans message="This report shows what the user searched for recently." />
      }
      userId={userId}
      orderBy="last_seen"
    />
  );
}
