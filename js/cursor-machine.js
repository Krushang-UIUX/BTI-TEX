document.addEventListener('DOMContentLoaded', () => {
    // Create cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor-machine';
    
    // Use user-provided icon
    cursor.innerHTML = '<img src="images/icon.png" alt="cursor icon">';
    
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth transition for the machine icon
    const animateCursor = () => {
        // Linear interpolation for smooth movement
        const lerp = (start, end, amount) => (1 - amount) * start + amount * end;
        
        cursorX = lerp(cursorX, mouseX, 0.15);
        cursorY = lerp(cursorY, mouseY, 0.15);
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Add a slight rotation to the cog when moving
        const rotation = (cursorX + cursorY) % 360;
        const cog = cursor.querySelector('i');
        if (cog) {
            cog.style.transform = `rotate(${rotation}deg)`;
        }
        
        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();

    // Hover effects for links and buttons
    const handleHover = () => {
        cursor.classList.add('cursor-active');
        cursorDot.classList.add('dot-active');
    };
    
    const handleUnhover = () => {
        cursor.classList.remove('cursor-active');
        cursorDot.classList.remove('dot-active');
    };

    const interactiveElements = document.querySelectorAll('a, button, .filter-btn-modern, .dropdown-item-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleHover);
        el.addEventListener('mouseleave', handleUnhover);
    });
});
