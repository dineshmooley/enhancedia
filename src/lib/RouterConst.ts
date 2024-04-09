export const RouterPath: any = {
  Home: "/",
  Tests: "/tests",
  Departments: "/departments",
  Students: "/students",
  staffs: "/staffs",
  login: "/login",
};

export const URL: String =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_DEPLOY_API_URL;
