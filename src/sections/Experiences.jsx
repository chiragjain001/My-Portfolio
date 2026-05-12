import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
import { motion } from "framer-motion";
const Experiences = () => {
  return (
    <motion.div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 xl:px-16 relative">
      <Timeline data={experiences} />
    </motion.div>
  );
};

export default Experiences;