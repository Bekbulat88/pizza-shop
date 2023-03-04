import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={400}
    height={500}
    viewBox="0 0 400 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="23" y="304" rx="0" ry="0" width="215" height="20" />
    <rect x="27" y="342" rx="9" ry="9" width="216" height="73" />
    <circle cx="134" cy="141" r="130" />
    <rect x="3" y="438" rx="11" ry="11" width="82" height="49" />
    <rect x="121" y="442" rx="29" ry="29" width="153" height="44" />
  </ContentLoader>
);

export default Skeleton;
