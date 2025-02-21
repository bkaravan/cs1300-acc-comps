document.addEventListener('DOMContentLoaded', function() {
    // Initialize all flipper containers
    const flipContainers = document.querySelectorAll('.flip-container');
    
    flipContainers.forEach(container => {
        const flipper = container.querySelector('.flipper');
        const front = container.querySelector('.front');
        const back = container.querySelector('.back');
        const flipButtons = container.querySelectorAll('.flip-btn');
        
        // Adjust height of the container and flipper based on content
        function adjustHeight() {
            // Calculate maximum height between front and back
            const frontHeight = front.offsetHeight;
            const backHeight = back.offsetHeight;
            const maxHeight = Math.max(frontHeight, backHeight);
            
            // Set the heights
            container.style.height = maxHeight + 'px';
            flipper.style.height = maxHeight + 'px';
        }
        
        // Toggle flip state
        function toggleFlip() {
            flipper.classList.toggle('flipped');
            
            // Set focus to the appropriate side after flipping
            if (flipper.classList.contains('flipped')) {
                const backButton = back.querySelector('.flip-btn');
                if (backButton) {
                    setTimeout(() => backButton.focus(), 600); // After animation completes
                }
            } else {
                const frontButton = front.querySelector('.flip-btn');
                if (frontButton) {
                    setTimeout(() => frontButton.focus(), 600); // After animation completes
                }
            }
        }
        
        // Add click event to all flip buttons in this container
        flipButtons.forEach(button => {
            button.addEventListener('click', toggleFlip);
        });
        
        // Adjust heights initially
        adjustHeight();
        
        // Adjust heights when window resizes
        window.addEventListener('resize', adjustHeight);
        
        // For accessibility, add keyboard support
        container.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Only toggle if the event target is the container itself
                // (to avoid conflict with the button's own Enter/Space handling)
                if (e.target === container) {
                    toggleFlip();
                    e.preventDefault();
                }
            }
        });
    });
    
    // Ensure all flippers reset to front side when page loads
    document.querySelectorAll('.flipper').forEach(flipper => {
        flipper.classList.remove('flipped');
    });
    
    // Initialize focus trap for keyboard navigation
    document.querySelectorAll('.flip-container').forEach(container => {
        // Make the container focusable
        if (!container.hasAttribute('tabindex')) {
            container.setAttribute('tabindex', '0');
        }
        
        // Announce state change for screen readers
        container.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target === container) {
                    const flipper = container.querySelector('.flipper');
                    const isFlipped = flipper.classList.contains('flipped');
                    
                    // Create and trigger an announcement
                    const announcement = document.createElement('div');
                    announcement.setAttribute('aria-live', 'polite');
                    announcement.className = 'sr-only';
                    announcement.textContent = isFlipped ? 'Showing text content' : 'Showing data table';
                    document.body.appendChild(announcement);
                    
                    // Remove after announcement
                    setTimeout(() => {
                        document.body.removeChild(announcement);
                    }, 1000);
                }
            }
        });
    });
    
    // Add a helper class for screen reader only content
    const style = document.createElement('style');
    style.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    `;
    document.head.appendChild(style);
});

function expandImage(img) {
    // Get the modal
    var modal = document.getElementById("imageModal");
    
    // Get the expanded image
    var expandedImg = document.getElementById("expandedImage");
    
    // Show the modal
    modal.style.display = "block";
    
    // Set the source of the expanded image
    expandedImg.src = img.src;
  }
  
  function closeModal() {
    // Hide the modal
    document.getElementById("imageModal").style.display = "none";
  }
  
  // Close modal when clicking outside the image
  window.onclick = function(event) {
    var modal = document.getElementById("imageModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }