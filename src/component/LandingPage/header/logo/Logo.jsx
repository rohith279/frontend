const Logo = (props) => (
  <svg
    {...props}
    viewBox="0 0 82 82"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_28_251)">
      <path
        d="M55.767 0H21.3561C10.666 0 2 8.66602 2 19.3561V53.767C2 64.457 10.666 73.1231 21.3561 73.1231H55.767C66.457 73.1231 75.1231 64.457 75.1231 53.767V19.3561C75.1231 8.66602 66.457 0 55.767 0Z"
        fill="white"
      />
    </g>
    <path
      d="M58.2714 24.793L48.8038 31.5624C47.5493 32.4618 45.7505 31.9174 45.2061 30.4736L40.7327 18.5444C39.9752 16.4852 37.0639 16.4852 36.3065 18.5444L31.8094 30.4499C31.265 31.9174 29.4899 32.4618 28.2354 31.5387L18.7678 24.7694C16.8743 23.4439 14.3653 25.3138 15.1464 27.515L24.9927 55.0894C25.3241 56.0362 26.2235 56.6516 27.2176 56.6516H49.7742C50.7683 56.6516 51.6678 56.0125 51.9991 55.0894L61.8454 27.515C62.6502 25.3138 60.1413 23.4439 58.2714 24.793ZM44.425 46.6396H32.5905C31.6201 46.6396 30.8153 45.8348 30.8153 44.8644C30.8153 43.894 31.6201 43.0892 32.5905 43.0892H44.425C45.3955 43.0892 46.2002 43.894 46.2002 44.8644C46.2002 45.8348 45.3955 46.6396 44.425 46.6396Z"
      fill="black"
    />
    <defs>
      <filter
        id="filter0_d_28_251"
        x="0"
        y="0"
        width="81.123"
        height="81.1231"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_28_251"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_28_251"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default Logo;
