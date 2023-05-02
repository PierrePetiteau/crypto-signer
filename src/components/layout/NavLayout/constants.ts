export interface INavTitle {
  type: "nav-title";
  name: string;
}

export interface INavLink {
  type: "nav-link";
  name: string;
  path: string;
}

export const navItems: (INavTitle | INavLink)[] = [
  { type: "nav-title", name: "Project" },
  { type: "nav-link", name: "Get started", path: "/project/get_started" },
  { type: "nav-title", name: "Experiment" },
  { type: "nav-link", name: "Transaction", path: "/experiment/transaction" },
];

export const appTitle = "CryptoSigner";
export const appEmoji = "🔐";
