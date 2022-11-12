import style from "../../styles/components/about.module.scss";
function About() {
  return (
    <>
      <div className={style.container}>
        <img
          src="https://pbs.twimg.com/profile_images/1544326649940004864/sN0d5sy0_400x400.jpg"
          alt="about"
        />
        <h2>About Shopi</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          alias, at qui natus, dolorum placeat doloribus numquam dolor ea
          accusamus quisquam optio veritatis inventore. Et minima aperiam aut
          fuga provident.
        </p>
      </div>
    </>
  );
}

export default About;
