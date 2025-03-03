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
    const basicFileUpload = document.getElementById('basic-file-upload');
    const basicUploadBtn = document.getElementById('basic-upload-btn');
    const basicProcessBtn = document.getElementById('basic-process-btn');
    const basicResultList = document.getElementById('basic-result-list');
    const basicTimestampOptions = document.getElementsByName('basic-timestamp-position');
    
    // File upload functionality for basic version
    basicUploadBtn.addEventListener('click', () => {
        if (basicFileUpload.files.length === 0) {
            alert('Please select files to upload');
            return;
        }
        
        // Process each selected file
        for (let i = 0; i < basicFileUpload.files.length; i++) {
            const file = basicFileUpload.files[i];
            
            // Check if the file has a valid extension
            if (!file.name.endsWith('.txt') && !file.name.endsWith('.csv')) {
                alert(`File ${file.name} is not supported. Only .txt and .csv files are allowed.`);
                continue;
            }
            
            // Add file to our array
            basicFiles.push({
                name: file.name,
                file: file
            });
        }
        
        // Update the file list display
        updateBasicFileList();
        
        // Clear the file input
        basicFileUpload.value = '';
    });
    
    // Update basic file list display
    function updateBasicFileList() {
        if (basicFiles.length === 0) {
            basicFileList.innerHTML = '<p class="empty-message">No files uploaded yet</p>';
            return;
        }
        
        basicFileList.innerHTML = '';
        basicFiles.forEach((fileInfo, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${fileInfo.name}</span>
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
            alert('Please upload files to process');
            return;
        }
        
        // Get selected timestamp position
        let timestampPosition = 'prefix';
        for (const option of basicTimestampOptions) {
            if (option.checked) {
                timestampPosition = option.value;
                break;
            }
        }
        
        basicResultList.innerHTML = '';
        basicFiles.forEach(fileInfo => {
            const timestamp = generateTimestamp();
            let newName = '';
            
            // Generate filename based on timestamp position
            if (timestampPosition === 'prefix') {
                newName = `${timestamp}_${fileInfo.name}`;
            } else {
                // Extract file extension
                const lastDotIndex = fileInfo.name.lastIndexOf('.');
                const nameWithoutExt = fileInfo.name.substring(0, lastDotIndex);
                const extension = fileInfo.name.substring(lastDotIndex);
                
                newName = `${nameWithoutExt}_${timestamp}${extension}`;
            }
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div>
                    <strong>Original:</strong> ${fileInfo.name}<br>
                    <strong>Renamed:</strong> ${newName}
                </div>
                <div>
                    <button class="download-btn" data-filename="${newName}" data-original="${fileInfo.name}" data-index="${basicFiles.indexOf(fileInfo)}">Download</button>
                </div>
            `;
            basicResultList.appendChild(resultItem);
        });
        
        // Add event listeners to download buttons
        document.querySelectorAll('#basic-result-list .download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                const newFilename = e.target.getAttribute('data-filename');
                downloadFile(basicFiles[index].file, newFilename);
            });
        });
    });
    
    // Advanced version functionality
    const advancedFiles = [];
    const advancedFileList = document.getElementById('advanced-file-list');
    const directoryNameInput = document.getElementById('directory-name');
    const advancedFileUpload = document.getElementById('advanced-file-upload');
    const advancedUploadBtn = document.getElementById('advanced-upload-btn');
    const advancedProcessBtn = document.getElementById('advanced-process-btn');
    const advancedResultList = document.getElementById('advanced-result-list');
    const advancedTimestampOptions = document.getElementsByName('advanced-timestamp-position');
    
    // File upload functionality for advanced version
    advancedUploadBtn.addEventListener('click', () => {
        if (advancedFileUpload.files.length === 0) {
            alert('Please select files to upload');
            return;
        }
        
        const directoryName = directoryNameInput.value.trim() || 'mydir';
        
        // Process each selected file
        for (let i = 0; i < advancedFileUpload.files.length; i++) {
            const file = advancedFileUpload.files[i];
            
            // Check if the file has a valid extension
            if (!file.name.endsWith('.txt') && !file.name.endsWith('.csv')) {
                alert(`File ${file.name} is not supported. Only .txt and .csv files are allowed.`);
                continue;
            }
            
            // Add file to our array
            advancedFiles.push({
                directory: directoryName,
                name: file.name,
                file: file
            });
        }
        
        // Update the file list display
        updateAdvancedFileList();
        
        // Clear the file input
        advancedFileUpload.value = '';
    });
    
    // Update advanced file list display
    function updateAdvancedFileList() {
        if (advancedFiles.length === 0) {
            advancedFileList.innerHTML = '<p class="empty-message">No files uploaded yet</p>';
            return;
        }
        
        advancedFileList.innerHTML = '';
        advancedFiles.forEach((fileInfo, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${fileInfo.directory}/${fileInfo.name}</span>
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
            alert('Please upload files to process');
            return;
        }
        
        // Get selected timestamp position
        let timestampPosition = 'prefix';
        for (const option of advancedTimestampOptions) {
            if (option.checked) {
                timestampPosition = option.value;
                break;
            }
        }
        
        advancedResultList.innerHTML = '';
        advancedFiles.forEach(fileInfo => {
            const timestamp = generateTimestamp();
            let newName = '';
            
            // Generate filename based on timestamp position
            if (timestampPosition === 'prefix') {
                newName = `${timestamp}_${fileInfo.directory}_${fileInfo.name}`;
            } else {
                // Extract file extension
                const lastDotIndex = fileInfo.name.lastIndexOf('.');
                const nameWithoutExt = fileInfo.name.substring(0, lastDotIndex);
                const extension = fileInfo.name.substring(lastDotIndex);
                
                newName = `${fileInfo.directory}_${nameWithoutExt}_${timestamp}${extension}`;
            }
            
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <div>
                    <strong>Original:</strong> ${fileInfo.directory}/${fileInfo.name}<br>
                    <strong>Renamed:</strong> ${newName}
                </div>
                <div>
                    <button class="download-btn" data-filename="${newName}" data-original="${fileInfo.name}" data-index="${advancedFiles.indexOf(fileInfo)}">Download</button>
                </div>
            `;
            advancedResultList.appendChild(resultItem);
        });
        
        // Add event listeners to download buttons
        document.querySelectorAll('#advanced-result-list .download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                const newFilename = e.target.getAttribute('data-filename');
                downloadFile(advancedFiles[index].file, newFilename);
            });
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
        
        // Check for both prefix and suffix formats
        const isValid = validateFilename(filename);
        
        if (isValid) {
            validationResult.innerHTML = `<p><strong>${filename}</strong> follows the naming convention</p>`;
            validationResult.className = 'validation-result valid-result';
        } else {
            validationResult.innerHTML = `
                <p><strong>${filename}</strong> does not follow the naming convention</p>
                <p>Expected formats:</p>
                <ul>
                    <li>Prefix format: YYYYMMDDHHMMSS_filename.ext</li>
                    <li>Prefix advanced format: YYYYMMDDHHMMSS_directory_filename.ext</li>
                    <li>Suffix format: filename_YYYYMMDDHHMMSS.ext</li>
                    <li>Suffix advanced format: directory_filename_YYYYMMDDHHMMSS.ext</li>
                </ul>
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
        // Basic validation pattern (prefix): timestamp_something.ext
        const basicPrefixPattern = /^\d{14}_[^_]+\.(txt|csv)$/;
        
        // Advanced validation pattern (prefix): timestamp_directory_something.ext
        const advancedPrefixPattern = /^\d{14}_[^_]+_[^_]+\.(txt|csv)$/;
        
        // Basic validation pattern (suffix): something_timestamp.ext
        const basicSuffixPattern = /^[^_]+_\d{14}\.(txt|csv)$/;
        
        // Advanced validation pattern (suffix): directory_something_timestamp.ext
        const advancedSuffixPattern = /^[^_]+_[^_]+_\d{14}\.(txt|csv)$/;
        
        return (
            basicPrefixPattern.test(filename) || 
            advancedPrefixPattern.test(filename) ||
            basicSuffixPattern.test(filename) ||
            advancedSuffixPattern.test(filename)
        );
    }
    
    function downloadFile(file, newFilename) {
        // Create a blob from the file
        const blob = new Blob([file], { type: file.type });
        
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = newFilename;
        
        // Add to document, click, and remove
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
});