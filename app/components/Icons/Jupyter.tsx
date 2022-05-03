export const Jupyter = ({
  className,
  jupyter,
}: {
  className?: string;
  jupyter: boolean;
}) => {
  if (!jupyter) return null;
  return (
    <svg
      width="44"
      height="51"
      version="2.0"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g style={{ mixBlendMode: 'normal' }}>
        <g style={{ mixBlendMode: 'normal' }}>
          <use
            transform="translate(.54 21.36)"
            fill="#4E4E4E"
            style={{ mixBlendMode: 'normal' }}
          />
          <use
            transform="translate(5.68 21.37)"
            fill="#4E4E4E"
            style={{ mixBlendMode: 'normal' }}
          />
          <use
            transform="translate(13.39 21.26)"
            fill="#4E4E4E"
            style={{ mixBlendMode: 'normal' }}
          />
          <use
            transform="translate(20.43 21.39)"
            fill="#4E4E4E"
            style={{ mixBlendMode: 'normal' }}
          />
          <use
            transform="translate(27.55 19.54)"
            fill="#4E4E4E"
            style={{ mixBlendMode: 'normal' }}
          />
          <use
            transform="translate(32.47 21.29)"
            fill="#4E4E4E"
            style={{ mixBlendMode: 'normal' }}
          />
          <use
            transform="translate(39.98 21.24)"
            fill="#4E4E4E"
            style={{ mixBlendMode: 'normal' }}
          />
        </g>
        <g style={{ mixBlendMode: 'normal' }}>
          <use
            transform="translate(33.48 .69)"
            fill="#767677"
            style={{ mixBlendMode: 'normal' }}
          />
          <use
            transform="translate(3.21 31.27)"
            fill="#F37726"
            style={{ mixBlendMode: 'normal' }}
          />
          <use
            transform="translate(3.21 4.88)"
            fill="#F37726"
            style={{ mixBlendMode: 'normal' }}
          />
          <use
            transform="translate(3.28 43.09)"
            fill="#9E9E9E"
            style={{ mixBlendMode: 'normal' }}
          />
          <use
            transform="translate(1.87 5.43)"
            fill="#616262"
            style={{ mixBlendMode: 'normal' }}
          />
        </g>
      </g>
      <defs>
        <path
          id="a"
          d="M1.745 5.475c0 1.558-.125 2.066-.445 2.44a1.94 1.94 0 0 1-1.3.498l.125.89a3.045 3.045 0 0 0 2.03-.738 3.561 3.561 0 0 0 .783-2.671V0H1.745V5.475Z"
        />
        <path
          id="b"
          d="M5.502 4.763c0 .668 0 1.264.053 1.78H4.496l-.071-1.059A2.466 2.466 0 0 1 2.26 6.695C1.23 6.695 0 6.135 0 3.846V.045h1.193v3.56c0 1.238.383 2.066 1.46 2.066A1.665 1.665 0 0 0 4.336 3.99V0h1.193v4.727l-.027.036Z"
        />
        <path
          id="c"
          d="M.053 2.273c0-.828 0-1.505-.053-2.12h1.068l.054 1.114A2.582 2.582 0 0 1 3.454.002c1.585 0 2.778 1.327 2.778 3.303 0 2.333-1.433 3.49-2.982 3.49a2.306 2.306 0 0 1-2.021-1.023v3.56H.053V2.274ZM1.23 4.009c.003.161.02.322.053.48a1.834 1.834 0 0 0 1.78 1.38c1.256 0 1.995-1.023 1.995-2.51 0-1.3-.695-2.413-1.95-2.413a2.048 2.048 0 0 0-1.878 1.95v1.113Z"
        />
        <path
          id="d"
          d="M1.318.018 2.75 3.855c.151.427.312.944.418 1.327.125-.392.259-.89.419-1.354l1.3-3.81h1.255l-1.78 4.63c-.89 2.225-1.434 3.374-2.253 4.068a3.24 3.24 0 0 1-1.46.766l-.294-.997a3.16 3.16 0 0 0 1.042-.58 3.561 3.561 0 0 0 1.006-1.317.89.89 0 0 0 .098-.285 1.024 1.024 0 0 0-.08-.311L0 0h1.3l.018.018Z"
        />
        <path
          id="e"
          d="M2.19 0v1.87H3.9v.89H2.19v3.508c0 .801.232 1.264.89 1.264.234.004.468-.023.695-.08l.053.89c-.34.118-.7.172-1.06.16a1.656 1.656 0 0 1-1.29-.498 2.395 2.395 0 0 1-.463-1.692V2.751H0v-.89h1.033V.276L2.19 0Z"
        />
        <path
          id="f"
          d="M1.177 3.579A2.092 2.092 0 0 0 3.43 5.831a4.345 4.345 0 0 0 1.78-.338l.205.89a5.342 5.342 0 0 1-2.181.401A3.027 3.027 0 0 1 .01 3.508C.01 1.549 1.177 0 3.082 0 5.22 0 5.753 1.87 5.753 3.063c.012.183.012.368 0 .552H1.15l.027-.036Zm3.49-.89A1.683 1.683 0 0 0 3.011.766a1.968 1.968 0 0 0-1.825 1.923h3.481Z"
        />
        <path
          id="g"
          d="M.053 2.192c0-.765 0-1.424-.053-2.03h1.068v1.274h.054A1.968 1.968 0 0 1 2.902.01a1.3 1.3 0 0 1 .339 0v1.113a1.78 1.78 0 0 0-.41 0 1.665 1.665 0 0 0-1.593 1.513 3.293 3.293 0 0 0-.054.552v3.464H.01V2.2l.044-.009Z"
        />
        <path
          id="h"
          d="M6.03 2.836A3.018 3.018 0 1 1 2.889.005a2.982 2.982 0 0 1 3.143 2.83Z"
        />
        <path
          id="i"
          d="M18.696 7.122C10.684 7.122 3.641 4.247 0 0a19.934 19.934 0 0 0 37.392 0C33.76 4.247 26.744 7.122 18.696 7.122Z"
        />
        <path
          id="j"
          d="M18.696 5.897c8.013 0 15.055 2.876 18.696 7.123A19.934 19.934 0 0 0 0 13.02c3.641-4.256 10.648-7.123 18.696-7.123Z"
        />
        <path
          id="k"
          d="M7.596 3.567A3.802 3.802 0 1 1 3.634.005a3.766 3.766 0 0 1 3.962 3.562Z"
        />
        <path
          id="l"
          d="M2.25 4.38A2.19 2.19 0 1 1 4.379 2.1a2.217 2.217 0 0 1-2.127 2.28Z"
        />
      </defs>
    </svg>
  );
};
