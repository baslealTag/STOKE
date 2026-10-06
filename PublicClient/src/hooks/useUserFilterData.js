// hooks/useUserFilterData.js
import { useQueries } from "@tanstack/react-query";
import {
  getGroupsForUsersFilter,
  getOrgsForUsersFilter,
  getPermissionsForUsersFilter,
} from "@/Services/Users/users";

export const useUserFilterData = (token) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["getOrgsForUsersFilter"],
        queryFn: () => getOrgsForUsersFilter(token),
        enabled: !!token,
        retry: 1,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["getGroupsForUsersFilter"],
        queryFn: () => getGroupsForUsersFilter(token),
        enabled: !!token,
        retry: 1,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["getPermissionsForUsersFilter"],
        queryFn: () => getPermissionsForUsersFilter(token),
        enabled: !!token,
        retry: 1,
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  const [organizationsQuery, groupsQuery, permissionsQuery] = results;

  return {
    organizations: organizationsQuery.data,
    groups: groupsQuery.data,
    permissionsData: permissionsQuery.data,
    isLoading:
      organizationsQuery.isLoading ||
      groupsQuery.isLoading ||
      permissionsQuery.isLoading,
    isError:
      organizationsQuery.isError ||
      groupsQuery.isError ||
      permissionsQuery.isError,
    error:
      organizationsQuery.error || groupsQuery.error || permissionsQuery.error,
    refetch: () => {
      organizationsQuery.refetch();
      groupsQuery.refetch();
      permissionsQuery.refetch();
    },
    // Individual loading states if needed
    isLoadingOrgs: organizationsQuery.isLoading,
    isLoadingGroups: groupsQuery.isLoading,
    isLoadingPermissions: permissionsQuery.isLoading,
  };
};
