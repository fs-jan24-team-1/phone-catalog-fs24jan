import { ButtonBack } from '../../components/UI/ButtonBack';
import { ButtonColor } from '../../components/UI/ButtonColor';
import { ButtonSlider } from '../../components/UI/ButtonSlider';

export const HomePage = () => {
  const COLOR_EXAMPLE = ['black', 'green', 'yellow', 'white', 'purple', 'red'];

  return (
    <>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>
      <ButtonSlider iconType={'arrowLeft'} />
      <ButtonSlider iconType={'arrowRight'} />
      <ButtonSlider iconType={'plus'} />
      <ButtonSlider iconType={'minus'} />
      {COLOR_EXAMPLE.map(currentColor => (
        <ButtonColor key={currentColor} colorDevice={currentColor} />
      ))}
      <ButtonBack textForBackButton="Back/Default" />
    </>
  );
};
