import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Loading.scss';

const pcVariants = {
  hidden: {},
  visible: {
    transition: {
      when: 'beforeChildren',
      // this keyword specify when children should do
      staggerChildren: 0.8,

      // this keyword add after when to make the children animate with delay to each other
      // ease: 'easeIn',
    },
  },
};

const childrenPCVariants = {
  hidden: {
    backgroundColor: '#243B55',
  },
  visible: {
    backgroundColor: ['#243B55', '#ffffff', '#243B55'],
  },
};

export const Loading = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [renderView, setRenderView] = useState<'Mobile' | 'PC'>(
    window.innerWidth > 768 ? 'PC' : 'Mobile'
  );

  window.addEventListener('resize', function (event) {
    setInnerWidth(window.innerWidth);
  });

  useEffect(() => {
    if (innerWidth < 768) {
      setRenderView('Mobile');
    } else {
      setRenderView('PC');
    }
  }, [innerWidth]);

  return (
    <div className="loading">
      {renderView === 'PC' ? (
        <>
          <div className="flex items-center justify-center">
            <motion.div
              variants={pcVariants}
              className="loading-box rounded-2xl"
              initial="hidden"
              animate="visible"
            >
              {[1, 2, 3, 4, 5].map((el) => {
                return (
                  <motion.div
                    variants={childrenPCVariants}
                    key={el}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 0.8 * 4,
                      ease: 'easeIn',
                    }}
                    className={`loading-pin ${el === 1 && 'rounded-l-xl'} ${
                      el === 5 && 'rounded-r-xl'
                    }`}
                  ></motion.div>
                );
              })}
            </motion.div>
            <div className="circle"></div>
          </div>
          <p className="loading-text">Loading...</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
