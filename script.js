console.log('Akwadra Super Builder Initialized');

document.addEventListener('DOMContentLoaded', () => {
    // Preserve existing feature functionality
    const card = document.querySelector('.card');
    if (card) {
        card.addEventListener('click', () => {
            console.log('تم النقر على البطاقة!');
            // Smooth scroll to challenges instead of alert for better UX
            document.getElementById('challenges').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- New Functionality: Voting System ---
    const voteButtons = document.querySelectorAll('.vote-btn');
    
    voteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const countSpan = this.querySelector('.vote-count');
            const heartIcon = this.querySelector('i');
            const playerId = this.getAttribute('data-id');
            
            // Extract current count as number (remove commas if any)
            let currentCount = parseInt(countSpan.textContent.replace(/,/g, ''));
            
            if (this.classList.contains('voted')) {
                // Remove vote
                currentCount--;
                this.classList.remove('voted', 'bg-indigo-100', 'text-indigo-700', 'bg-pink-100', 'text-pink-700', 'bg-emerald-100', 'text-emerald-700', 'bg-teal-100', 'text-teal-700');
                // Reset basic styles handled by CSS hover, specific color removal is simplified here
                heartIcon.classList.remove('fas', 'text-red-500');
                heartIcon.classList.add('far');
            } else {
                // Add vote
                currentCount++;
                this.classList.add('voted');
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas', 'text-red-500', 'animate-pulse');
                
                // Add color based on context (simple logic)
                if (playerId === 'p1') this.classList.add('bg-indigo-100', 'text-indigo-700');
                if (playerId === 'p2') this.classList.add('bg-pink-100', 'text-pink-700');
                if (playerId === 'p3') this.classList.add('bg-emerald-100', 'text-emerald-700');
                if (playerId === 'p4') this.classList.add('bg-teal-100', 'text-teal-700');
            }
            
            countSpan.textContent = currentCount.toLocaleString();
            
            // Update Progress Bars dynamically
            updateProgressBars(playerId);
        });
    });

    function updateProgressBars(triggerId) {
        // Example logic for the first challenge (p1 vs p2)
        if (triggerId === 'p1' || triggerId === 'p2') {
            const btn1 = document.querySelector('button[data-id="p1"]');
            const btn2 = document.querySelector('button[data-id="p2"]');
            const count1 = parseInt(btn1.querySelector('.vote-count').textContent.replace(/,/g, ''));
            const count2 = parseInt(btn2.querySelector('.vote-count').textContent.replace(/,/g, ''));
            const total = count1 + count2;
            
            const p1Percent = (count1 / total) * 100;
            const p2Percent = (count2 / total) * 100;
            
            document.getElementById('bar-p1').style.width = `${p1Percent}%`;
            document.getElementById('bar-p2').style.width = `${p2Percent}%`;
        }

        // Example logic for the second challenge (p3 vs p4)
        if (triggerId === 'p3' || triggerId === 'p4') {
            const btn3 = document.querySelector('button[data-id="p3"]');
            const btn4 = document.querySelector('button[data-id="p4"]');
            const count3 = parseInt(btn3.querySelector('.vote-count').textContent.replace(/,/g, ''));
            const count4 = parseInt(btn4.querySelector('.vote-count').textContent.replace(/,/g, ''));
            const total = count3 + count4;
            
            const p3Percent = (count3 / total) * 100;
            const p4Percent = (count4 / total) * 100;
            
            document.getElementById('bar-p3').style.width = `${p3Percent}%`;
            document.getElementById('bar-p4').style.width = `${p4Percent}%`;
        }
    }

    // --- Upload Modal Logic ---
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadModal = document.getElementById('uploadModal');
    const closeModal = document.getElementById('closeModal');
    const modalContent = document.getElementById('modalContent');

    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            uploadModal.classList.remove('hidden');
            // Small delay to allow display:block to apply before adding opacity class
            setTimeout(() => {
                uploadModal.classList.add('modal-active');
                modalContent.classList.add('modal-animate-in');
            }, 10);
        });
    }

    function hideModal() {
        modalContent.classList.remove('modal-animate-in');
        setTimeout(() => {
            uploadModal.classList.remove('modal-active', 'hidden');
        }, 300);
    }

    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    // Close modal when clicking outside
    if (uploadModal) {
        uploadModal.addEventListener('click', (e) => {
            if (e.target === uploadModal) {
                hideModal();
            }
        });
    }

    // --- Challenge Button Logic ---
    const challengeBtns = document.querySelectorAll('.challenge-btn');
    challengeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Use Tailwind styling for a custom alert or just a standard alert for now
            alert('جاري إعداد ساحة التحدي... قريباً ستتمكن من رفع فيديو الرد مباشرة!');
        });
    });
});