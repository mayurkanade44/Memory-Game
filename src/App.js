import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const cardImages = [
    { src: "/img/potion-1.png", matched: false },
    { src: "/img/ring-1.png", matched: false },
    { src: "/img/scroll-1.png", matched: false },
    { src: "/img/shield-1.png", matched: false },
    { src: "/img/sword-1.png", matched: false },
    { src: "/img/helmet-1.png", matched: false },
  ];

  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoice1(null);
    setChoice2(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    if (choice1 && choice2) {
      setDisabled(true);
      if (choice1.src === choice2.src) {
        setCards((cards) => {
          return cards.map((card) => {
            if (card.src === choice1.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choice1, choice2]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const resetTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice1 || card === choice2 || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
