import * as React from 'react';
import { Button } from '@openedx/paragon';
import { Plus, DeleteOutline } from '@openedx/paragon/icons';
import TinyMceEditor from './TinyMceEditor';

interface EditingPageProps {
  title: string
  setTitle: (val: string) => void
  flashcards: Flashcard[]
  setFlashcards: (val: Flashcard[]) => void
}

function EditingPage({
  title, setTitle, flashcards, setFlashcards,
}: EditingPageProps) {
  const [selectedCard, setSelectedCard] = React.useState<number | null>(0);

  const addNewFlashcard = () => {
    setFlashcards([...flashcards, { front: '', back: '' }]);
    setSelectedCard(flashcards.length);
  };

  const updateFlashcard = (idx: number, change: Partial<Flashcard>) => {
    const newFlashcards = [...flashcards];
    Object.assign(newFlashcards[idx], change);
    setFlashcards(newFlashcards);
  };

  const deleteFlashcard = (idx: number) => {
    const newFlashcards = flashcards.filter((_, i) => i !== idx);
    setFlashcards(newFlashcards);
    if (selectedCard === idx) {
      setSelectedCard(newFlashcards.length > 0 ? 0 : null);
    } else if (selectedCard !== null && selectedCard > idx) {
      setSelectedCard(selectedCard - 1);
    }
  };

  return (
    <>
      <div className="mb-3">
        <label className="mb-2" htmlFor="flashcards-title">Flashcards Deck Title</label>
        <input
          id="flashcards-title"
          className="px-2 py-1 w-100"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter deck title"
        />
      </div>

      <div className="d-flex justify-content-end mb-2">
        <Button iconBefore={Plus} onClick={addNewFlashcard}>Add Flashcard</Button>
      </div>

      <div className="d-flex flex-row mx-2">
        <div className="d-flex flex-column mr-2" style={{ flexGrow: 1, width: '30%' }}>
          {flashcards.map((card, idx) => (
            <div key={`${card.front?.slice(0, 8) || 'empty'}-${card.back?.slice(0, 8) || 'empty'}`} className="d-flex align-items-center mb-1">
              <Button
                className="justify-content-start font-weight-bold p-2 rounded-0 flex-grow-1"
                variant={selectedCard === idx ? 'light' : 'outline'}
                onClick={() => setSelectedCard(idx)}
                size="sm"
              >
                {card.front || `Flashcard ${idx + 1}`}
              </Button>
              <Button
                iconBefore={DeleteOutline}
                variant="outline-danger"
                size="sm"
                className="ml-1"
                onClick={() => deleteFlashcard(idx)}
              />
            </div>
          ))}
        </div>

        <div className="d-flex flex-column" style={{ flexGrow: 2 }}>
          {selectedCard !== null && flashcards[selectedCard] && (
          <>
            <div className="mb-3 d-flex flex-column">
              <label className="mb-2" htmlFor="flashcard-front">Front (Question)</label>
              <TinyMceEditor
                value={flashcards[selectedCard].front}
                onChange={(val) => updateFlashcard(selectedCard, { front: val })}
              />
            </div>
            <div className="mb-3 d-flex flex-column">
              <label className="mb-2" htmlFor="flashcard-back">Back (Answer)</label>
              <TinyMceEditor
                value={flashcards[selectedCard].back}
                onChange={(val) => updateFlashcard(selectedCard, { back: val })}
              />
            </div>
          </>
          )}
        </div>
      </div>
    </>
  );
}

export default EditingPage;
