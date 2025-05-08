import controls from '../../constants/controls';

export function getHitPower(fighter) {
    const criticalHitChance = Math.random() + 1;
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1;
    return fighter.defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return Math.max(damage, 0);
}

function reduceHealth(healthBarElement, damage) {
    if (healthBarElement.children.length === 0) return;
    for (let i = 0; i < damage; i += 1) {
        healthBarElement.removeChild(healthBarElement.lastChild);
    }
}

function checkForWinner(firstFighter, secondFighter, [firstHealthPoints, secondHealthPoints]) {
    if (firstHealthPoints <= 0) {
        return secondFighter;
    }

    if (secondHealthPoints <= 0) {
        return firstFighter;
    }

    return null;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const secondHealthPoints = document.getElementById('right-fighter-indicator');
        const firstHealthPoints = document.getElementById('left-fighter-indicator');

        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;

        const secondFighterBlocking = Math.ceil(secondFighter.defense + secondFighter.defense * 0.7);
        const firstFighterBlocking = Math.ceil(firstFighter.defense + firstFighter.defense * 0.7);

        const keysPressed = {};

        function handleKeydown(event) {
            keysPressed[event.code] = true;

            if (keysPressed[controls.PlayerOneBlock] && event.code === controls.PlayerOneAttack) {
                return;
            }
            if (keysPressed[controls.PlayerTwoBlock] && event.code === controls.PlayerTwoAttack) {
                return;
            }

            if (controls.PlayerOneCriticalHitCombination.every(key => keysPressed[key])) {
                secondFighterHealth -= getDamage(firstFighter, secondFighter) * 2;
                reduceHealth(secondHealthPoints, getDamage(firstFighter, secondFighter) * 2);
                if (checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]) !== null) {
                    resolve(checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]));
                }
            }

            if (controls.PlayerTwoCriticalHitCombination.every(key => keysPressed[key])) {
                firstFighterHealth -= getDamage(secondFighter, firstFighter) * 2;
                reduceHealth(firstHealthPoints, getDamage(secondFighter, firstFighter) * 2);
                if (checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]) !== null) {
                    resolve(checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]));
                }
            }

            if (event.code === controls.PlayerOneAttack) {
                secondFighterHealth -= getDamage(firstFighter, secondFighter);
                reduceHealth(secondHealthPoints, getDamage(firstFighter, secondFighter));
                if (checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]) !== null) {
                    resolve(checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]));
                }
            }

            if (event.code === controls.PlayerTwoAttack) {
                firstFighterHealth -= getDamage(secondFighter, firstFighter);
                reduceHealth(firstHealthPoints, getDamage(secondFighter, firstFighter));
                if (checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]) !== null) {
                    resolve(checkForWinner(firstFighter, secondFighter, [firstFighterHealth, secondFighterHealth]));
                }
            }

            if (event.code === controls.PlayerOneBlock) {
                // eslint-disable-next-line no-param-reassign
                firstFighter.defense = firstFighterBlocking;
            }

            if (event.code === controls.PlayerTwoBlock) {
                // eslint-disable-next-line no-param-reassign
                secondFighter.defense = secondFighterBlocking;
            }
        }

        document.addEventListener('keydown', handleKeydown, false);

        document.addEventListener('keyup', event => {
            if (event.code === controls.PlayerOneBlock) {
                // eslint-disable-next-line no-param-reassign
                firstFighter.defense = Math.ceil(firstFighter.defense - firstFighter.defense * 0.7);
            }

            if (event.code === controls.PlayerTwoBlock) {
                // eslint-disable-next-line no-param-reassign
                secondFighter.defense = Math.ceil(secondFighter.defense - secondFighter.defense * 0.7);
            }

            delete keysPressed[event.code];
        });
    });
}
