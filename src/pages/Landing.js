import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Hot chicken waistcoat roof party, ethical keytar taxidermy kale
            chips. Beard twee godard farm-to-table letterpress migas. Literally
            vinyl crucifix migas, snackwave pug skateboard beard direct trade.
            Readymade kitsch irony godard pug kombucha sartorial photo booth
            fanny pack viral waistcoat. Enamel pin kinfolk vice trust fund
            gluten-free pinterest tofu, man bun umami next level.{" "}
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
