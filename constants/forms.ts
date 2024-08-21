type UserRegistrationProps = {
  id: string;
  type: "email" | "text" | "password";
  inputType: "select" | "input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};

export const USER_REGISTRATION_FORM: UserRegistrationProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Username",
    name: "userName",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    id: "3",
    inputType: "input",
    placeholder: "Confirm Email",
    name: "confirmEmail",
    type: "email",
  },
  {
    id: "4",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
  {
    id: "5",
    inputType: "input",
    placeholder: "Confrim Password",
    name: "confirmPassword",
    type: "password",
  },
];

export const USER_LOGIN_FORM: UserRegistrationProps[] = [
  {
    id: "1",
    inputType: "input",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
  },
  {
    id: "2",
    inputType: "input",
    placeholder: "Password",
    name: "password",
    type: "password",
  },
];

type TaskFilterProps = {
  id: string;
  type: "text" | "email" | "password" | "checkbox";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder?: string;
  name: string;
  lines?: number;
  form?: string;
  defaultValue?: string;
};

export const TASK_FILTER_FORM: TaskFilterProps[] = [
  {
    id: "1",
    inputType: "input",
    name: "query",
    type: "text",
    placeholder: "Search Tasks",
  },
  {
    id: "2",
    inputType: "input",
    name: "complete",
    type: "checkbox",
  },
  {
    id: "3",
    inputType: "input",
    name: "overdue",
    type: "checkbox",
  },
  {
    id: "4",
    inputType: "select",
    name: "orderBy",
    type: "text",
    placeholder: "Sort By",
    options: [
      { value: "latest", label: "Latest", id: "latest" },
      { value: "oldest", label: "Oldest", id: "oldest" },
      { value: "deadline", label: "Deadline", id: "deadline" },
    ],
  },
];

export const taskOrderByType = ["latest", "oldest", "deadline"];
