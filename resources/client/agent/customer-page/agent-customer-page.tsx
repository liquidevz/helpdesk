import {useUser} from '@common/auth/ui/use-user';
import {Link, Outlet, useLocation, useParams} from 'react-router-dom';
import {AgentNavbar} from '@app/agent/agent-navbar';
import React, {Fragment, useContext, useEffect, useState} from 'react';
import {getCustomerLink} from '@app/agent/customer-page/customer-link';
import {Trans} from '@common/i18n/trans';
import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {AgentCustomerPageSidebar} from '@app/agent/customer-page/agent-customer-page-sidebar';
import {UserAvatar} from '@common/ui/images/user-avatar';
import {User} from '@common/auth/user';
import {Button} from '@common/ui/buttons/button';
import {AddIcon} from '@common/icons/material/Add';
import {IconButton} from '@common/ui/buttons/icon-button';
import {DashboardLayout} from '@common/ui/layout/dashboard-layout';
import {DashboardNavbar} from '@common/ui/layout/dashboard-navbar';
import {DashboardSidenav} from '@common/ui/layout/dashboard-sidenav';
import {DashboardContent} from '@common/ui/layout/dashboard-content';
import clsx from 'clsx';
import {prefetchValueLists} from '@common/http/value-lists';
import {DashboardLayoutContext} from '@common/ui/layout/dashboard-layout-context';
import {
  Menu,
  MenuItem,
  MenuTrigger,
} from '@common/ui/navigation/menu/menu-trigger';
import {MoreHorizIcon} from '@common/icons/material/MoreHoriz';
import {ConfirmationDialog} from '@common/ui/overlays/dialog/confirmation-dialog';
import {openDialog} from '@common/ui/overlays/store/dialog-store';
import {useDeleteUser} from '@app/agent/customer-page/requests/use-delete-user';
import {PageStatus} from '@common/http/page-status';
import {BanUserDialog} from '@common/admin/users/ban-user-dialog';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {MergeUsersDialog} from '@app/agent/customer-page/merge-users-dialog';

export function AgentCustomerPage() {
  const {userId} = useParams();
  const query = useUser(userId!, {
    with: [
      'tags',
      'secondary_emails',
      'details',
      'purchase_codes',
      'bans',
      'lastLogin',
    ],
  });
  const user = query.data?.user;

  useEffect(() => {
    prefetchValueLists(['timezones', 'countries', 'localizations']);
  }, []);

  if (!query.isLoading && !query.data) {
    return <PageStatus query={query} />;
  }

  return (
    <DashboardLayout name="agent_customer_page">
      <AgentNavbar element={DashboardNavbar} />
      <LeftSidebar user={user} />
      <DashboardContent>
        <main
          className={clsx(
            'p-14 transition-opacity md:p-24',
            !user && 'opacity-0',
          )}
        >
          <Fragment>
            <Header user={user} />
            <Tables />
          </Fragment>
        </main>
      </DashboardContent>
    </DashboardLayout>
  );
}

interface PageNavbarProps {
  user?: User;
}
function LeftSidebar({user}: PageNavbarProps) {
  const {isMobileMode} = useContext(DashboardLayoutContext);
  return (
    <DashboardSidenav
      position="left"
      size="w-350"
      className={clsx(
        'bg',
        isMobileMode ? 'border-r p-12' : 'mt-8 py-24 pl-24',
      )}
      overflow="overflow-y-auto overflow-x-hidden compact-scrollbar"
    >
      <AgentCustomerPageSidebar user={user} />
    </DashboardSidenav>
  );
}

interface HeaderProps {
  user?: User;
}
function Header({user}: HeaderProps) {
  if (!user) return null;
  const banReason = user.bans?.[0]?.comment;
  return (
    <header className="mb-16 flex items-center">
      <div className="mr-auto flex items-center gap-14">
        <UserAvatar user={user} size="w-50 h-50" circle />
        <div>
          <h1 className="text-xl font-semibold">{user.display_name}</h1>
          {banReason && (
            <div className="text-sm text-danger">
              <Trans
                message="Suspended: :reason"
                values={{reason: banReason}}
              />
            </div>
          )}
        </div>
      </div>
      <Button
        variant="outline"
        startIcon={<AddIcon />}
        size="xs"
        className="mx-12"
        elementType={Link}
        to={`/agent/tickets/new?customer_id=${user.id}`}
        target="_blank"
      >
        <Trans message="New ticket" />
      </Button>
      <MenuTrigger>
        <IconButton variant="outline" size="xs">
          <MoreHorizIcon />
        </IconButton>
        <Menu>
          <MenuItem
            value="suspend"
            onSelected={() => openDialog(BanUserDialog, {user})}
          >
            <Trans message="Suspend" />
          </MenuItem>
          <MenuItem
            value="merge"
            onSelected={() => openDialog(MergeUsersDialog, {mergee: user})}
          >
            <Trans message="Merge into another user" />
          </MenuItem>
          <MenuItem
            value="delete"
            onSelected={() => openDialog(DeleteUserDialog, {user})}
          >
            <Trans message="Delete" />
          </MenuItem>
        </Menu>
      </MenuTrigger>
    </header>
  );
}

interface DeleteUserDialogProps {
  user: User;
}
function DeleteUserDialog({user}: DeleteUserDialogProps) {
  const deleteUser = useDeleteUser();
  const {close} = useDialogContext();
  return (
    <ConfirmationDialog
      isDanger
      title={<Trans message="Delete user" />}
      body={
        <Trans message="Are you sure you want to delete this user? This will also delete all tickets created by this user and can't be undone." />
      }
      onConfirm={() => {
        deleteUser.mutate(
          {userId: user.id},
          {
            onSuccess: () => close(),
          },
        );
      }}
      isLoading={deleteUser.isPending}
      confirm={<Trans message="Delete" />}
    />
  );
}

function Tables() {
  const {userId} = useParams();
  const {pathname} = useLocation();
  const [selectedTab, setSelectedTab] = useState(() => {
    return pathname.endsWith('searches') ? 1 : 0;
  });
  return (
    <div className="rounded border">
      <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab}>
        <TabList>
          <Tab
            width="min-w-132"
            elementType={Link}
            to={getCustomerLink(userId!)}
            replace
          >
            <Trans message="Tickets" />
          </Tab>
          <Tab
            width="min-w-132"
            elementType={Link}
            to={getCustomerLink(userId!, {tab: 'searches'})}
            replace
          >
            <Trans message="Searches" />
          </Tab>
        </TabList>
        <div>
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
}
