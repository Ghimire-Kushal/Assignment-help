"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Paintbrush,
  Search,
  Settings,
  UserCircle,
  X,
} from "lucide-react";
import { ThemeCustomizer } from "./ThemeCustomizer";
import { cn } from "@/lib/utils";
import {
  adminNavItems,
  expertNavItems,
  notifications,
  roleProfiles,
  studentNavItems,
  type DashboardRole,
} from "./dashboardData";
import { authService } from "@/services/authService";
import { clearAuthToken, getAuthToken, getMockUser } from "@/services/api";
import type { User } from "@/types";

type DashboardShellProps = {
  role: DashboardRole;
  children: React.ReactNode;
};

export function ProtectedRoutePlaceholder({
  role,
  onUserLoaded,
  children,
}: {
  role: DashboardRole;
  onUserLoaded: (user: User | null) => void;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function verifySession() {
      const token = getAuthToken();
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const user = await authService.me();
        if (!mounted) return;

        onUserLoaded(user);
        if (role === "admin" && user.role !== "admin") {
          router.replace("/dashboard/student");
          return;
        }

        if (role === "expert" && user.role !== "expert") {
          router.replace("/dashboard/student");
          return;
        }

        if (role === "student" && user.role === "admin") {
          router.replace("/dashboard/admin");
          return;
        }

        setChecking(false);
      } catch {
        if (!mounted) return;
        // Backend offline → check for demo/mock session
        const mockUser = getMockUser() as (User & { role: string }) | null;
        if (mockUser) {
          onUserLoaded(mockUser as User);
          setChecking(false);
          return;
        }
        clearAuthToken();
        onUserLoaded(null);
        router.replace("/login");
      }
    }

    verifySession();

    return () => {
      mounted = false;
    };
  }, [onUserLoaded, role, router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#070912] p-6">
        <div className="mx-auto grid max-w-6xl gap-4">
          <div className="h-16 animate-pulse rounded-lg bg-white/10" />
          <div className="grid gap-4 md:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-28 animate-pulse rounded-lg bg-white/10" />
            ))}
          </div>
          <div className="h-96 animate-pulse rounded-lg bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div data-protected-route="active" className="min-h-screen">
      {children}
    </div>
  );
}

export function DashboardShell({ role, children }: DashboardShellProps) {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [themeOpen, setThemeOpen] = useState(false);
  const profile = roleProfiles[role];
  const navItems = role === "admin" ? adminNavItems : role === "expert" ? expertNavItems : studentNavItems;

  return (
    <ProtectedRoutePlaceholder role={role} onUserLoaded={setCurrentUser}>
      <div className="min-h-screen bg-[#070912] text-foreground">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-[#0b1020]/95 lg:block">
          <SidebarContent role={role} pathname={pathname} onTheme={() => setThemeOpen(true)} />
        </aside>

        <div className="lg:pl-72">
          <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070912]/90 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
              <MobileDrawer role={role} pathname={pathname} onTheme={() => setThemeOpen(true)} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-300">
                  {profile.label}
                </p>
                <h1 className="truncate text-base font-semibold text-white sm:text-lg">
                  {activeTitle(navItems, pathname)}
                </h1>
              </div>
              <div className="hidden h-10 w-full max-w-xs items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-400 md:flex">
                <Search className="h-4 w-4" />
                <span>Search dashboard</span>
              </div>
              <button
                onClick={() => setThemeOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                title="Theme Customizer"
              >
                <Paintbrush className="h-4 w-4" />
              </button>
              <NotificationDropdown />
              <ProfileDropdown role={role} user={currentUser} />
            </div>
          </header>
          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
      <ThemeCustomizer open={themeOpen} onClose={() => setThemeOpen(false)} />
    </ProtectedRoutePlaceholder>
  );
}

function SidebarContent({ role, pathname, onTheme }: { role: DashboardRole; pathname: string; onTheme: () => void }) {
  const profile = roleProfiles[role];
  const navItems = role === "admin" ? adminNavItems : role === "expert" ? expertNavItems : studentNavItems;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/scholarsync-logo.png"
            alt="ScholarSync Nepal"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-[#C0504D]/40"
          />
          <div>
            <p className="font-semibold text-white">ScholarSync Nepal</p>
            <p className="text-xs text-slate-400">{profile.label}</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-300 transition",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                  : "hover:bg-white/[0.06] hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <button
          onClick={onTheme}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
        >
          <Paintbrush className="h-4 w-4" />
          <span>Theme Customizer</span>
        </button>
      </div>
    </div>
  );
}

function MobileDrawer({ role, pathname, onTheme }: { role: DashboardRole; pathname: string; onTheme: () => void }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white lg:hidden">
        <Menu className="h-5 w-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-[min(20rem,88vw)] border-r border-white/10 bg-[#0b1020]">
          <Dialog.Title className="sr-only">Dashboard menu</Dialog.Title>
          <Dialog.Close className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </Dialog.Close>
          <SidebarContent role={role} pathname={pathname} onTheme={onTheme} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function NotificationDropdown() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]">
        <Bell className="h-5 w-5" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-400" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={10} className="z-50 w-80 rounded-lg border border-white/10 bg-[#101527] p-2 shadow-2xl">
          <div className="px-3 py-2">
            <p className="text-sm font-semibold text-white">Notifications</p>
            <p className="text-xs text-slate-400">Mock activity feed</p>
          </div>
          {notifications.map((item) => (
            <DropdownMenu.Item key={item.title} className="rounded-md px-3 py-2 outline-none hover:bg-white/[0.06]">
              <p className="text-sm font-medium text-white">{item.title}</p>
              <p className="mt-1 text-xs text-slate-400">{item.description}</p>
              <p className="mt-1 text-[11px] text-blue-300">{item.time}</p>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function ProfileDropdown({ role, user }: { role: DashboardRole; user: User | null }) {
  const router = useRouter();
  const fallbackProfile = roleProfiles[role];
  const profile = {
    name: user?.name ?? fallbackProfile.name,
    email: user?.email ?? fallbackProfile.email,
    initials: getInitials(user?.name) ?? fallbackProfile.initials,
  };

  async function handleLogout() {
    try {
      await authService.logout();
    } catch {
      // Already cleared locally inside authService.logout
    }
    router.replace("/login");
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2 text-left hover:bg-white/[0.08]">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-600 text-xs font-semibold text-white">
          {profile.initials}
        </span>
        <ChevronDown className="hidden h-4 w-4 text-slate-300 sm:block" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={10} className="z-50 w-64 rounded-lg border border-white/10 bg-[#101527] p-2 shadow-2xl">
          <div className="px-3 py-3">
            <p className="text-sm font-semibold text-white">{profile.name}</p>
            <p className="text-xs text-slate-400">{profile.email}</p>
          </div>
          <DropdownMenu.Separator className="my-1 h-px bg-white/10" />
          <DropdownMenu.Item className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-200 outline-none hover:bg-white/[0.06]">
            <UserCircle className="h-4 w-4" /> Profile
          </DropdownMenu.Item>
          <DropdownMenu.Item className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-200 outline-none hover:bg-white/[0.06]">
            <Settings className="h-4 w-4" /> Settings
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(event) => {
              event.preventDefault();
              handleLogout();
            }}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-300 outline-none hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function getInitials(name?: string) {
  if (!name) return null;
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function activeTitle(items: { title: string; href: string }[], pathname: string) {
  return [...items]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => pathname === item.href || pathname.startsWith(item.href + "/"))?.title ?? "Dashboard";
}
