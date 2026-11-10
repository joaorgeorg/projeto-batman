/**
 * THE BATMAN - INTERATIVIDADE, AUDIO SYNTHESIZER, CANVAS GOTHAM E SISTEMA DE TRAILERS
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Áudio Sintetizador Web Audio API (Sons de Batcomputador, risada do Coringa, gongo sombrio)
  const AudioEngine = (() => {
    let audioCtx = null;
    let soundEnabled = true;

    const initAudio = () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    };

    // Beep cibernético do Batcomputador
    const playBatBeep = (freq = 880, duration = 0.08) => {
      if (!soundEnabled) return;
      try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {
        // Fallback silencioso caso browser bloqueie
      }
    };

    // Gongo sombrio do Cavaleiro das Trevas
    const playDarkBoom = () => {
      if (!soundEnabled) return;
      try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 1.2);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      } catch (e) {}
    };

    // Efeito sonoro: Riso caótico do Coringa sintetizado
    const playJokerLaugh = () => {
      if (!soundEnabled) return;
      initAudio();
      const notes = [320, 480, 290, 520, 270, 540, 250, 580];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          playBatBeep(freq, 0.12);
        }, i * 110);
      });
    };

    // Efeito sonoro: Charada (código computacional misterioso)
    const playRiddlerCode = () => {
      if (!soundEnabled) return;
      initAudio();
      [600, 750, 900, 1200].forEach((freq, idx) => {
        setTimeout(() => playBatBeep(freq, 0.07), idx * 80);
      });
    };

    // Moeda do Duas-Caras caindo
    const playCoinSpin = () => {
      if (!soundEnabled) return;
      initAudio();
      [1200, 1400, 1100, 1300, 1600].forEach((freq, idx) => {
        setTimeout(() => playBatBeep(freq, 0.05), idx * 60);
      });
    };

    const toggleSound = () => {
      soundEnabled = !soundEnabled;
      return soundEnabled;
    };

    return {
      playBatBeep,
      playDarkBoom,
      playJokerLaugh,
      playRiddlerCode,
      playCoinSpin,
      toggleSound,
      initAudio
    };
  })();

  // 2. Bat-Cursor Seguidor com Suavização
  const batCursor = document.getElementById('bat-cursor');
  if (batCursor && window.innerWidth > 992) {
    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      batCursor.style.left = `${cursorX}px`;
      batCursor.style.top = `${cursorY}px`;
      requestAnimationFrame(updateCursor);
    };
    updateCursor();
  }

  // 3. Canvas de Gotham: Chuva Noturna & Névoa Atmosférica
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const rainCount = 130;
    const raindrops = [];
    for (let i = 0; i < rainCount; i++) {
      raindrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 8 + 12,
        opacity: Math.random() * 0.35 + 0.1
      });
    }

    const animateGothamRain = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(180, 210, 255, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();

      for (let i = 0; i < rainCount; i++) {
        const drop = raindrops[i];
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 2, drop.y + drop.length);

        drop.y += drop.speed;
        drop.x -= 1;

        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      }
      ctx.stroke();

      requestAnimationFrame(animateGothamRain);
    };
    animateGothamRain();
  }

  // 4. Controle de Áudio SFX no Header
  const audioToggleBtn = document.getElementById('bat-audio-toggle');
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      const active = AudioEngine.toggleSound();
      audioToggleBtn.innerHTML = active 
        ? '<i class="fa-solid fa-volume-high"></i><span>ÁUDIO SFX: ATIVO</span>'
        : '<i class="fa-solid fa-volume-xmark"></i><span>ÁUDIO SFX: MUDO</span>';
      if (active) AudioEngine.playBatBeep(880, 0.1);
    });
  }

  // 5. Acionador do Bat-Sinal no Céu (Projeção Dinâmica)
  const skyBatsignal = document.getElementById('sky-batsignal');
  const signalTriggerBtn = document.getElementById('bat-signal-trigger');
  const footerBatsignalBtn = document.getElementById('footer-batsignal-btn');

  const triggerSignal = () => {
    AudioEngine.playDarkBoom();
    if (!skyBatsignal) return;
    skyBatsignal.classList.toggle('active');
    
    if (skyBatsignal.classList.contains('active')) {
      setTimeout(() => {
        if (skyBatsignal.classList.contains('active')) {
          skyBatsignal.classList.remove('active');
        }
      }, 7000);
    }
  };

  if (signalTriggerBtn) signalTriggerBtn.addEventListener('click', triggerSignal);
  if (footerBatsignalBtn) footerBatsignalBtn.addEventListener('click', triggerSignal);

  // 6. Modo Detetive (Detective Mode Toggle)
  const detectiveBtn = document.getElementById('detective-mode-btn');
  if (detectiveBtn) {
    detectiveBtn.addEventListener('click', () => {
      AudioEngine.playBatBeep(1200, 0.15);
      document.body.classList.toggle('detective-active');
      if (document.body.classList.contains('detective-active')) {
        detectiveBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> DESATIVAR MODO DETETIVE';
      } else {
        detectiveBtn.innerHTML = '<i class="fa-solid fa-eye"></i> MODO DETETIVE';
      }
    });
  }

  // 7. Efeito 3D Tilt no Cartão Hero
  const tiltCard = document.getElementById('tilt-card');
  if (tiltCard && window.innerWidth > 992) {
    tiltCard.addEventListener('mousemove', (e) => {
      const rect = tiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      tiltCard.style.transform = `perspective(1000px) rotateY(${x * 0.08}deg) rotateX(${-y * 0.08}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    tiltCard.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    });
  }

  // 8. Origem e Linha do Tempo Interativa
  const originCards = document.querySelectorAll('.origin-card');
  const termTitle = document.getElementById('term-title');
  const termDesc = document.getElementById('term-desc');

  const originData = {
    'crime-alley': {
      title: 'A NOITE FATÍDICA EM PARK ROW',
      desc: 'O disparo na saída do Monarch Theater. Bruce presencia a perda de seus pais. Naquela noite nasce a promessa de limpar Gotham City e impedir que novas crianças sofram a mesma perda irreparável.'
    },
    'training': {
      title: 'MESTRADO EM 127 DISCIPLINAS BÉLICAS',
      desc: 'Bruce treinou com mestres de artes marciais no Japão, caçadores de recompensa na África, monges no Tibete e criminologistas franceses. Seu corpo e mente foram refinados ao limite humano absoluto.'
    },
    'bat-omen': {
      title: 'O SIMBOLISMO DO MEDO',
      desc: 'Um morcego quebra a vidraça da biblioteca na Mansão Wayne. Bruce compreende que para combater o terror da máfia e dos psicopatas, ele próprio precisava ser o pesadelo dos criminosos.'
    },
    'code': {
      title: 'O JURAMENTO DA LINHA VERMELHA',
      desc: 'A não utilização de armas de fogo e a recusa irredutível de matar. O Batman acredita que ao assassinar, a justiça cede lugar à vingança incontrolável, tornando o vigilante igual àqueles que persegue.'
    }
  };

  originCards.forEach((card) => {
    card.addEventListener('click', () => {
      originCards.forEach(c => c.classList.remove('active-origin'));
      card.classList.add('active-origin');
      AudioEngine.playBatBeep(720, 0.06);

      const target = card.dataset.target;
      if (originData[target] && termTitle && termDesc) {
        termTitle.textContent = originData[target].title;
        termDesc.textContent = originData[target].desc;
      }
    });
  });

  // 9. Filtro da Bat-Família / Aliados
  const filterBtns = document.querySelectorAll('.filter-btn');
  const charCards = document.querySelectorAll('#allies-grid .char-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AudioEngine.playBatBeep(800, 0.05);

      const filter = btn.dataset.filter;
      charCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 10. Player de Cinema e Playlist de Trailers
  const playlistItems = document.querySelectorAll('.playlist-item');
  const mainIframe = document.getElementById('main-trailer-iframe');
  const currentMovieLabel = document.getElementById('current-movie-label');
  const currentTrailerTitle = document.getElementById('current-trailer-title');
  const currentTrailerDesc = document.getElementById('current-trailer-desc');
  const trailerDirector = document.getElementById('trailer-director');
  const trailerActor = document.getElementById('trailer-actor');
  const trailerYear = document.getElementById('trailer-year');

  playlistItems.forEach(item => {
    item.addEventListener('click', () => {
      playlistItems.forEach(i => i.classList.remove('active-trailer'));
      item.classList.add('active-trailer');
      AudioEngine.playDarkBoom();

      const videoId = item.dataset.videoId;
      const title = item.dataset.title;
      const desc = item.dataset.desc;
      const director = item.dataset.director;
      const actor = item.dataset.actor;
      const year = item.dataset.year;

      if (mainIframe) {
        mainIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
      }
      if (currentMovieLabel) currentMovieLabel.textContent = `${title} - Transmissão Ativa`;
      if (currentTrailerTitle) currentTrailerTitle.textContent = title;
      if (currentTrailerDesc) currentTrailerDesc.textContent = desc;
      if (trailerDirector) trailerDirector.innerHTML = `<strong>Direção:</strong> ${director}`;
      if (trailerActor) trailerActor.innerHTML = `<strong>Batman:</strong> ${actor}`;
      if (trailerYear) trailerYear.innerHTML = `<strong>Ano:</strong> ${year}`;
    });
  });

  // 11. Botões de Efeito dos Vilões
  const villainAudioBtns = document.querySelectorAll('.villain-audio-btn');
  villainAudioBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const quoteType = btn.dataset.quote;
      if (quoteType === 'joker') AudioEngine.playJokerLaugh();
      else if (quoteType === 'riddler') AudioEngine.playRiddlerCode();
      else if (quoteType === 'coin') AudioEngine.playCoinSpin();
      else AudioEngine.playDarkBoom();
    });
  });

  // 12. Modal de Dossiê da Bat-Família
  const dossierModal = document.getElementById('dossier-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const expandBtns = document.querySelectorAll('.dossier-expand-btn');

  const dossiers = {
    'alfred': {
      title: 'Alfred Pennyworth // Registro Confidencial',
      html: `
        <p><strong>Identidade Completa:</strong> Alfred Thaddeus Crane Pennyworth</p>
        <p><strong>Histórico Militar:</strong> Ex-agente do Special Air Service (SAS) britânico e perito em cirurgia de campo.</p>
        <p>Após a morte dos Wayne, assumiu a custódia legal de Bruce. É o único capaz de confrontar o Batman sobre sua obsessão e humanidade.</p>
        <ul>
          <li>Habilidades: Tratamento de trauma, medicina de emergência, combate tático velado e perícia em disfarces.</li>
          <li>Papel Estratégico: Gestor central dos sistemas de defesa da Mansão Wayne e da Batcaverna.</li>
        </ul>
      `
    },
    'gordon': {
      title: 'Comissário James W. Gordon // Arquivo Policial',
      html: `
        <p><strong>Cargo:</strong> Comissário do Departamento de Polícia de Gotham City (GCPD)</p>
        <p><strong>Relação com o Batman:</strong> Parceiro tático não oficial. Mantém a lâmpada do Bat-Sinal ativa no teto do DPGC.</p>
        <p>Apesar de ciente de que Batman opera fora da lei estrita, reconhece que a justiça formal de Gotham foi corrompida por subornos e máfias.</p>
        <ul>
          <li>Integridade: Jamais aceitou um centavo de Carmine Falcone ou Salvatore Maroni.</li>
          <li>Filha: Barbara Gordon (Batgirl / Oráculo).</li>
        </ul>
      `
    },
    'dick': {
      title: 'Richard "Dick" Grayson // Codinome: Asa Noturna',
      html: `
        <p><strong>Identidade:</strong> Richard John Grayson</p>
        <p><strong>Origem:</strong> Sobrevivente do espetáculo acrobático 'Haly's Circus'. Adotado por Bruce como seu primeiro pupilo.</p>
        <p>Superou as sombras de Batman para se tornar um líder inspirador por conta própria, liderando os Novos Titãs e fundando sua proteção na cidade de Blüdhaven.</p>
        <ul>
          <li>Armamento: Dois bastões de Escrima condutores de eletricidade e asa-delta de planamento.</li>
          <li>Habilidade Acrobática: O único ser humano vivo capaz de executar um quádruplo salto mortal sem cordas.</li>
        </ul>
      `
    },
    'barbara': {
      title: 'Barbara Gordon // Oráculo & Batgirl',
      html: `
        <p><strong>Identidade:</strong> Barbara Gordon</p>
        <p><strong>Qualificação:</strong> Doutora em Biblioteconomia, hacker nível militar e faixa-preta em Judô.</p>
        <p>Mesmo após a tragédia perpetrada pelo Coringa, recusou-se a recuar: reinventou-se como 'Oráculo', o maior cérebro digital da comunidade de heróis mundial.</p>
        <ul>
          <li>Capacidade Cibernética: Acesso a satélites militares, câmeras de tráfego de Gotham e inteligência em tempo real.</li>
        </ul>
      `
    },
    'lucius': {
      title: 'Lucius Fox // Divisão Wayne Enterprises P&D',
      html: `
        <p><strong>Cargo:</strong> CEO / Diretor Executivo da Wayne Enterprises</p>
        <p><strong>Função:</strong> Gerenciar os contratos de defesa avançada e reorientar protótipos militares descartados para a causa do Batman.</p>
        <ul>
          <li>Criações Chave: O Batmóvel blindado (Tumbler), a liga metálica de memória com voo planado e o sistema de sonar de alta precisão.</li>
        </ul>
      `
    },
    'selina': {
      title: 'Selina Kyle // A Mulher-Gato',
      html: `
        <p><strong>Codinome:</strong> Catwoman</p>
        <p><strong>Classificação:</strong> Furtos de joias de alta segurança e vigilante independente do East End.</p>
        <p>A única pessoa em Gotham que compreende totalmente a dor e a solidão da vida dupla de Bruce Wayne, mantendo um jogo de atração e desafio nos telhados.</p>
      `
    }
  };

  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioEngine.playBatBeep(920, 0.08);
      const card = btn.closest('.char-card');
      const charKey = card ? card.dataset.char : 'alfred';
      const dossier = dossiers[charKey] || dossiers['alfred'];

      if (modalTitle) modalTitle.textContent = dossier.title;
      if (modalBody) modalBody.innerHTML = dossier.html;
      if (dossierModal) {
        dossierModal.classList.add('open');
        dossierModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (modalClose && dossierModal) {
    modalClose.addEventListener('click', () => {
      dossierModal.classList.remove('open');
      dossierModal.setAttribute('aria-hidden', 'true');
    });

    dossierModal.addEventListener('click', (e) => {
      if (e.target === dossierModal) {
        dossierModal.classList.remove('open');
        dossierModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // 13. Mini-Game: O Enigma do Charada
  const riddleInput = document.getElementById('riddle-input');
  const riddleSubmitBtn = document.getElementById('riddle-submit-btn');
  const riddleFeedback = document.getElementById('riddle-feedback');

  const checkRiddle = () => {
    if (!riddleInput || !riddleFeedback) return;
    const answer = riddleInput.value.trim().toLowerCase();

    // Aceita variações como promessa, uma promessa, juramento
    if (answer.includes('promessa') || answer.includes('juramento')) {
      AudioEngine.playRiddlerCode();
      riddleFeedback.className = 'riddle-feedback success';
      riddleFeedback.innerHTML = '🎯 CORRETO! "Uma promessa". Você provou ter a mente afiada do Cavaleiro das Trevas!';
    } else if (answer === '') {
      riddleFeedback.className = 'riddle-feedback error';
      riddleFeedback.textContent = 'O Charada não tolera o silêncio! Digite seu palpite.';
    } else {
      AudioEngine.playBatBeep(240, 0.2);
      riddleFeedback.className = 'riddle-feedback error';
      riddleFeedback.innerHTML = `❌ ERRADO! "${answer}" não é a resposta. Tente novamente, detetive!`;
    }
  };

  if (riddleSubmitBtn) {
    riddleSubmitBtn.addEventListener('click', checkRiddle);
  }
  if (riddleInput) {
    riddleInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkRiddle();
    });
  }

  // 14. Menu Mobile
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
});
