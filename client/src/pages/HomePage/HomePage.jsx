import { motion } from "framer-motion";
import styles from "./HomePage.module.css";

import { HomeHeader } from "../../components/Home/HomeHeader";
import { HeroSection } from "../../components/Home/HeroSection";
import { StatsSection } from "../../components/Home/StatsSection";
import { HowItWorksSection } from "../../components/Home/HowItWorksSection";
import { FacultiesSection } from "../../components/Home/FacultiesSection";
import { FaqSection } from "../../components/Home/FaqSection";
import { ReviewsSection } from "../../components/Home/ReviewsSection";
import { HomeFooter } from "../../components/Home/HomeFooter";

export default function HomePage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <HomeHeader styles={styles} />

      <main>
        <HeroSection styles={styles} />
        <StatsSection styles={styles} />
        <HowItWorksSection styles={styles} />
        <FacultiesSection styles={styles} />
        <FaqSection styles={styles} />
        <ReviewsSection styles={styles} />
      </main>

      <HomeFooter styles={styles} />
    </motion.div>
  );
}