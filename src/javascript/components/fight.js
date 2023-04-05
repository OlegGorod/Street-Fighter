import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over

    const leftFighterIndicator = document.getElementById('left-fighter-indicator')
    const rightFighterIndicator = document.getElementById('right-fighter-indicator')

    const stateHealth = {
      firstFighter: { health: firstFighter.health },
      secondFighter: { health: secondFighter.health }
    }
    const interval = 3000;

    let blockLeftFighter = false;
    let blockRightFighter = false;
    let leftFighterTimeout;
    let rightFighterTimeout;
    let keysDown = {};



    document.addEventListener('keydown', (event) => {

      const action = event.code;
      const { PlayerOneAttack, PlayerTwoAttack, PlayerOneBlock, PlayerTwoBlock, PlayerOneCriticalHitCombination, PlayerTwoCriticalHitCombination } = controls;

      keysDown[action] = true;
      const allKeyPressedLeft = PlayerOneCriticalHitCombination.every((keyCode) => keysDown[keyCode])
      const allKeyPressedRight = PlayerTwoCriticalHitCombination.every((keyCode) => keysDown[keyCode])

      if (allKeyPressedLeft && !leftFighterTimeout) {
        stateHealth.secondFighter.health -= firstFighter.attack * 2
        rightFighterIndicator.style.width = ((stateHealth.secondFighter.health * 100) / secondFighter.health) + '%';
        leftFighterTimeout = setTimeout(() => {
          leftFighterTimeout = null;
        }, interval);
      }

      if (allKeyPressedRight && !rightFighterTimeout) {
        stateHealth.firstFighter.health -= secondFighter.attack * 2
        leftFighterIndicator.style.width = ((stateHealth.firstFighter.health * 100) / firstFighter.health) + '%';
        rightFighterTimeout = setTimeout(() => {
          rightFighterTimeout = null;
        }, interval);
      }

      switch (action) {
        case PlayerOneAttack:
          if (!blockLeftFighter && !blockRightFighter) {
            stateHealth.secondFighter.health -= getDamage(firstFighter, secondFighter)
            rightFighterIndicator.style.width = ((stateHealth.secondFighter.health * 100) / secondFighter.health) + '%'
          }
          break;

        case PlayerTwoAttack:
          if (!blockLeftFighter && !blockRightFighter) {
            stateHealth.firstFighter.health -= getDamage(firstFighter, secondFighter)
            leftFighterIndicator.style.width = ((stateHealth.firstFighter.health * 100) / firstFighter.health) + '%'
          }
          break;

        case PlayerOneBlock:
          blockLeftFighter = true;
          break;
        case PlayerTwoBlock:
          blockRightFighter = true;

        default:
          break;
      }


      if (stateHealth.secondFighter.health <= 0) {
        rightFighterIndicator.style.width = '0%'
        resolve(firstFighter)
      } else if (stateHealth.firstFighter.health <= 0) {
        leftFighterIndicator.style.width = '0%'
        resolve(secondFighter)
      }
    })

    document.addEventListener('keyup', (event) => {
      const action = event.code;
      const { PlayerOneBlock, PlayerTwoBlock } = controls;
      keysDown[action] = false;

      switch (action) {
        case PlayerOneBlock:
          blockLeftFighter = false;
          break;
        case PlayerTwoBlock:
          blockRightFighter = false;
        default:
          break;
      }
    })

  });
}



export function getDamage(attacker, defender) {
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender)
  const damage = blockPower > hitPower ? 0 : hitPower - blockPower;
  return damage
}

export function getHitPower(fighter) {
  const criticalHitChance = (Math.random() + 1)
  const hitPower = fighter.attack * criticalHitChance;
  return hitPower
}

export function getBlockPower(fighter) {
  const dodgeChance = (Math.random() + 1)
  const blockPower = fighter.defense * dodgeChance;
  return blockPower;
}
