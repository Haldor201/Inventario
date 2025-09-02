import Table_P from "../Components/Table";
import AddSFP from "../Components/AddSFP";
import FilterSFP from '../Components/FiltersSFP.jsx'
export default function Transceivers() {
  
  return (
    <>
    <FilterSFP></FilterSFP>
      <AddSFP></AddSFP>
      <Table_P></Table_P>
    </>
  );
}
