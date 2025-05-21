import { render, screen, waitFor  } from '@testing-library/react';
import Greetings from '../src/components/Greetings';

describe('Greetings component', () => {
  it('renders the greeting with the provided name', async() => {
    render(<Greetings name="John" />);
    await waitFor(() => expect(screen.getByText('Hello, John!')).toBeInTheDocument());
  });
});

