import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
import { motion } from "framer-motion";
const Experiences = () => {
  return (
    <motion.div className="w-full relative">
      <Timeline data={experiences} />
    </motion.div>
  );
};

export default Experiences;