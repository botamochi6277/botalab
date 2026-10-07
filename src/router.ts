import * as React from "react";

// Minimal History API router (no dependency). Paths are absolute, e.g. "/projects/pp-3929".
const subscribe = (cb: () => void) => {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
};

export const navigate = (path: string) => {
  if (path === window.location.pathname) return;
  window.history.pushState(null, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
};

export const usePath = () =>
  React.useSyncExternalStore(subscribe, () => window.location.pathname);

export const projectPath = (id: string) => `/projects/${encodeURIComponent(id)}`;

export const matchProjectId = (path: string) => {
  const m = path.match(/^\/projects\/([^/]+)\/?$/);
  return m ? decodeURIComponent(m[1]) : null;
};

// Click handler for in-app links: lets modified clicks (new tab etc.) behave normally.
export const linkClick = (path: string) => (e: React.MouseEvent) => {
  if (e.defaultPrevented || e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  navigate(path);
};
