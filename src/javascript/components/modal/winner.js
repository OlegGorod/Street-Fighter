import { showModal } from "./modal";

export function showWinnerModal(fighter) {
  const title = `The winner is ${fighter.name}`
  const bodyElement = 'Congratulations to the winner!';
  const onClose = () => window.location.reload();
  showModal({title,  bodyElement, onClose})
  // call showModal function 
}
