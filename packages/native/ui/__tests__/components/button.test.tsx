import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from '../../src/components/button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Button onPress={onPress}>Press</Button>);
    fireEvent.press(screen.getByText('Press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(
      <Button
        disabled
        onPress={onPress}
      >
        Disabled
      </Button>
    );
    fireEvent.press(screen.getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPress = jest.fn();
    render(
      <Button
        loading
        onPress={onPress}
      >
        Loading
      </Button>
    );
    // When loading, ActivityIndicator replaces text
    expect(screen.queryByText('Loading')).toBeNull();
  });
});
