import showModal from './modal';
import createElement from '../../helpers/domHelper';
import { createFighterImage } from '../fighterPreview';

function createWinnerModalBody(fighter) {
    const winner = createElement({ tagName: 'div', className: 'modal-winner' });
    const winnerName = createElement({ tagName: 'span', className: 'modal-winner-name' });
    const winnerImage = createFighterImage(fighter);

    winnerName.innerText = fighter.name;
    winner.append(winnerName, winnerImage);

    return winner;
}

export default function showWinnerModal(fighter) {
    // call showModal function
    showModal({
        title: 'Winner',
        bodyElement: createWinnerModalBody(fighter),
        onClose: () => window.location.reload()
    });
}
