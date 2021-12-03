import React, { useState, useRef } from 'react';

const SingleColor = ({ index, weight, rgb, hex }) => {
  const [alert, setAlert] = useState(false);
  const rgbValue = `rgb(${rgb.join(',')})`;
  const hexValue = `#${hex}`;

  const handleClick = (value) => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
    navigator.clipboard.writeText(value);
  };
  return (
    <article
      className={`color ${index > 10 && 'light'}`}
      style={{ backgroundColor: rgbValue }}
    >
      <p className="percent-value">{weight}</p>
      <p className="color-value" onClick={() => handleClick(rgbValue)}>
        {rgbValue} <span className="copy-icon">&#128203;</span>
      </p>
      <p className="color-value" onClick={() => handleClick(hexValue)}>
        {hexValue} <span className="copy-icon">&#128203;</span>
      </p>
      {alert && <p>copy to clipboard</p>}
    </article>
  );
};
export default SingleColor;
