import React from 'react';

interface GreetingsProps {
  name: string;
}

const Greetings: React.FC<GreetingsProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greetings;
