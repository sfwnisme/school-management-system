type childrenType = {
  children: React.ReactNode;
};

// this type handle the setState function when using prev
// Ex: setState((prev)=> !prev) as UpdateStateType
type UpdateStateType = (
  updateFn: (prev: boolean) => boolean
) => void | undefined;
type UpdateStateAdvancedType<S> = (updateFn: (prev: S) => S) => void;

// database types
interface IUser {
  id: number;
  address: string;
  country: string;
  email: string;
  fullName: string;
}
