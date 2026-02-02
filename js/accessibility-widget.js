/**
 * BTI TEX Accessibility Widget
 * Adds font resizing, high contrast mode, and screen reader features.
 */

(function() {
    // 1. Create and Inject CSS
    const css = `
        :root {
            --acc-btn-size: 44px;
            --acc-primary: #3090c7;
            --acc-bg: #ffffff;
            --acc-text: #0f172a;
        }

        @media (max-width: 768px) {
            :root {
                --acc-btn-size: 34px;
            }
            .bti-acc-btn {
                font-size: 13px;
            }
            #bti-accessibility-widget {
                bottom: 10px;
                right: 10px;
                padding: 6px;
                gap: 6px;
            }
        }

        #bti-accessibility-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            font-family: 'Arial', sans-serif;
            background: rgba(255,255,255,0.9);
            padding: 10px;
            border-radius: 50px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: transform 0.3s ease;
        }

        #bti-accessibility-widget:hover {
            transform: scale(1.02);
            background: rgba(255,255,255,1);
        }

        .bti-acc-btn {
            width: var(--acc-btn-size);
            height: var(--acc-btn-size);
            border-radius: 50%;
            background: var(--acc-bg);
            border: 2px solid var(--acc-primary);
            color: var(--acc-text);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            transition: all 0.2s ease;
            position: relative;
            outline: none;
        }

        .bti-acc-btn:hover, .bti-acc-btn:focus, .bti-acc-btn.active {
            background: var(--acc-primary);
            color: #ffffff;
            transform: scale(1.1);
            box-shadow: 0 2px 8px rgba(48, 144, 199, 0.4);
        }
        
        .bti-acc-btn:focus {
            box-shadow: 0 0 0 3px rgba(48, 144, 199, 0.5);
        }



        /* Tooltip */
        .bti-acc-btn::after {
            content: attr(aria-label);
            position: absolute;
            right: 125%;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.85);
            color: #fff;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
            visibility: hidden;
        }
        .bti-acc-btn:hover::after, .bti-acc-btn:focus::after {
            opacity: 1;
            visibility: visible;
        }
        
        /* Skip to Content Link */
        .skip-link {
            position: fixed;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--acc-primary);
            color: white;
            padding: 10px 20px;
            z-index: 10001;
            transition: top 0.3s;
            border-radius: 0 0 5px 5px;
            font-weight: bold;
            text-decoration: none;
        }
        .skip-link:focus {
            top: 0;
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

    // 2. Inject Skip Link if not present
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.innerText = 'Skip to Main Content';
        document.body.prepend(skipLink);
        
        // Ensure main content has ID
        const main = document.querySelector('main') || document.querySelector('section') || document.querySelector('.container');
        if (main && !main.id) main.id = 'main-content';
    }

    // 3. Create Widget HTML
    const widget = document.createElement('div');
    widget.id = 'bti-accessibility-widget';
    widget.setAttribute('role', 'region');
    widget.setAttribute('aria-label', 'Accessibility Controls');
    widget.innerHTML = `
        <button class="bti-acc-btn" id="acc-increase" aria-label="Increase Font Size (+)" title="Zoom In">
            A <i class="fas fa-plus"></i>
        </button>
        <button class="bti-acc-btn" id="acc-reset" aria-label="Reset Settings" title="Reset">
            A <i class="fas fa-undo"></i>
        </button>
        <button class="bti-acc-btn" id="acc-decrease" aria-label="Decrease Font Size (-)" title="Zoom Out">
            A <i class="fas fa-minus"></i>
        </button>
        <button class="bti-acc-btn" id="acc-speech" aria-label="Read Page Content" title="Voice Assistant">
            <i class="fas fa-volume-up"></i>
        </button>
    `;
    document.body.appendChild(widget);

    // 4. Functionality
    let currentZoom = 100;
    const MAX_ZOOM = 150;
    const MIN_ZOOM = 90;
    const STEP = 5;

    // Interactive Font Resizing
    function updateZoom() {
        document.body.style.fontSize = `${currentZoom}%`;
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
        

        
        stopSpeaking();
    };



    // Text to Speech (Voice Assistant)
    let isSpeaking = false;
    let synth = window.speechSynthesis;
    let utterance = null;

    function stopSpeaking() {
        if (synth.speaking) {
            synth.cancel();
        }
        isSpeaking = false;
        const btn = document.getElementById('acc-speech');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }

    document.getElementById('acc-speech').onclick = function() {
        if (isSpeaking) {
            stopSpeaking();
        } else {
            // Intelligent Content Selection
            let textToRead = "";
            
            // 1. Selection
            const selection = window.getSelection().toString();
            if (selection.trim().length > 0) {
                textToRead = "Read selection: " + selection;
            } else {
                // 2. Main Content
                const main = document.querySelector('main') || document.querySelector('article') || document.querySelector('#main-content') || document.body;
                textToRead = main.innerText;
            }

            if (textToRead) {
                utterance = new SpeechSynthesisUtterance(textToRead);
                utterance.rate = 1.0;
                utterance.pitch = 1.0;
                
                utterance.onend = () => {
                    stopSpeaking();
                };

                utterance.onerror = () => {
                    stopSpeaking();
                };

                synth.speak(utterance);
                isSpeaking = true;
                this.classList.add('active');
                this.innerHTML = '<i class="fas fa-stop"></i>'; // Change icon to stop
            }
        }
    };

})();
