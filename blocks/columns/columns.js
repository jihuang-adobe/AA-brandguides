export default async function decorate(block) {
  const images = block.querySelectorAll('img');
  [...images].forEach((image) => {
    image.classList.add('img-fluid');
  });

  const cssRow = block.querySelector(':scope > div:nth-child(1)');
  const cssCols = block.querySelectorAll(':scope > div:nth-child(1) > div');
  const contentRows = block.querySelectorAll(':scope > div:nth-child(n + 2)');
  const h1s = block.querySelectorAll('h1');
  const h2s = block.querySelectorAll('h2');

  cssRow.classList.add('d-none');

  [...contentRows].forEach((contentRow, index) => {
    contentRow.classList.add('row');
    contentRow.setAttribute('data-bs-spy', 'scroll');
    contentRow.setAttribute('data-bs-target', '#nav');

    const contentCols =  contentRow.querySelectorAll(':scope > div');

    [...contentCols].forEach((contentCol, index) => {
      contentCol.classList.add('col-md-' + cssCols[index].innerText);
    });
  });

  [...h1s].forEach((h1, index) => {
    const text = h1.textContent.toLowerCase().replaceAll(' ', '-');
    h1.setAttribute('id', text);
  });

  [...h2s].forEach((h2, index) => {
    const text = h2.textContent.toLowerCase().replaceAll(' ', '-');
    h2.setAttribute('id', text);
  });
}
