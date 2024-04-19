import { ButtonBack } from '../../components/UI/ButtonBack';
import { ButtonColor } from '../../components/UI/ButtonColor';
import { ButtonFavourite } from '../../components/UI/ButtonFavourite';
import { ButtonPagination } from '../../components/UI/ButtonPagination';
import { ButtonPrimary } from '../../components/UI/ButtonPrimary';
import { ButtonSlider } from '../../components/UI/ButtonSlider';
import { Dropdown } from '../../components/UI/DropDown';

export const HomePage = () => {
  const COLOR_EXAMPLE = ['black', 'green', 'yellow', 'white', 'purple', 'red'];

  return (
    <>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>
      {/* <ButtonPrimary textForPrimaryButton='Primary' /> */}
      <ButtonPagination />
      <ButtonSlider iconType={'arrowLeft'} />
      <ButtonSlider iconType={'arrowRight'} />
      <ButtonSlider iconType={'plus'} />
      <ButtonSlider iconType={'minus'} />
      {/* <ButtonFavourite /> */}
      {COLOR_EXAMPLE.map(currentColor => (
        <ButtonColor key={currentColor} colorDevice={currentColor} />
      ))}
      <ButtonBack textForBackButton="Back/Default" />
      <Dropdown />
    </>
  );
};
