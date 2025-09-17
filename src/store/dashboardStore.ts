import { create } from 'zustand';

export interface FilterState {
  timeRange: 'last24h' | 'today' | 'week' | 'custom';
  source: string[];
  status: string[];
  assignedTo: string;
  region: string[];
  customDateRange?: {
    start: Date;
    end: Date;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface DashboardState {
  // Filters
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  clearFilters: () => void;
  
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // UI state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Notifications
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'warning' | 'error';
    timestamp: Date;
    read: boolean;
  }>;
  addNotification: (notification: Omit<DashboardState['notifications'][0], 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
}

const defaultFilters: FilterState = {
  timeRange: 'today',
  source: [],
  status: [],
  assignedTo: '',
  region: [],
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  filters: defaultFilters,
  user: null,
  sidebarCollapsed: false,
  notifications: [
    {
      id: '1',
      message: 'AI Agent performance optimized',
      type: 'info',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2', 
      message: 'New high-quality leads detected',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
    },
    {
      id: '3',
      message: 'Conversion rate increased by 12%',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: true,
    }
  ],

  // Actions
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () =>
    set(() => ({
      filters: defaultFilters,
    })),

  setUser: (user) => set({ user }),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          read: false,
        },
        ...state.notifications,
      ],
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));