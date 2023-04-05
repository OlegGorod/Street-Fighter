import { createElement } from '../helpers/domHelper';


export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
 
  const {attack, health, name, defense} = fighter;
  const fighterInfo = createElement({
    tagName: 'div',
    className: `fighter-preview__info`
  });
  const fighterImage = createFighterImage(fighter)

  fighterInfo.innerHTML = `
  <h2>Name: ${name}</h2>
  <div>Attack: ${attack}</div>
  <div>Health: ${health}</div>
  <div>Defense: ${defense}</div>
  `;
  fighterElement.append(fighterInfo, fighterImage)
  // todo: show fighter info (image, name, health, etc.)

  

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
