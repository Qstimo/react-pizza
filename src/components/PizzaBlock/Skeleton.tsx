import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={7}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#bdbdbd"
    foregroundColor="#ecebeb">
    <circle cx="136" cy="130" r="125" />
    <rect x="0" y="267" rx="0" ry="0" width="279" height="24" />
    <rect x="2" y="301" rx="0" ry="0" width="280" height="83" />
    <rect x="4" y="403" rx="9" ry="9" width="101" height="35" />
    <rect x="121" y="392" rx="29" ry="29" width="156" height="47" />
  </ContentLoader>
);


