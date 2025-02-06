import Counter from "../Counter.tsx";

export interface ProfileProps {
  profileName: string;
  age: number;
  props?: { profileName: string; age: number };
}

export default function Profile(props: ProfileProps) {
  return (
    <>
      <p>{props.profileName}</p>
      <p>{props.age}</p>
      <Counter />
      <img src="https://i.imgur.com/MK3eW3Am.jpg" alt="Katherine Johnson" />
    </>
  );
}
