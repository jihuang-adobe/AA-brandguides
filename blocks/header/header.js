import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';

function renderBlock(block) {


  if(!block.classList.contains('container-fluid')) {
    block.classList.add('container-fluid');

    const rootULs = block.querySelectorAll('div > ul');
    [...rootULs].forEach((rootUL) => {
      rootUL.classList.add('nav', 'nav-pills', 'flex-column');
      rootUL.id = 'nav';
    });

    const subULs = block.querySelectorAll('li > ul');
    [...subULs].forEach((subUL) => {
      subUL.classList.add('nav', 'nav-pills', 'flex-column', 'd-none');
    });

    const rootLIs = block.querySelectorAll('div > ul > li');
    [...rootLIs].forEach((rootLI) => {
      rootLI.classList.add('nav-item', 'text-body', 'fw-bold');
    });

    const subLIs = block.querySelectorAll('li > ul > li');
    [...subLIs].forEach((subLI) => {
      subLI.classList.add('nav-item', 'text-body', 'fw-light');
    });

    const images = block.querySelectorAll('img');
    [...images].forEach((image) => {
      image.classList.add('img-fluid');
    });

    const links = block.querySelectorAll('a');
    [...links].forEach((link) => {
      link.classList.add('nav-link', 'text-decoration-none', 'px-3');
    });

    const subLILinks = block.querySelectorAll('li > ul > li > a');
    [...subLILinks].forEach((subLILink) => {
      subLILink.classList.add('mx-3', 'px-3', 'py-1');
    });

    const currentLink = block.querySelector('a[href*="' + location.pathname + '"]');
    if(currentLink) {
      const currentLinkSiblingElement = currentLink.nextElementSibling;
      if(currentLinkSiblingElement) {
        currentLinkSiblingElement.classList.remove('d-none');
      }
    }
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
