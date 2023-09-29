import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';

function renderBlock(block) {

  if(!block.classList.contains('container-fluid')) {
    block.classList.add('container-fluid');

    const rootULs = block.querySelectorAll('div > ul');
    [...rootULs].forEach((rootUL) => {
      rootUL.classList.add('nav', 'nav-pills' ,'flex-column');
    });

    const subULs = block.querySelectorAll('li > ul');
    [...subULs].forEach((subUL) => {
      subUL.classList.add('nav', 'nav-pills', 'flex-column', 'px-3', 'py-1');
    });

    const rootLIs = block.querySelectorAll('div > ul > li');
    [...rootLIs].forEach((rootLI) => {
      rootLI.classList.add('nav-link', 'text-body', 'fw-bold');
    });

    const subLIs = block.querySelectorAll('li > ul > li');
    [...subLIs].forEach((subLI) => {
      subLI.classList.add('nav-link', 'text-body', 'fw-light');
    });
  };
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navPath = getMetadata('nav');

  if(navPath) {
    const resp = await fetch(`${navPath}.plain.html`);

    if (resp.ok) {
      const header = document.createElement('div');
      header.innerHTML = await resp.text();

      const headerSection = header.querySelector('.header');
      
      renderBlock(headerSection);

      block.innerHTML = '';
      block.append(...headerSection.children);
    }
  } else {
    renderBlock(block);
  }
}
