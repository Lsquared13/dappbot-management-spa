import styled from "styled-components";

export const StyledConsole = styled.div`
  background-color: #151515;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  & p {
    position: relative;
    left: 5%;
    height: 0;
    text-align: left;
    font-size: 1.25em;
    font-family: monospace;
    white-space: normal;
    overflow: hidden;
    width: 0;
  }

  & span {
    color: #fff;
    font-weight: bold;
  }
  /* WELCOME */
  & .line1 {
    color: #9cd9f0;
    -webkit-animation: type 300s 0s steps(20, end) forwards;
    -moz-animation: type 300s 0s steps(20, end) forwards;
    -o-animation: type 300s 0s steps(20, end) forwards;
    animation: type 300s 0s steps(20, end) forwards;
  }

  & .cursor1 {
    -webkit-animation: blink 5s 0s 2 forwards;
    -moz-animation: blink 1s 0s 2 forwards;
    -o-animation: blink 1s 0s 2 forwards;
    animation: blink 1s 0s 5 forwards;
  }
  /* [<animation-name> || <animation-duration> || <animation-timing-function> || <animation-delay> || <animation-iteration-count> || <animation-direction>] [, [<animation-name> || <animation-duration> || <animation-timing-function> || <animation-delay> || <animation-iteration-count> || <animation-direction>] ]* */
  & .line2 {
    color: #cdee69;
    -webkit-animation: typeLarge 0.1s 4.25s steps(20, end) forwards;
    -moz-animation: typeLarge 0.1s 4.25s steps(20, end) forwards;
    -o-animation: typeLarge 0.1s 4.25s steps(20, end) forwards;
    animation: typeLarge 1s 5s steps(20, end) forwards;
  }

  & .cursor2 {
    -webkit-animation: blink 1s 5.25s 2 forwards;
    -moz-animation: blink 1s 5.25s 2 forwards;
    -o-animation: blink 1s 5.25s 2 forwards;
    animation: blink 1s 5s 300 forwards;
  }

  & .line3 {
    color: #e09690;
    -webkit-animation: type 10s 7.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 7.5s steps(20, end) forwards;
    -o-animation: type 0.5s 7.5s steps(20, end) forwards;
    animation: type 10s 10s steps(20, end) forwards;
  }

  & .cursor3 {
    -webkit-animation: blink 1s 8.5s 7 forwards;
    -moz-animation: blink 1s 8.5s 7 forwards;
    -o-animation: blink 1s 8.5s 7 forwards;
    animation: blink 1s 10s 10 forwards;
  }
  /* BUILDING */
  & .line4-heading {
    color: #fff;
    -webkit-animation: typeLarge 0.5s 20s steps(20, end) forwards;
    -moz-animation: typeLarge 0.5s 15.5s steps(20, end) forwards;
    -o-animation: typeLarge 0.5s 15.5s steps(20, end) forwards;
    animation: type 30s 20s steps(20, end) forwards;
  }

  & .line4 {
    color: #e09690;
    -webkit-animation: type 0.5s 30s steps(20, end) forwards;
    -moz-animation: type 0.5s 15.5s steps(20, end) forwards;
    -o-animation: type 0.5s 15.5s steps(20, end) forwards;
    animation: type 25s 25s steps(20, end) forwards;
  }
  & .cursor4 {
    -webkit-animation: blink 1s 16.5s 14 forwards;
    -moz-animation: blink 1s 16.5s 14 forwards;
    -o-animation: blink 1s 16.5s 14 forwards;
    animation: blink 1s 20s 30 forwards;
  }
  & .line5-heading {
    color: #fff;
    -webkit-animation: type 0.5s 30.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 30.5s steps(20, end) forwards;
    -o-animation: type 0.5s 30.5s steps(20, end) forwards;
    animation: type 70s 50s steps(20, end) forwards;
  }
  & .line5 {
    color: #e09690;
    -webkit-animation: type 0.5s 30.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 30.5s steps(20, end) forwards;
    -o-animation: type 0.5s 30.5s steps(20, end) forwards;
    animation: type 35s 55s steps(20, end) forwards;
  }
  & .cursor5 {
    -webkit-animation: blink 1s 30.5s 10 forwards;
    -moz-animation: blink 1s 30.5s 10 forwards;
    -o-animation: blink 1s 30.5s 10 forwards;
    animation: blink 1s 50s 70 forwards;
  }

  & .line6 {
    color: #e09690;
    -webkit-animation: type 0.5s 40.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 40.5s steps(20, end) forwards;
    -o-animation: type 0.5s 40.5s steps(20, end) forwards;
    animation: type 35s 65s steps(20, end) forwards;
  }
  & .cursor6 {
    -webkit-animation: blink 1s 40.5s 15 forwards;
    -moz-animation: blink 1s 40.5s 15 forwards;
    -o-animation: blink 1s 40.5s 15 forwards;
    animation: blink 1s 65s 35 forwards;
  }
  & .line7-heading {
    color: #fff;
    -webkit-animation: type 0.5s 55.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 55.5s steps(20, end) forwards;
    -o-animation: type 0.5s 55.5s steps(20, end) forwards;
    animation: type 90s 90s steps(20, end) forwards;
  }
  & .line7 {
    color: #e09690;
    -webkit-animation: type 0.5s 55.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 55.5s steps(20, end) forwards;
    -o-animation: type 0.5s 55.5s steps(20, end) forwards;
    animation: type 75s 100s steps(20, end) forwards;
  }
  & .cursor7 {
    -webkit-animation: blink 1s 55.5s 15 forwards;
    -moz-animation: blink 1s 55.5s 15 forwards;
    -o-animation: blink 1s 55.5s 15 forwards;
    animation: blink 1s 90s 90 forwards;
  }

  & .line8-heading {
    color: #fff;
    -webkit-animation: type 0.5s 70.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 70.5s steps(20, end) forwards;
    -o-animation: type 0.5s 70.5s steps(20, end) forwards;
    animation: type 120s 150s steps(20, end) forwards;
  }
  & .line8 {
    color: #e09690;
    -webkit-animation: type 0.5s 70.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 70.5s steps(20, end) forwards;
    -o-animation: type 0.5s 70.5s steps(20, end) forwards;
    animation: type 115s 150s steps(20, end) forwards;
  }
  & .cursor8 {
    -webkit-animation: blink 1s 70.5s 180 forwards;
    -moz-animation: blink 1s 70.5s 180 forwards;
    -o-animation: blink 1s 70.5s 180 forwards;
    animation: blink 1s 150s 180 forwards;
  }

  @-webkit-keyframes blink {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes blink {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-o-keyframes blink {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  /* @-webkit-keyframes type {
    to {
      width: 90%;
      height: 20px;
    }
  }

  @-moz-keyframes type {
    to {
      width: 90%;
      height: 20px;
    }
  }

  @-o-keyframes type {
    to {
      width: 90%;
      height: 20px;
    }
  } */

  @keyframes type {
    0% {
      height: 20px;
      margin-bottom: 15px;
    }
    1% {
      width: 90%;
      height: 20px;
      margin-bottom: 15px;
    }
    99% {
      width: 90%;
      height: 20px;
      margin-bottom: 15px;
    }
    100% {
      display: none;
      height: 0px;
      margin-bottom: 0px;
    }
  }
  /* @-webkit-keyframes typeLarge {
    1% {
      height: 40px;
    }
    to {
      width: 90%;
      height: 40px;
    }
  }

  @-moz-keyframes typeLarge {
    1% {
      height: 40px;
    }
    to {
      width: 90%;
      height: 40px;
    }
  }

  @-o-keyframes typeLarge {
    1% {
      height: 40px;
    }
    to {
      width: 90%;
      height: 40px;
    }
  } */

  @keyframes typeLarge {
    1% {
      height: 40px;
    }
    to {
      width: 90%;
      height: 40px;
      margin-bottom: 40px;
    }
  }
  
`;

export default StyledConsole;
