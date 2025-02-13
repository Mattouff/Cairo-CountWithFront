import { useState } from 'react';
import { Button } from '@/components/ui/button';

const CounterButton = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <Button onClick={handleClick} className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
      Clicked {count} {count === 1 ? 'time' : 'times'}
    </Button>
  );
};

export default CounterButton;
