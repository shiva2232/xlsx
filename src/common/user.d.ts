export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export type UserType = {
  name: string;
  gender: Gender;
  email: string;
  mobile: string;
  password: string;
};
