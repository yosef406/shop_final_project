import style from "./about.module.scss";
import Card from "../card/Card";
function About() {
  return (
    <>
      <Card>
        <div className={style.container}>
          <img
            src="https://media.licdn.com/dms/image/C560BAQF-93WV2paucg/company-logo_200_200/0/1589311298682?e=2147483647&v=beta&t=gXZxH9j8QWTRY0V76lejqoeUKSGq9kc00YWkF1b3iz0"
            alt="about"
          />
          <div>
            <h2>About Shopi</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis alias, at qui natus, dolorum placeat doloribus numquam
              dolor ea accusamus quisquam optio veritatis inventore. Et minima
              aperiam aut fuga provident.
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}

export default About;
