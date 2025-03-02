document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the corresponding tab content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Basic version functionality
    const basicFiles = [];
    const basicFileList = document.getElementById('basic-file-list');
    const basicFilenameInput = document.getElementById('basic-filename');
    const basicAddBtn = document.getElementById('basic-add-btn');
    const basicProcessBtn = document.getElementById('basic-process-btn');
    const basicResultList = document.getElementById('basic-result-list');
    
    // Add file to basic version
    basicAddBtn.addEventListener('click', () => {
        const filename = basicFilenameInput.value.trim();
        
        if (filename && (filename.endsWith('.txt') || filename.endsWith('.csv'))) {
            basicFiles.push(filename);
            updateBasicFileList();
            basicFilenameInput.value = '';
        } else {
            alert('Please enter a valid filename with .txt or .csv extension');
        }
    });
    
    // Update basic file list display
    function updateBasicFileList() {
        if (basicFiles.length === 0) {
            basicFileList.innerHTML = '<p class="empty-message">No files added yet</p>';
            return;
        }
        
        basicFileList.innerHTML = '';
        basicFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${file}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            basicFileList.appendChild(fileItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('#basic-file-list .remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                basicFiles.splice(index, 1);
                updateBasicFileList();
            });
        });
    }
    
    // Process files in basic version
    basicProcessBtn.addEventListener('click', () => {
        if (basicFiles.length === 0) {
            alert('Please add files to process');
            return;
        }
        
        basicResultList.innerHTML = '';
        basicFiles.forEach(file => {
            const timestamp = generateTimestamp();
            const newName = `${timestamp}_${file}`;
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div>
                    <strong>Original:</strong> ${file}<br>
                    <strong>Renamed:</strong> ${newName}
                </div>
            `;
            basicResultList.appendChild(resultItem);
        });
    });
    
    // Advanced version functionality
    const advancedFiles = [];
    const advancedFileList = document.getElementById('advanced-file-list');
    const directoryNameInput = document.getElementById('directory-name');
    const advancedFilenameInput = document.getElementById('advanced-filename');
    const advancedAddBtn = document.getElementById('advanced-add-btn');
    const advancedProcessBtn = document.getElementById('advanced-process-btn');
    const advancedResultList = document.getElementById('advanced-result-list');
    
    // Add file to advanced version
    advancedAddBtn.addEventListener('click', () => {
        const dirname = directoryNameInput.value.trim() || 'default';
        const filename = advancedFilenameInput.value.trim();
        
        if (filename && (filename.endsWith('.txt') || filename.endsWith('.csv'))) {
            advancedFiles.push({
                directory: dirname,
                filename: filename
            });
            updateAdvancedFileList();
            advancedFilenameInput.value = '';
        } else {
            alert('Please enter a valid filename with .txt or .csv extension');
        }
    });
    
    // Update advanced file list display
    function updateAdvancedFileList() {
        if (advancedFiles.length === 0) {
            advancedFileList.innerHTML = '<p class="empty-message">No files added yet</p>';
            return;
        }
        
        advancedFileList.innerHTML = '';
        advancedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${file.directory}/${file.filename}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            advancedFileList.appendChild(fileItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('#advanced-file-list .remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                advancedFiles.splice(index, 1);
                updateAdvancedFileList();
            });
        });
    }
    
    // Process files in advanced version
    advancedProcessBtn.addEventListener('click', () => {
        if (advancedFiles.length === 0) {
            alert('Please add files to process');
            return;
        }
        
        advancedResultList.innerHTML = '';
        advancedFiles.forEach(file => {
            const timestamp = generateTimestamp();
            const newName = `${timestamp}_${file.directory}_${file.filename}`;
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div>
                    <strong>Original:</strong> ${file.directory}/${file.filename}<br>
                    <strong>Renamed:</strong> ${newName}
                </div>
            `;
            advancedResultList.appendChild(resultItem);
        });
    });
    
    // Validation functionality
    const validationInput = document.getElementById('validation-input');
    const validateBtn = document.getElementById('validate-btn');
    const validationResult = document.getElementById('validation-result');
    
    validateBtn.addEventListener('click', () => {
        const filename = validationInput.value.trim();
        
        if (!filename) {
            validationResult.innerHTML = '<p>Please enter a filename to validate</p>';
            validationResult.className = 'validation-result';
            return;
        }
        
        const isValid = validateFilename(filename);
        
        if (isValid) {
            validationResult.innerHTML = `<p><strong>${filename}</strong> follows the naming convention</p>`;
            validationResult.className = 'validation-result valid-result';
        } else {
            validationResult.innerHTML = `
                <p><strong>${filename}</strong> does not follow the naming convention</p>
                <p>Expected format: YYYYMMDDHHMMSS_filename.ext or YYYYMMDDHHMMSS_directory_filename.ext</p>
            `;
            validationResult.className = 'validation-result invalid-result';
        }
    });
    
    // Helper functions
    function generateTimestamp() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    
    function validateFilename(filename) {
        // Basic validation pattern: timestamp_something.ext
        const basicPattern = /^\d{14}_[^_]+\.(txt|csv)$/;
        
        // Advanced validation pattern: timestamp_directory_something.ext
        const advancedPattern = /^\d{14}_[^_]+_[^_]+\.(txt|csv)$/;
        
        return basicPattern.test(filename) || advancedPattern.test(filename);
    }
});