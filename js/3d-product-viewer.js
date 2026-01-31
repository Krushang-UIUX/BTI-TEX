/**
 * 3D Product Viewer - Enhanced Premium CSS 3D Effect
 * Creates immersive 3D rotation with depth layers and lighting effects
 */

class Product3DViewer {
    constructor(container) {
        this.container = container;
        this.imageWrapper = container.querySelector('.image-3d-wrapper');
        this.image = container.querySelector('.product-3d-img');
        
        if (!this.imageWrapper || !this.image) {
            console.warn('3D Viewer: Missing required elements');
            return;
        }
        
        this.rotateX = 0;
        this.rotateY = 0;
        this.targetRotateX = 0;
        this.targetRotateY = 0;
        this.scale = 1;
        this.targetScale = 1;
        
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.autoRotate = true;
        this.autoRotateSpeed = 0.15;
        this.oscillationPhase = Math.random() * Math.PI * 2; // Random start phase
        
        this.isAnimating = true;
        
        // Create 3D depth layers
        this.createDepthLayers();
        this.init();
    }
    
    createDepthLayers() {
        // Create shadow layer
        const shadowLayer = document.createElement('div');
        shadowLayer.className = 'depth-shadow-layer';
        shadowLayer.style.cssText = `
            position: absolute;
            bottom: -15%;
            left: 50%;
            transform: translateX(-50%) rotateX(90deg);
            width: 80%;
            height: 60%;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, transparent 70%);
            filter: blur(20px);
            pointer-events: none;
            z-index: -1;
            transition: all 0.4s ease;
        `;
        this.imageWrapper.appendChild(shadowLayer);
        this.shadowLayer = shadowLayer;
        
        // Create highlight reflection
        const reflectionLayer = document.createElement('div');
        reflectionLayer.className = 'depth-reflection-layer';
        reflectionLayer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.1) 100%);
            pointer-events: none;
            mix-blend-mode: overlay;
            opacity: 0;
            transition: opacity 0.4s ease;
            border-radius: 10px;
        `;
        this.imageWrapper.appendChild(reflectionLayer);
        this.reflectionLayer = reflectionLayer;
        
        // Create glow effect
        const glowLayer = document.createElement('div');
        glowLayer.className = 'glow-layer';
        glowLayer.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120%;
            height: 120%;
            background: radial-gradient(ellipse at center, rgba(48, 144, 199, 0.15) 0%, transparent 60%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.5s ease;
            z-index: -2;
        `;
        this.imageWrapper.appendChild(glowLayer);
        this.glowLayer = glowLayer;
    }
    
    init() {
        this.bindEvents();
        this.bindControlButtons();
        this.startAnimation();
    }
    
    bindControlButtons() {
        // Control buttons - find them fresh and bind events
        const btnRotateLeft = this.container.querySelector('.btn-rotate-left');
        const btnRotateRight = this.container.querySelector('.btn-rotate-right');
        const btnReset = this.container.querySelector('.btn-reset-view');
        
        if (btnRotateLeft) {
            // Remove any existing listeners by cloning
            const newBtnLeft = btnRotateLeft.cloneNode(true);
            btnRotateLeft.parentNode.replaceChild(newBtnLeft, btnRotateLeft);
            
            newBtnLeft.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.rotateLeft();
            });
        }
        
        if (btnRotateRight) {
            const newBtnRight = btnRotateRight.cloneNode(true);
            btnRotateRight.parentNode.replaceChild(newBtnRight, btnRotateRight);
            
            newBtnRight.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.rotateRight();
            });
        }
        
        if (btnReset) {
            const newBtnReset = btnReset.cloneNode(true);
            btnReset.parentNode.replaceChild(newBtnReset, btnReset);
            
            newBtnReset.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.resetView();
            });
        }
    }
    
    bindEvents() {
        // Mouse events for dragging
        this.container.addEventListener('mousedown', (e) => {
            // Don't start drag on button clicks
            if (e.target.closest('.view-controls')) return;
            this.onDragStart(e);
        });
        document.addEventListener('mousemove', (e) => this.onDragMove(e));
        document.addEventListener('mouseup', () => this.onDragEnd());
        
        // Touch events
        this.container.addEventListener('touchstart', (e) => {
            if (e.target.closest('.view-controls')) return;
            this.onDragStart(e);
        }, { passive: true });
        document.addEventListener('touchmove', (e) => this.onDragMove(e), { passive: true });
        document.addEventListener('touchend', () => this.onDragEnd());
        
        // Mouse move for tilt effect (when not dragging)
        this.container.addEventListener('mousemove', (e) => {
            if (e.target.closest('.view-controls')) return;
            this.onMouseMove(e);
        });
        
        // Mouse enter/leave for effects
        this.container.addEventListener('mouseenter', () => {
            this.autoRotate = false;
            this.targetScale = 1.05;
            if (this.reflectionLayer) this.reflectionLayer.style.opacity = '1';
            if (this.glowLayer) this.glowLayer.style.opacity = '1';
        });
        
        this.container.addEventListener('mouseleave', () => {
            if (!this.isDragging) {
                this.autoRotate = true;
                this.targetScale = 1;
                this.targetRotateX = 0;
                this.targetRotateY = 0;
            }
            if (this.reflectionLayer) this.reflectionLayer.style.opacity = '0';
            if (this.glowLayer) this.glowLayer.style.opacity = '0';
        });
    }
    
    onMouseMove(e) {
        if (this.isDragging) return;
        
        const rect = this.container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate tilt based on mouse position relative to center
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        // Subtle tilt effect (max 15 degrees)
        this.targetRotateY = deltaX * 15;
        this.targetRotateX = -deltaY * 10;
        
        // Move reflection based on mouse
        if (this.reflectionLayer) {
            this.reflectionLayer.style.background = `
                radial-gradient(circle at ${50 + deltaX * 30}% ${50 + deltaY * 30}%, 
                    rgba(255,255,255,0.4) 0%, 
                    transparent 50%
                )
            `;
        }
    }
    
    onDragStart(e) {
        this.isDragging = true;
        this.autoRotate = false;
        this.container.classList.add('dragging');
        
        const point = e.touches ? e.touches[0] : e;
        this.startX = point.clientX;
        this.startY = point.clientY;
        this.startRotateY = this.targetRotateY;
        this.startRotateX = this.targetRotateX;
    }
    
    onDragMove(e) {
        if (!this.isDragging) return;
        
        const point = e.touches ? e.touches[0] : e;
        const deltaX = point.clientX - this.startX;
        const deltaY = point.clientY - this.startY;
        
        this.targetRotateY = this.startRotateY + deltaX * 0.5;
        this.targetRotateX = Math.max(-40, Math.min(40, this.startRotateX - deltaY * 0.3));
    }
    
    onDragEnd() {
        this.isDragging = false;
        this.container.classList.remove('dragging');
        setTimeout(() => {
            if (!this.isDragging) {
                this.autoRotate = true;
                this.targetRotateX = 0;
                this.targetScale = 1;
            }
        }, 2000);
    }
    
    rotateLeft() {
        this.autoRotate = false;
        this.targetRotateY -= 45;
        
        // Visual feedback
        if (this.glowLayer) {
            this.glowLayer.style.opacity = '1';
            setTimeout(() => {
                if (!this.container.matches(':hover')) {
                    this.glowLayer.style.opacity = '0';
                }
            }, 300);
        }
        
        setTimeout(() => {
            this.autoRotate = true;
        }, 3000);
    }
    
    rotateRight() {
        this.autoRotate = false;
        this.targetRotateY += 45;
        
        // Visual feedback
        if (this.glowLayer) {
            this.glowLayer.style.opacity = '1';
            setTimeout(() => {
                if (!this.container.matches(':hover')) {
                    this.glowLayer.style.opacity = '0';
                }
            }, 300);
        }
        
        setTimeout(() => {
            this.autoRotate = true;
        }, 3000);
    }
    
    resetView() {
        this.targetRotateX = 0;
        this.targetRotateY = 0;
        this.targetScale = 1;
        this.autoRotate = true;
        
        // Visual feedback - quick flash
        if (this.reflectionLayer) {
            this.reflectionLayer.style.opacity = '1';
            setTimeout(() => {
                if (!this.container.matches(':hover')) {
                    this.reflectionLayer.style.opacity = '0';
                }
            }, 300);
        }
    }
    
    startAnimation() {
        const animate = () => {
            if (!this.isAnimating) return;
            
            this.oscillationPhase += 0.02;
            
            // Gentle auto oscillation when auto-rotating
            if (this.autoRotate && !this.isDragging) {
                // Subtle bobbing motion
                const bobY = Math.sin(this.oscillationPhase) * 3;
                const bobX = Math.sin(this.oscillationPhase * 0.7) * 2;
                this.targetRotateY = bobY;
                this.targetRotateX = bobX;
            }
            
            // Smooth interpolation
            const lerp = 0.08;
            this.rotateX += (this.targetRotateX - this.rotateX) * lerp;
            this.rotateY += (this.targetRotateY - this.rotateY) * lerp;
            this.scale += (this.targetScale - this.scale) * lerp;
            
            // Apply 3D transform
            if (this.imageWrapper) {
                const translateZ = 30 + (this.scale - 1) * 50;
                this.imageWrapper.style.transform = `
                    perspective(1200px)
                    rotateX(${this.rotateX}deg)
                    rotateY(${this.rotateY}deg)
                    translateZ(${translateZ}px)
                    scale(${this.scale})
                `;
            }
            
            // Update shadow based on rotation
            if (this.shadowLayer) {
                const shadowOffsetX = this.rotateY * 0.5;
                const shadowScale = 0.7 + Math.abs(this.rotateX) * 0.01;
                const shadowOpacity = 0.3 - Math.abs(this.rotateX) * 0.005;
                
                this.shadowLayer.style.transform = `
                    translateX(calc(-50% + ${shadowOffsetX}px))
                    rotateX(90deg)
                    scaleX(${shadowScale})
                `;
                this.shadowLayer.style.opacity = Math.max(0.1, shadowOpacity);
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    destroy() {
        this.isAnimating = false;
    }
}

// Store all viewer instances
window.product3DViewers = [];

// Initialize all 3D viewers after dynamic content is loaded
function initializeAll3DViewers() {
    // Disable 3D effects on small screens (mobile/tablet)
    const isSmallScreen = window.innerWidth < 992;
    
    if (isSmallScreen) {
        console.log('3D Viewers disabled on small screen');
        // Hide view controls on small screens
        document.querySelectorAll('.view-controls').forEach(ctrl => {
            ctrl.style.display = 'none';
        });
        return;
    }
    
    // Clean up existing viewers
    window.product3DViewers.forEach(viewer => {
        if (viewer.destroy) viewer.destroy();
    });
    window.product3DViewers = [];
    
    const viewers = document.querySelectorAll('.card-3d-visual');
    viewers.forEach(viewer => {
        // Prevent re-initialization
        if (!viewer.dataset.initialized) {
            const instance = new Product3DViewer(viewer);
            window.product3DViewers.push(instance);
            viewer.dataset.initialized = 'true';
        }
    });
    
    console.log(`3D Viewers initialized: ${window.product3DViewers.length}`);
}

// Initialize on DOMContentLoaded (fallback)
document.addEventListener('DOMContentLoaded', () => {
    // Wait for dynamic content to load
    setTimeout(initializeAll3DViewers, 800);
});

// Expose for manual reinitialization
window.reinitialize3DViewers = initializeAll3DViewers;

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Product3DViewer;
}
