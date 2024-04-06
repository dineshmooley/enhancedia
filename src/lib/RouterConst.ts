export const RouterPath: object = {
  Home: "/",
  Tests: "/tests",
  Departments: "/departments",
  Students: "/students",
  staffs: "/staffs",
};

export const URL: String =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_DEPLOY_API_URL;
