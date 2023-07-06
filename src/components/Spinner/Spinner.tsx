import { SpinnerWarper, SpinnerContent } from "./Spinner.style";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingJson from './loader.json'

const Spinner = () => {
  return (
    <SpinnerWarper>
      <SpinnerContent>
      <Player
           autoplay
           loop
           src={loadingJson}
           controls={false}
           style={{ height: "30vh" }}
         ></Player>
      </SpinnerContent>
    </SpinnerWarper>
  );
};

export default Spinner;
