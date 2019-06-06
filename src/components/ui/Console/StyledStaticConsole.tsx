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
    -webkit-animation: type 0s 0s steps(20, end) forwards;
    -moz-animation: type 0s 0s steps(20, end) forwards;
    -o-animation: type 0s 0s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }

  
  /* LOADING */
  & .line2 {
    color: #cdee69;
    -webkit-animation: typeLarge 0.1s 4.25s steps(20, end) forwards;
    -moz-animation: typeLarge 0.1s 4.25s steps(20, end) forwards;
    -o-animation: typeLarge 0.1s 4.25s steps(20, end) forwards;
    animation: typeLarge 0s 0s steps(20, end) forwards;
  }


  & .line3 {
    color: #e09690;
    -webkit-animation: type 0.5s 7.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 7.5s steps(20, end) forwards;
    -o-animation: type 0.5s 7.5s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }


  /* BUILDING */
  & .line4-heading {
    color: #fff;
    -webkit-animation: type 0.5s 15.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 15.5s steps(20, end) forwards;
    -o-animation: type 0.5s 15.5s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }

  & .line4 {
    color: #e09690;
    -webkit-animation: type 0.5s 15.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 15.5s steps(20, end) forwards;
    -o-animation: type 0.5s 15.5s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }
  & .cursor4 {
    -webkit-animation: blink 1s 16.5s 14 forwards;
    -moz-animation: blink 1s 16.5s 14 forwards;
    -o-animation: blink 1s 16.5s 14 forwards;
    animation: blink 0s 0s 14 forwards;
  }
  & .line5-heading {
    color: #fff;
    -webkit-animation: type 0.5s 30.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 30.5s steps(20, end) forwards;
    -o-animation: type 0.5s 30.5s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }
  & .line5 {
    color: #e09690;
    -webkit-animation: type 0.5s 30.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 30.5s steps(20, end) forwards;
    -o-animation: type 0.5s 30.5s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }
  & .cursor5 {
    -webkit-animation: blink 1s 30.5s 10 forwards;
    -moz-animation: blink 1s 30.5s 10 forwards;
    -o-animation: blink 1s 30.5s 10 forwards;
    animation: blink 0s 0s 10 forwards;
  }

  & .line6 {
    color: #e09690;
    -webkit-animation: type 0.5s 40.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 40.5s steps(20, end) forwards;
    -o-animation: type 0.5s 40.5s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }
  & .cursor6 {
    -webkit-animation: blink 1s 40.5s 15 forwards;
    -moz-animation: blink 1s 40.5s 15 forwards;
    -o-animation: blink 1s 40.5s 15 forwards;
    animation: blink 0s 0s 15 forwards;
  }
  & .line7-heading {
    color: #fff;
    -webkit-animation: type 0.5s 55.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 55.5s steps(20, end) forwards;
    -o-animation: type 0.5s 55.5s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }
  & .line7 {
    color: #e09690;
    -webkit-animation: type 0.5s 55.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 55.5s steps(20, end) forwards;
    -o-animation: type 0.5s 55.5s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }
  & .cursor7 {
    -webkit-animation: blink 1s 55.5s 15 forwards;
    -moz-animation: blink 1s 55.5s 15 forwards;
    -o-animation: blink 1s 55.5s 15 forwards;
    animation: blink 0s 0s 15 forwards;
  }

  & .line8-heading {
    color: #fff;
    -webkit-animation: type 0.5s 70.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 70.5s steps(20, end) forwards;
    -o-animation: type 0.5s 70.5s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }
  & .line8 {
    color: #e09690;
    -webkit-animation: type 0.5s 70.5s steps(20, end) forwards;
    -moz-animation: type 0.5s 70.5s steps(20, end) forwards;
    -o-animation: type 0.5s 70.5s steps(20, end) forwards;
    animation: type 0s 0s steps(20, end) forwards;
  }
  & .cursor8 {
    -webkit-animation: blink 1s 70.5s 180 forwards;
    -moz-animation: blink 1s 70.5s 180 forwards;
    -o-animation: blink 1s 70.5s 180 forwards;
    animation: blink 0s 0s 180 forwards;
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

  @-webkit-keyframes type {
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
  }

  @keyframes type {
    1% {
      height: 20px;
    }
    to {
      width: 90%;
      height: 20px;
    }
  }
  @-webkit-keyframes typeLarge {
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
  }

  @keyframes typeLarge {
    1% {
      height: 40px;
    }
    to {
      width: 90%;
      height: 40px;
    }
  }
`;

export default StyledConsole;
