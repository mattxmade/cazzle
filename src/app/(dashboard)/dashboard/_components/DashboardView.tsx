type DashboardView = {
  viewName: string;
  currentView: string;
  children: React.ReactNode;
};

const DashboardView = ({ viewName, currentView, children }: DashboardView) => {
  return viewName === currentView ? children : null;
};
