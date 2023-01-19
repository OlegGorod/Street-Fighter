import { createElement } from '../helpers/domHelper';

const fighterInfoBuilder = (propertyName, fighter, rootElem) => {
  const name = rootElem.appendChild(createElement({
    tagName: 'div',
    className: `fighter-preview___info`,
  }));
  const nameTitle = name.appendChild(createElement({ tagName: 'p'}));
  const capitalizedPropName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
  nameTitle.textContent = `${capitalizedPropName}: `;
  const nameDescription = name.appendChild(createElement({ tagName: 'p'}));
  nameDescription.textContent = fighter[propertyName];
}

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)
  const fragment = document.createDocumentFragment();

  fighterInfoBuilder('name', fighter, fragment);
  fighterInfoBuilder('health', fighter, fragment);
  fighterInfoBuilder('attack', fighter, fragment);
  fighterInfoBuilder('defense', fighter, fragment);

  const picture = fragment.appendChild(createElement({
    tagName: 'img',
    className: `fighter-preview___img`,
    attributes: { src: fighter.source }
  }));
  picture.textContent = fighter.health;

  fighterElement.appendChild(fragment);
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
