import { Searchbar } from "react-native-paper";

type SearchProp = {
  value: string;
  onChangeText: (text?: any) => void;
};

export default function SearchBar({ onChangeText, value }: SearchProp) {
  return (
    <Searchbar placeholder="Search" onChangeText={onChangeText} value={value} />
  );
}
