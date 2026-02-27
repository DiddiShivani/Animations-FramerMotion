import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChallengesContext } from '../store/challenges-context.jsx';
import ChallengeItem from './ChallengeItem.jsx';
import ChallengeTabs from './ChallengeTabs.jsx';

export default function Challenges() {
  const { challenges } = useContext(ChallengesContext);
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState(null);
  const [direction, setDirection] = useState(0);

  function handleSelectType(newType) {
    const types = ['active', 'completed', 'failed'];
    const newIndex = types.indexOf(newType);
    const oldIndex = types.indexOf(selectedType);
    setDirection(newIndex > oldIndex ? 1 : -1);
    setSelectedType(newType);
  }

  function handleViewDetails(id) {
    setExpanded((prevId) => (prevId === id ? null : id));
  }

  const filteredChallenges = {
    active: challenges.filter((c) => c.status === 'active'),
    completed: challenges.filter((c) => c.status === 'completed'),
    failed: challenges.filter((c) => c.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div id="challenges">
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        <AnimatePresence mode="wait">
          <motion.ol
            key={selectedType}
            className="challenge-items"
            layout
            variants={{
              hidden: { opacity: 0, x: 100 * direction },
              visible: {
                opacity: 1,
                x: 0,
                transition: { staggerChildren: 0.07 },
              },
              exit: { opacity: 0, x: -100 * direction },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {displayedChallenges.map((challenge) => (
              <ChallengeItem
                key={challenge.id}
                challenge={challenge}
                onViewDetails={() => handleViewDetails(challenge.id)}
                isExpanded={expanded === challenge.id}
              />
            ))}
          </motion.ol>
        </AnimatePresence>

        {displayedChallenges.length === 0 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            No challenges found.
          </motion.p>
        )}
      </ChallengeTabs>
    </div>
  );
}