import { ButtonColor } from "../../components/UI/ButtonColor";
import { ButtonPagination } from "../../components/UI/ButtonPagination";
import { ButtonPrimary } from "../../components/UI/ButtonPrimary";
import { ButtonSlider } from "../../components/UI/ButtonSlider";

export const HomePage = () => (
  <><h1 className="title">Welcome to Nice Gadgets store!</h1>
  <ButtonPrimary />
  <ButtonPagination />
  <ButtonSlider />
    <ButtonColor />
  </>
);
