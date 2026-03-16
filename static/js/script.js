document.addEventListener('DOMContentLoaded', () => {
    // Range Sliders
    const ranges = ['uppercase', 'lowercase', 'numbers', 'symbols'];
    
    ranges.forEach(id => {
        const input = document.getElementById(id);
        const display = document.getElementById(id.substring(0, 3) + '-val');
        
        input.addEventListener('input', (e) => {
            display.textContent = e.target.value;
            updateTrackColor(input);
        });
        
        // Initial setup
        updateTrackColor(input);
    });
    
    function updateTrackColor(input) {
        const min = input.min || 0;
        const max = input.max || 100;
        const val = input.value;
        const percentage = ((val - min) / (max - min)) * 100;
        
        // This creates a filled look for the slider track
        input.style.background = `linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%, rgba(255, 255, 255, 0.1) 100%)`;
    }

    // Form submission
    const form = document.getElementById('generator-form');
    const passwordOutput = document.getElementById('password-output');
    const saveSection = document.getElementById('save-section');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        const btn = form.querySelector('.generate-btn');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Generating...';
        btn.disabled = true;
        
        const data = {
            uppercase: document.getElementById('uppercase').value,
            lowercase: document.getElementById('lowercase').value,
            numbers: document.getElementById('numbers').value,
            symbols: document.getElementById('symbols').value,
            mode: document.querySelector('input[name="mode"]:checked').value
        };
        
        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                passwordOutput.value = result.password;
                
                // Show pop animation
                passwordOutput.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    passwordOutput.style.transform = 'scale(1)';
                }, 200);
                
                // Show save section
                saveSection.classList.remove('hidden');
                document.getElementById('save-message').textContent = '';
                document.getElementById('statement-input').value = '';
            } else {
                alert('Error generating password: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while connecting to the server.');
        } finally {
            // Restore button state
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
    });
    
    // Copy functionality
    const copyBtn = document.getElementById('copy-btn');
    
    copyBtn.addEventListener('click', () => {
        if (!passwordOutput.value) return;
        
        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            const icon = copyBtn.querySelector('i');
            icon.className = 'fa-solid fa-check';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                icon.className = 'fa-regular fa-copy';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });
    
    // Save functionality
    const saveBtn = document.getElementById('save-btn');
    const statementInput = document.getElementById('statement-input');
    const saveMessage = document.getElementById('save-message');
    
    saveBtn.addEventListener('click', async () => {
        const statement = statementInput.value.trim();
        const password = passwordOutput.value;
        
        if (!statement) {
            saveMessage.textContent = 'Please enter a statement.';
            saveMessage.className = 'message error';
            return;
        }
        
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';
        
        try {
            const response = await fetch('/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    statement: statement
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                saveMessage.textContent = 'Successfully saved to Excel!';
                saveMessage.className = 'message success';
                setTimeout(() => {
                    saveSection.classList.add('hidden');
                }, 3000);
            } else {
                saveMessage.textContent = 'Error: ' + result.error;
                saveMessage.className = 'message error';
            }
        } catch (error) {
            console.error('Error:', error);
            saveMessage.textContent = 'Network error occurred.';
            saveMessage.className = 'message error';
        } finally {
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save';
        }
    });
});
