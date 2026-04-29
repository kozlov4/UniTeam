import { motion } from "framer-motion";
import { reviews } from "./homeData";
import { fadeUp, staggerContainer } from "./animations";

export function ReviewsSection({ styles }) {
  return (
    <motion.section
      id="reviews"
      className={styles.reviews}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>Відгуки від наших користувачів</h2>

      <motion.div
        className={styles.reviewList}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {reviews.map((review) => (
          <motion.article
            className={styles.review}
            key={review.id}
            variants={fadeUp}
            whileHover={{ y: -10 }}
          >
            <div className={styles.reviewHeader}>
              <img src={review.image} alt="avatar" />
              <div>
                <h3>{review.name}</h3>
                <p>{review.role}</p>
              </div>
            </div>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>

            <span>{review.date}</span>
          </motion.article>
        ))}
      </motion.div>

      <div className={styles.dots}>
        <span className={styles.activeDot}></span>
        <span></span>
        <span></span>
      </div>
    </motion.section>
  );
}