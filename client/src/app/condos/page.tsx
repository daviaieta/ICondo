// Page.js
import { List as ListCondo } from "./_components/list-condo";
import { NavBar } from "../../components/navbar";

export default function Page() {
  return (
    <NavBar>
      <ListCondo />
    </NavBar>
  );
}
