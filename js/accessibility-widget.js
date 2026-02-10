/**
 * BTI TEX Accessibility Widget & Scroll Utilities
 * Adds font resizing, screen reader features, and Scroll to Top.
 */

(function() {
    // 1. Create and Inject CSS
    const css = `
        :root {
            --acc-btn-size: 40px;
            --acc-primary: #3090c7;
            --acc-bg: #ffffff;
            --acc-text: #0f172a;
            --acc-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }

        #bti-accessibility-widget {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 10000;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            font-family: 'Inter', 'Arial', sans-serif;
            background: rgba(255, 255, 255, 0.95);
            padding: 8px 12px;
            border-radius: 50px;
            box-shadow: var(--acc-shadow);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(48, 144, 199, 0.2);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        #bti-accessibility-widget:hover {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        }

        .bti-acc-btn {
            height: var(--acc-btn-size);
            padding: 0 15px;
            border-radius: 25px;
            background: transparent;
            border: 1px solid transparent;
            color: var(--acc-text);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-weight: 700;
            font-size: 14px;
            transition: all 0.2s ease;
            white-space: nowrap;
            outline: none;
            gap: 5px;
        }

        .bti-acc-btn i {
            font-size: 12px;
        }

        .bti-acc-btn:hover, .bti-acc-btn:focus {
            background: var(--acc-primary);
            color: #ffffff;
            border-color: var(--acc-primary);
        }

        .bti-acc-btn#acc-reset {
            background: rgba(48, 144, 199, 0.1);
            color: var(--acc-primary);
        }

        .bti-acc-btn#acc-reset:hover {
            background: var(--acc-primary);
            color: #ffffff;
        }

        /* Scroll Top Button Styles */
        #bti-scroll-top {
            position: fixed;
            bottom: 90px;
            right: 35px;
            width: 45px;
            height: 45px;
            background: var(--acc-primary);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10001;
            box-shadow: var(--acc-shadow);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            border: none;
            outline: none;
        }

        #bti-scroll-top.show {
            opacity: 1;
            visibility: visible;
            bottom: 100px;
        }

        #bti-scroll-top:hover {
            background: #0d4f7a;
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        @media (max-width: 768px) {
            #bti-accessibility-widget {
                bottom: 15px;
                right: 15px;
                padding: 5px 8px;
                gap: 4px;
                max-width: calc(100vw - 30px);
            }
            .bti-acc-btn {
                height: 36px;
                padding: 0 8px;
                font-size: 11px;
                border-radius: 18px;
            }
            .bti-acc-btn span {
                display: none; /* Hide text on mobile for compactness */
            }
            #bti-scroll-top {
                right: 20px;
                bottom: 65px;
                width: 40px;
                height: 40px;
            }
            #bti-scroll-top.show {
                bottom: 75px;
            }
        }

        @media (max-width: 480px) {
            #bti-accessibility-widget {
                right: 10px;
                bottom: 10px;
                padding: 4px 6px;
            }
            .bti-acc-btn {
                height: 32px;
                padding: 0 6px;
                font-size: 10px;
            }
            #bti-scroll-top {
                right: 15px;
                bottom: 55px;
                width: 36px;
                height: 36px;
            }
            #bti-scroll-top.show {
                bottom: 65px;
            }
        }

        /* Skip Link Improvements */
        .skip-link {
            position: fixed;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--acc-primary);
            color: white;
            padding: 12px 24px;
            z-index: 10001;
            transition: top 0.3s;
            border-radius: 0 0 12px 12px;
            font-weight: bold;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .skip-link:focus {
            top: 0;
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    // 2. Inject Skip Link
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.innerText = 'Skip to Main Content';
        document.body.prepend(skipLink);
        
        const main = document.querySelector('main') || document.querySelector('section') || document.querySelector('.container');
        if (main && !main.id) main.id = 'main-content';
    }

    // 3. Create Widget HTML
    const widget = document.createElement('div');
    widget.id = 'bti-accessibility-widget';
    widget.setAttribute('role', 'region');
    widget.setAttribute('aria-label', 'Accessibility Controls');
    widget.innerHTML = `
        <button class="bti-acc-btn" id="acc-increase" title="Increase Font Size">
            <span>A</span> <i class="fas fa-plus"></i>
        </button>
        <button class="bti-acc-btn" id="acc-reset" title="Reset Font Size">
            <span>A</span> <i class="fas fa-undo"></i>
        </button>
        <button class="bti-acc-btn" id="acc-decrease" title="Decrease Font Size">
            <span>A</span> <i class="fas fa-minus"></i>
        </button>
        <button class="bti-acc-btn" id="acc-speech" title="Read Page">
            <span>A</span> <i class="fas fa-volume-up"></i>
        </button>
    `;
    document.body.appendChild(widget);

    // 4. Create Scroll Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'bti-scroll-top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to Top');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    // 5. Functionality
    let currentZoom = 100;
    const MAX_ZOOM = 130;
    const MIN_ZOOM = 85;
    const STEP = 5;

    function updateZoom() {
        document.documentElement.style.fontSize = `${currentZoom}%`;
        localStorage.setItem('bti-font-zoom', currentZoom);
    }

    const savedZoom = localStorage.getItem('bti-font-zoom');
    if (savedZoom) {
        currentZoom = parseInt(savedZoom);
        updateZoom();
    }

    document.getElementById('acc-increase').onclick = () => {
        if (currentZoom < MAX_ZOOM) {
            currentZoom += STEP;
            updateZoom();
        }
    };

    document.getElementById('acc-decrease').onclick = () => {
        if (currentZoom > MIN_ZOOM) {
            currentZoom -= STEP;
            updateZoom();
        }
    };

    document.getElementById('acc-reset').onclick = () => {
        currentZoom = 100;
        updateZoom();
        if (isSpeaking) stopSpeaking();
    };

    // Scroll to Top Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Text to Speech
    let isSpeaking = false;
    const synth = window.speechSynthesis;
    let utterance = null;

    function stopSpeaking() {
        if (synth.speaking) synth.cancel();
        isSpeaking = false;
        const btn = document.getElementById('acc-speech');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }

    document.getElementById('acc-speech').onclick = function() {
        if (isSpeaking) {
            stopSpeaking();
        } else {
            let textToRead = "";
            const selection = window.getSelection().toString();
            if (selection.trim().length > 0) {
                textToRead = selection;
            } else {
                const main = document.querySelector('main') || document.querySelector('#main-content') || document.body;
                textToRead = main.innerText;
            }

            if (textToRead) {
                utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.onend = stopSpeaking;
                utterance.onerror = stopSpeaking;
                synth.speak(utterance);
                isSpeaking = true;
                this.classList.add('active');
                this.innerHTML = '<i class="fas fa-stop"></i>';
            }
        }
    };
})();
