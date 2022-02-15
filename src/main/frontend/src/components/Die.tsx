import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

export interface DieProps {
  value: number;
  rolling?: boolean;
  dieNumber: number;
}

export const Die: React.FC<DieProps> = (props: DieProps) => {
  const [dieFace, setDieFace] = useState(1);
  const intervalId = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (props.rolling) {
      intervalId.current = setInterval(() => {
        setDieFace(Math.floor(Math.random() * 6 + 1));
      }, 75);
    } else {
      setDieFace(props.value);
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    }
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [props.rolling, props.value]);

  return (
    <StyledRoll dieNumber={props.dieNumber}>
      <div className={props.rolling ? "tilt" : ""}>
        <div className={props.rolling ? "rotate" : ""}>
          <div className={props.rolling ? "shake" : ""}>
            <StyledDie className={props.rolling ? "invRotate" : ""}>
              {Array.from({ length: dieFace }).map((_, i) => (
                <span></span>
              ))}
            </StyledDie>
          </div>
        </div>
      </div>
    </StyledRoll>
  );
};

const StyledDie = styled.div`
  display: grid;
  grid-template-areas:
    "a . c"
    "e g f"
    "d . b";
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  padding: 0.5rem;
  margin: 0.5rem;
  width: 5rem;
  box-sizing: border-box;
  aspect-ratio: 1;
  place-items: center;
  background-image: linear-gradient(150deg, #de1212, #990000);
  /* background-color: #ce1212; */
  box-shadow: inset 0 5px #da1313, inset 5px 0 #8d0808, inset 0 -5px #450202,
    inset -5px 0 #8d0808;

  border-radius: 10%;
  span {
    display: block;
    width: 18px !important;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: #ddd;
    box-shadow: inset 1px 2px #522;
    :nth-child(2) {
      grid-area: b;
    }
    :nth-child(3) {
      grid-area: c;
    }
    :nth-child(4) {
      grid-area: d;
    }
    :nth-child(5) {
      grid-area: e;
    }
    :nth-child(6) {
      grid-area: f;
    }
    :nth-child(odd):last-child {
      grid-area: g;
    }
  }
`;

const StyledRoll = styled.div<{ dieNumber: number }>`
  .shake {
    animation: linear_shake
      ${(props) => (props.dieNumber === 1 ? 0.1 : 0.12) + "s"} linear infinite;
  }

  .rotate {
    animation: rotate ${(props) => (props.dieNumber === 1 ? 3 : 2.8) + "s"}
      linear infinite;
  }

  .invRotate {
    animation: rotate ${(props) => (props.dieNumber === 1 ? 3 : 2.8) + "s"}
      linear infinite reverse;
  }

  .tilt {
    animation: tilt ${(props) => (props.dieNumber === 1 ? 0.2 : 0.22) + "s"}
      linear infinite;
  }

  @keyframes linear_shake {
    0% {
      transform: translateY(0rem);
    }
    25% {
      transform: translateY(-0.5rem);
    }
    75% {
      transform: translateY(0.5rem);
    }
    100% {
      transform: translateY(0rem);
    }
  }

  @keyframes rotate {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  @keyframes tilt {
    0% {
      transform: rotateZ(0deg);
    }
    25% {
      transform: rotateZ(-5deg);
    }
    75% {
      transform: rotateZ(5deg);
    }
    100% {
      transform: rotateSZ(0deg);
    }
  }
`;
