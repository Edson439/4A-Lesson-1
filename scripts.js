const arrowUp = document.querySelector('.arrow.up');
const arrowDown = document.querySelector('.arrow.down');
let currentAudio = null;

// Botones del menu
const menuPart1 = document.getElementById('menuPart1');
const menuPart2 = document.getElementById('menuPart2');
const menuPart3 = document.getElementById('menuPart3');
const menuColorChart = document.getElementById('menuColorChart');
const menuWhiteboard = document.getElementById('menuWhiteboard');

// Navegacion por secciones
menuPart1.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('part1');
});

menuPart2.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('part2');
});

menuPart3.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('part3');
});

menuColorChart.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('colorChart');
});
menuWhiteboard.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('whiteboard');
});
// Tarjetas por seccion
const sectionCards = {
  part1: {
    container: document.getElementById('part1Content'),
    get cards() {
      return document.querySelectorAll('#part1Content .vocab-card');
    },
    index: 0
  },
  part2: {
    container: document.getElementById('part2Content'),
    get cards() {
      return document.querySelectorAll('#part2Content .vocab-card');
    },
    index: 0
  },
  part3: {
    container: document.getElementById('part3Content'),
    get cards() {
      return document.querySelectorAll('#part3Content .vocab-card');
    },
    index: 0
  },
  colorChart: {
    container: document.getElementById('colorChartContent'),
    get cards() {
      return document.querySelectorAll('#colorChartContent .vocab-card');
    },
    index: 0
  }
};

function showSection(sectionToShow) {
	const sections = ['part1Content', 'part2Content', 'part3Content', 'colorChartContent', 'whiteboardContent'];

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const arrows = document.querySelector('.arrows');
	if (arrows) {
	  if (sectionToShow === 'colorChart' || sectionToShow === 'whiteboard') {
		arrows.style.display = 'none';
	  } else {
		arrows.style.display = 'flex';
	  }
	}

  const activeContent = document.getElementById(sectionToShow + 'Content');
  if (activeContent) {
    activeContent.style.display = 'block';
  }

  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
    const img = item.querySelector('img');
    if (img) {
      img.setAttribute('src', img.getAttribute('src').replace('_2.png', '.png'));
    }
  });

const menuMap = {
  part1: 'menuPart1',
  part2: 'menuPart2',
  part3: 'menuPart3',
  colorChart: 'menuColorChart',
  whiteboard: 'menuWhiteboard'
};

const activeMenu = document.getElementById(menuMap[sectionToShow]);
if (activeMenu) {
  activeMenu.classList.add('active');
  const img = activeMenu.querySelector('img');
  if (img) {
    img.setAttribute('src', img.getAttribute('src').replace('.png', '_2.png'));
  }
}

  document.querySelectorAll('.mobile-item').forEach(item => {
    item.classList.remove('active');
    const img = item.querySelector('img');
    if (img) {
      img.setAttribute('src', img.getAttribute('src').replace('_2.png', '.png'));
    }
  });

  generateDotsFor(sectionToShow);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Mostrar tarjeta activa
function showCard(section) {
  const s = sectionCards[section];
  if (!s) return;

  s.cards.forEach((card, i) => {
    card.classList.toggle('active', i === s.index);
  });
}

// dots
const dotsContainer = document.getElementById('dotsContainer');

function generateDotsFor(section) {
  if (!dotsContainer) return;

  dotsContainer.innerHTML = '';

	if (section === 'colorChart' || section === 'whiteboard') {
	  dotsContainer.style.display = 'none';
	  return;
	} else {
	  dotsContainer.style.display = 'flex';
	}

  let items = [];

  if (sectionCards[section]) {
    items = sectionCards[section].cards;
  }

  items.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');

    if (sectionCards[section] && index === sectionCards[section].index) {
      dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
      sectionCards[section].index = index;
      showCard(section);
      generateDotsFor(section);
    });

    dotsContainer.appendChild(dot);
  });
}

function getActiveSection() {
  const sections = {
    part1: 'part1Content',
    part2: 'part2Content',
    part3: 'part3Content',
    colorChart: 'colorChartContent',
    whiteboard: 'whiteboardContent'
  };

  for (let key in sections) {
    const el = document.getElementById(sections[key]);
    if (el && el.style.display === 'block') return key;
  }

  return 'part1';
}

// Flecha arriba
arrowUp.addEventListener('click', () => {
  const section = getActiveSection();

  if (sectionCards[section]) {
    const sec = sectionCards[section];

	  if (section === 'part1' || section === 'part2' || section === 'part3') {
      if (sec.index > 0) {
        sec.index--;
        showCard(section);
        generateDotsFor(section);
      }
    } else {
      sec.index = (sec.index - 1 + sec.cards.length) % sec.cards.length;
      showCard(section);
      generateDotsFor(section);
    }
  }
});

