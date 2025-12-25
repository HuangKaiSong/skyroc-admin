import type { ButtonIconProps } from './ButtonIcon';

type Props = ButtonIconProps & {
  isReload: boolean;
};

const ReloadButton = (props: Props) => {
  const { isReload, ...rest } = props;

  return (
    <ButtonIcon {...rest}>
      <IconAntDesignReloadOutlined className={isReload ? '' : 'animate-spin animate-duration-750'} />
    </ButtonIcon>
  );
};

export default ReloadButton;
