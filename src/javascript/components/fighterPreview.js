import createElement from '../helpers/domHelper';

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
        attributes
    });

    return imgElement;
}

function buildStatItem(label, value) {
    const item = createElement({
        tagName: 'div',
        className: 'fighter-preview__stat-item'
    });

    const labelElement = createElement({
        tagName: 'div',
        className: 'fighter-preview__stat-label'
    });

    const valueElement = createElement({
        tagName: 'div',
        className: 'fighter-preview__stat-value'
    });

    labelElement.innerText = label;
    valueElement.innerText = value;

    item.append(labelElement, valueElement);
    return item;
}

function buildStatsBlock(fighter) {
    const container = createElement({
        tagName: 'div',
        className: 'fighter-preview__stats'
    });

    const nameEl = createElement({
        tagName: 'div',
        className: 'fighter-preview__name'
    });
    nameEl.innerText = fighter.name;

    const statsList = createElement({
        tagName: 'div',
        className: 'fighter-preview__stats-list'
    });

    statsList.append(
        buildStatItem('Health', fighter.health),
        buildStatItem('Attack', fighter.attack),
        buildStatItem('Defense', fighter.defense)
    );

    container.append(nameEl, statsList);
    return container;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)

    if (!fighter) throw new Error(`Fighter ${fighter} not found`);

    const image = createFighterImage(fighter);
    const stats = buildStatsBlock(fighter);

    if (position === 'right') {
        fighterElement.append(stats, image);
    } else {
        fighterElement.append(image, stats);
    }

    return fighterElement;
}
