import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  { id: 1, title: "Project One", type: "Web Application", color: "bg-black dark:bg-white" },
  { id: 2, title: "Project Two", type: "Mobile App", color: "bg-gray-800 dark:bg-gray-200" },
  { id: 3, title: "Project Three", type: "Design System", color: "bg-gray-600 dark:bg-gray-400" },
  { id: 4, title: "Project Four", type: "E-commerce", color: "bg-gray-900 dark:bg-gray-100" },
];

const stackedOffsets = [
  { x: 0, y: -330, rotate: 9, scale: 0.75 },
  { x: 60, y: -340, rotate: 15, scale: 0.73 },
  { x: -40, y: -280, rotate: -8, scale: 0.72 },
  { x: 65, y: -250, rotate: 5, scale: 0.7 },
];

// Grid positions for md-lg (768-1024px)
const gridPositionsMd = [
  { x: -180, y: 220, rotate: 0, scale: 1 },
  { x: 180, y: 220, rotate: 0, scale: 1 },
  { x: -180, y: 580, rotate: 0, scale: 1 },
  { x: 180, y: 580, rotate: 0, scale: 1 },
];

// Grid positions for lg+ (1024px+)
const gridPositionsLg = [
  { x: -200, y: 210, rotate: 0, scale: 1 },
  { x: 200, y: 210, rotate: 0, scale: 1 },
  { x: -200, y: 610, rotate: 0, scale: 1 },
  { x: 200, y: 610, rotate: 0, scale: 1 },
];

export function ProjectCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const containerX = useTransform(scrollYProgress, [0, 1], [250, 0]);

  return (
    <>
      {/* Desktop: Animated scroll layout (768px+) */}
      <div ref={containerRef} className="hidden md:block relative min-h-[150vh] overflow-x-hidden">
        <motion.div
          className="sticky top-32 flex flex-col items-center pt-20"
          style={{ x: containerX }}
        >
          <div className="relative w-[850px] h-[850px]" style={{ perspective: "1200px" }}>
            {cards.map((card, index) => {
              const gridPositions = isLargeScreen ? gridPositionsLg : gridPositionsMd;

              const x = useTransform(
                scrollYProgress,
                [0, 1],
                [stackedOffsets[index].x, gridPositions[index].x]
              );
              const y = useTransform(
                scrollYProgress,
                [0, 1],
                [stackedOffsets[index].y, gridPositions[index].y]
              );
              const rotate = useTransform(
                scrollYProgress,
                [0, 1],
                [stackedOffsets[index].rotate, gridPositions[index].rotate]
              );
              const scale = useTransform(
                scrollYProgress,
                [0, 1],
                [stackedOffsets[index].scale, gridPositions[index].scale]
              );

              // At tablet (md to lg), width animates from narrow to wide
              const width = useTransform(scrollYProgress, [0, 1], ["280px", "330px"]);

              return (
                <motion.div
                  key={card.id}
                  className="absolute top-1/2 left-1/2 h-[330px] lg:h-[380px]"
                  style={{
                    x,
                    y,
                    rotate,
                    scale,
                    width: isLargeScreen ? "380px" : width,
                    willChange: "transform",
                    zIndex: 4 - index,
                    marginLeft: isLargeScreen ? "-190px" : "-160px",
                    marginTop: isLargeScreen ? "-190px" : "-160px",
                  }}
                >
                  <div
                    className={`w-full h-full rounded-2xl border-2 border-gray-200 dark:border-gray-800 ${card.color} p-6 flex flex-col justify-between transition-colors shadow-lg pointer-events-auto`}
                  >
                    <div>
                      <h3 className="text-xl font-medium text-white dark:text-black mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-400 dark:text-gray-600 text-xs font-medium">
                        {card.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600">
                      <span className="text-xs font-normal">View Project</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 12L10 8L6 4" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Simple grid layout (< 768px) */}
      <div className="md:hidden grid grid-cols-1 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`rounded-2xl border-2 border-gray-200 dark:border-gray-800 ${card.color} p-6 flex flex-col justify-between transition-colors shadow-lg aspect-square max-w-md mx-auto w-full`}
          >
            <div>
              <h3 className="text-xl font-medium text-white dark:text-black mb-2">{card.title}</h3>
              <p className="text-gray-400 dark:text-gray-600 text-xs font-medium">{card.type}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-600">
              <span className="text-xs font-normal">View Project</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 12L10 8L6 4" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
