export type OnSubmitProps = {
  username: string;
  password: string;
};

export interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}
