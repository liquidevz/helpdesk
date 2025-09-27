import {useQuery} from '@tanstack/react-query';
import {apiClient} from '@common/http/query-client';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {PurchaseCode} from '@app/agent/purchase-code';

interface Response extends BackendResponse {
  purchases: PurchaseCode[];
}

export function useUserPurchases(userId: number | string) {
  return useQuery({
    queryKey: ['purchases', userId],
    queryFn: () => fetchPurchases(userId),
  });
}

function fetchPurchases(userId: number | string) {
  return apiClient
    .get<Response>(`users/${userId}/purchases`)
    .then(response => response.data);
}