// Flecha abajo
arrowDown.addEventListener('click', () => {
  const section = getActiveSection();

  if (sectionCards[section]) {
    const sec = sectionCards[section];

	  if (section === 'part1' || section === 'part2' || section === 'part3') {
      if (sec.index < sec.cards.length - 1) {
        sec.index++;
        showCard(section);
        generateDotsFor(section);
      }
    } else {
      sec.index = (sec.index + 1) % sec.cards.length;
      showCard(section);
      generateDotsFor(section);
    }
  }
});

// Hover: cambia iconos a version _2.png
document.querySelectorAll('.menu-item').forEach(item => {
  const img = item.querySelector('img');
  if (!img) return;

  const originalSrc = img.getAttribute('src');
  const hoverSrc = originalSrc.replace('.png', '_2.png');

  item.addEventListener('mouseenter', () => img.setAttribute('src', hoverSrc));
  item.addEventListener('mouseleave', () => {
    if (!item.classList.contains('active')) {
      img.setAttribute('src', originalSrc);
    }
  });
});

// ===== PARTE DE REVEAL / AUDIO =====
const vocabRevealState = {};

function playAudio(file) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(file);
  currentAudio.play();
}

function toggleImage(el) {
  el.classList.toggle('revealed');

  const img = el.querySelector('img');
  if (img && img.getAttribute('onclick')) {
    const match = img.getAttribute('onclick').match(/'(.*?)'/);
    if (match) {
      playAudio(match[1]);
    }
  }
}

function resetImageReveal() {
  const card = document.querySelector('.vocab-card.active');
  if (!card) return;

  card.querySelectorAll('.circle').forEach(c => c.classList.remove('revealed'));
}

function adjustGridColumns() {
  document.querySelectorAll('.containermov').forEach(container => {
    const totalCircles = container.querySelectorAll('.circle').length;
    const columns = Math.min(totalCircles, 6);
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    container.style.gap = '10px';
  });
}

// ===== COLOR CHART =====
const chartIcons = document.querySelectorAll('.chart-icon');
const selectedIconsContainer = document.getElementById('selectedIcons');
const clearIconsBtn = document.getElementById('clearIconsBtn');
const enterLineBtn = document.getElementById('enterLineBtn');
const toggleSoundBtn = document.getElementById('toggleSoundBtn');

if (enterLineBtn) {
  enterLineBtn.addEventListener('click', () => {
    const spacer = document.createElement('div');
    spacer.classList.add('line-break');
    selectedIconsContainer.appendChild(spacer);
  });
}

chartIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const clone = icon.cloneNode(true);
    selectedIconsContainer.appendChild(clone);
  });
});

if (clearIconsBtn) {
  clearIconsBtn.addEventListener('click', () => {
    selectedIconsContainer.innerHTML = '';
  });
}

let isSoundActive = false;

if (toggleSoundBtn) {
  toggleSoundBtn.classList.remove('sound-active');
  toggleSoundBtn.querySelector('i').textContent = 'volume_off';

  toggleSoundBtn.addEventListener('click', () => {
    isSoundActive = !isSoundActive;

    toggleSoundBtn.classList.toggle('sound-active', isSoundActive);
    const icon = toggleSoundBtn.querySelector('i');
    icon.textContent = isSoundActive ? 'volume_up' : 'volume_off';
  });
}

document.querySelectorAll('#colorChartContent .chart-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const colorChart = document.getElementById('colorChartContent');
    if (colorChart.style.display !== 'none') {
      if (!isSoundActive) return;

      const soundNumber = icon.getAttribute('data-sound').padStart(2, '0');
      const audio = new Audio(`CC/sounds/CC${soundNumber}.mp3`);
      audio.play();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  showSection('part1');
});


const ogPopupOverlay = document.getElementById('ogPopupOverlay');
const ogPopupFrame = document.getElementById('ogPopupFrame');
const ogPopupClose = document.getElementById('ogPopupClose');

function openOgPopup(file, btn) {
  const card = btn.closest('.vocab-card');
  if (!card) return;

  const overlay = card.querySelector('.og-popup-overlay');
  const frame = card.querySelector('.ogPopupFrame');
  const closeBtn = card.querySelector('.og-popup-close');

  if (!overlay || !frame || !closeBtn) return;

  frame.src = file;
  overlay.classList.add('active');

  closeBtn.onclick = () => {
    overlay.classList.remove('active');
    frame.src = '';
  };

  overlay.onclick = (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      frame.src = '';
    }
  };
}

function closeOgPopup() {
  ogPopupOverlay.classList.remove('active');
  ogPopupFrame.src = '';
}

if (ogPopupClose) {
  ogPopupClose.addEventListener('click', closeOgPopup);
}

if (ogPopupOverlay) {
  ogPopupOverlay.addEventListener('click', (e) => {
    if (e.target === ogPopupOverlay) {
      closeOgPopup();
    }
  });
}