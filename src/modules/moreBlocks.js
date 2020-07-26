export default function moreBlocks(target) {
  const blocks = target.parentElement.children;

  for (let i = 3; i < blocks.length - 1; i++) {
    blocks[i].classList.remove('hidden');
  }

  target.classList.add('hidden');
}