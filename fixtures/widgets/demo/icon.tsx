import React from 'react';
function Icon({ addSelf }) {
  const handleClick = () => {
    addSelf();
  };

  return <button onClick={handleClick}>demo icon</button>;
}

export default Icon;
