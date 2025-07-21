import React, { useState, useEffect, useRef } from "react";
import "../App";
import { Carousel } from "react-responsive-carousel";

interface PortfolioPageProps {
  onResourcesLoaded?: (loaded: number, total: number) => void;
}

const sections = [
  {
    title: `MCTS Agent for Don't Starve Together`,
    description: `For my Artificial Intelligence in Games course me and my group developed a MCTS Agent that was capable to survive the harsh conditions of the game Don't Starve Together. This was accomplished by taking the Fatima Tool and a mod developed by a former colleague from my university (https://steamcommunity.com/sharedfiles/filedetails/?id=1339264854 for more information) and implementing an Agent that took the information from the world, the priorities he had, and decided the best action to take in that moment. Overall the project went great and we were able to have the agent survive for at least five days using simple actions. There was just a problem, the mod was developed for an earlier version of the game, which led to some bugs resulting in the agent getting stuck in items that didn't actually exist in the world, meaning that we could most likely have the agent survive for much longer.`,
    video_link: "https://www.youtube.com/embed/6QXa8V5AW8k",
  },
  {
    title: `Into the Wasteland`,
    description: `The first game creation I was ever apart of. It was created by a group of four people using GameMaker for the course of Game Design. The teachers gave us the topic of Commuting and we had to design a game around that. It was this way that Into the Wasteland was born, as an idea of one of my colleagues, that we later worked on and developed a concrete story with several endings. The main premise is: "You will play as an eleven-year old girl that lives in a village located in a barren Wasteland and has the harsh task of bringing water to her village every day, but that’s not all there is to it. Explore the wasteland, meet new people, make tough decisions... Or don’t, it’s up to you." Being very amateur at making games I ended up working as a supporting role to most of the aspects of the game.`,
    video_link: "https://www.youtube.com/embed/z-QYau4psmM",
  },
  {
    title: `A.I. Multi-Agent System`,
    description: `For my Autonomous Agents and MultiAgent Systems course me and my colleague decided to implement a multi-agent system thats simulates a relationship between two agents of different knowledge sets. The way we capture that relation is the following: There are two agents in the system that will try to complete the game as fast as possible. However each agent controls a character with different characteristics and capabilities. The first agent, called Naive agent, controls a blue sphere that can only see the end goal and the safe environment around it. This means that the Naive agent has no way of seeing or knowing about dangers around it by itself. The second agent, called Protector agent, controls a red cube that can change its shape out of three possible shapes. It is also capable of seeing all dangers and hazards that are spread around the world, however, unlike the Naive agent, it cannot see the end goal, and even if it reaches the end goal it cannot win the level.`,
    video_link: "https://www.youtube.com/embed/8culmciFKcc",
  },
  {
    title: `House Breakout`,
    description: `The second game I worked on. It was built by a team of three and we had the pleasure to work with a student from Escola Superior de Comunicação Social that helped us create a compelling story for our game. It's a escape room type of game with fun puzzles and a interesting story to follow. Although the game has an end, if we had more time we would have liked to had more rooms to it. It was developed on Unity.`,
    video_link: "https://www.youtube.com/embed/WEr45kIqBNU",
  },
  {
    title: `The Lost Colour (WIP)`,
    description: `The work of five people (three programmers and two enthusiasts). It was created during the 2021 Global Game Jam winning the first prize in the jam we participated in. It's a maze like game,  while in first person you can switch between colors and walk on the same plane. While on areal view can switch between planes but cannot change between colours. It was developed using Unity. The plan now is to make a complete game with it, with several levels, some story and better looking graphics.`,
    video_link: "https://www.youtube.com/embed/Dq0zzZfsT5s",
  },
  {
    title: `Plot Lords (Master thesis)`,
    description: `This is the Master thesis I developed. It's a procedural quest generator for the game Mount & Blade II: Bannerlord and was implemented as a mod for the game with the name Plot Lords. Plot Lords aims to improve the questing system of the game by adding brand-new quests that are coexistent with the regular ones. These quests were procedurally generated meaning no one quest is the same. More information: https://www.nexusmods.com/mountandblade2bannerlord/mods/3243?tab=description
Thesis: https://fenix.tecnico.ulisboa.pt/cursos/meic-t/dissertacao/1128253548922731`,
    video_link: "https://www.youtube.com/embed/q6oH5cW7PaA",
  },
  {
    title: `Dream Job`,
    description: `The work of five people (four programmers and one enthusiast). It was created during the 2022 Global Game Jam tying in first place in the jam we participated in. In this game you alternate between a slow-paced daytime office job and an action-packed dream. Office Job Gameplay: Play a memory game, trying to match pairs. Going too long without making a move will make the character fall asleep, going into the Dream World. Dream World Gameplay: The player fights hordes of monsters that will get progressively harder, while searching for clues for the office job. Monster will drop power ups that will grant upgrades. Change between both worlds and solve your job.`,
    video_link: "https://www.youtube.com/embed/u517O7i-4B4",
  },
  {
    title: `Krunkerverse`,
    description: `At FRVR, I contributed to the development and expansion of Krunker, a fast-paced, browser-based FPS with a large global player base. I worked primarily on Krunker Strike (a casual variant) and later on Krunker Royale (a battle royale mode), while also contributing to the core game, Krunker.io.
My role was full-stack, spanning both frontend and backend, using technologies like JavaScript/TypeScript, Mithril.js, Svelte, Go, Node.js, MySQL, and MongoDB. I also helped implement and manage live service features such as A/B testing, real-time shop updates, and feature flags, enabling content changes without requiring redeployment of game clients or servers.
I contributed to the game's matchmaking system, written in Go, improving player placement and mode-specific logic. Additionally, I was involved in DevOps work, helping manage Kubernetes clusters and supporting deployment workflows to ensure smooth operation of the live game infrastructure.
The position required frequent collaboration with game designers and QA and I participated in cross-functional planning to align technical development with gameplay goals.`,
    video_link:
      "https://www.youtube.com/embed/videoseries?list=PLLBs7KYj3EM_KrDvenqwfIaQRMAYJ4xet",
  },
];

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onResourcesLoaded }) => {
  const [resourcesLoaded, setResourcesLoaded] = useState(0);
  const [totalResources, setTotalResources] = useState(0);
  const loadedRef = useRef(0);
  const totalRef = useRef(0);
  const loadedResources = useRef(new Set<string>());

  useEffect(() => {
    const totalCount = 1 + sections.length; // 1 image + videos
    setTotalResources(totalCount);
    totalRef.current = totalCount;
  }, [onResourcesLoaded]);

  const checkComplete = (resourceId?: string) => {
    // Prevent counting the same resource multiple times
    if (loadedRef.current >= totalRef.current) {
      return;
    }

    // If we have a resourceId, check if we've already loaded it
    if (resourceId && loadedResources.current.has(resourceId)) {
      return;
    }

    if (resourceId) {
      loadedResources.current.add(resourceId);
    }

    loadedRef.current++;
    setResourcesLoaded(loadedRef.current);
    if (onResourcesLoaded) {
      onResourcesLoaded(loadedRef.current, totalRef.current);
    }
  };

  const sectionItems = sections.map((section, index) => {
    return (
      <div className="portfolio__section-holder" key={index}>
        <div className={"portfolio__section-content-holder"}>
          <div className="portfolio__section-content-title">
            {section.title}
          </div>
          <iframe
            className="portfolio__section-content-video"
            height="3"
            src={section.video_link}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => checkComplete(`video-${index}`)}
            onError={() => checkComplete(`video-${index}`)}
          ></iframe>
          <div className="portfolio__section-content-description">
            {section.description.split(/(https?:\/\/[^\s]+)/).map((part, i) => {
              if (part.match(/^https?:\/\/[^\s]+$/)) {
                return (
                  <a
                    key={i}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio__link"
                  >
                    {part}
                  </a>
                );
              }
              return part;
            })}
          </div>
        </div>
      </div>
    );
  });

  const settings = {
    infiniteLoop: true,
    showThumbs: false,
  };

  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(0);

  const options = [
    {
      symbol: "account_circle",
      hoverText: "About",
    },
    {
      symbol: "folder_open",
      hoverText: "Projects",
    },
  ];

  const content = [
    <div className="portfolio__about-text">
      <span>
        <span className="portfolio__about-text--highlight">Hi, I'm Marco!</span>{" "}
        <br></br>
        <br></br>I'm a Software Engineer with a Master's degree in Information
        Systems and Computer Engineering from Instituto Superior Técnico, where
        I specialized in Game Development and Artificial Intelligence. <br></br>
        <br></br>
        Professionally, I’ve worked at FRVR, contributing to the fast-paced FPS
        game Krunker and its variants, helping to expand and refine the gameplay
        experience. <br></br>
        <br></br>
        Here you can find a selection of projects I’ve developed - spanning both
        AI and game development:{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/DezLezz"
        >
          https://github.com/DezLezz
        </a>{" "}
        or{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dezlezz.itch.io/"
        >
          https://dezlezz.itch.io/
        </a>
      </span>
    </div>,
    <div className="portfolio__sections">
      <Carousel {...settings}>{sectionItems}</Carousel>
    </div>,
  ];

  return (
    <div className="portfolio">
      <div
        className={`portfolio__profile-img ${
          selectedOption === 1 ? "portfolio__profile-img--projects" : ""
        }`}
      >
        <img
          src="./img/profile-img.png"
          alt="ProfilePic"
          onLoad={() => checkComplete("profile-img")}
          onError={() => checkComplete("profile-img")}
        ></img>
      </div>
      <div className="portfolio__main-title">
        <span>Portfolio: Marco Cabral</span>
      </div>
      <div className="portfolio__option-holder">
        <div className="portfolio__option-bg"></div>
        <div className="portfolio__options">
          {options.map((option, index) => {
            return (
              <div
                className={`portfolio__option ${
                  selectedOption == index ? "portfolio__option--selected" : ""
                }`}
                key={index}
                onMouseEnter={() => setHoveredOption(index)}
                onMouseLeave={() => setHoveredOption(null)}
                onClick={() => setSelectedOption(index)}
              >
                <span className="material-symbols-outlined">
                  {option.symbol}
                </span>
                {/* Conditionally render the div on hover */}
                {hoveredOption === index && (
                  <div className="portfolio__option-tooltip">
                    {option.hoverText}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {content.map((content, index) => {
        return (
          <div
            className={`portfolio__content ${
              selectedOption === 1 ? "portfolio__content--projects" : ""
            }`}
            style={{
              opacity: selectedOption === index ? "1" : "0",
              pointerEvents: selectedOption === index ? "all" : "none",
            }}
            key={index}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioPage;
