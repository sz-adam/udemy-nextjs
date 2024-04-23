import classes from "./Hero.module.css";
import Image from "next/image";
import  HeroImage  from "../../public/images/site/me.jpg";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={HeroImage}
          alt="An image showing Adam"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Adam</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem earum
        provident officia vero ut dignissimos magni nostrum quam sit id?
      </p>
    </section>
  );
}

export default Hero;
