class QAAssessment {
    constructor() {
        this.currentQuestion = 0;
        this.responses = {};
        this.totalQuestions = 32;
        this.questionPath = []; // Track the current question path
        this.hasQEPractice = null; // Track initial response
        
        this.questions = [
            // Initial Question
            {
                id: 'initial',
                section: 'Initial Question',
                title: 'Do you currently have a formal QA or QE practice in place?',
                type: 'radio',
                options: ['Yes', 'No'],
                help: 'Allow optional notes for hybrid or partial responses.'
            },
            
            // Questions for organizations WITHOUT QE practice (No path)
            {
                id: 'no_qa_1',
                section: 'Section N: Current Testing Approach',
                title: 'How is testing currently handled in your organization?',
                type: 'checkbox',
                options: ['Manual testing by developers', 'Manual testing by dedicated testers', 'Ad-hoc testing', 'User acceptance testing only', 'No formal testing', 'External testing services'],
                help: 'Select all approaches currently used',
                condition: 'no_qe_practice'
            },
            {
                id: 'no_qa_2',
                section: 'Section N: Current Testing Approach',
                title: 'What is your current software development process?',
                type: 'radio',
                options: ['Agile/Scrum', 'Waterfall', 'Ad-hoc/No formal process', 'DevOps', 'Other'],
                help: 'Describe your development methodology',
                condition: 'no_qe_practice'
            },
            {
                id: 'no_qa_3',
                section: 'Section N: Current Testing Approach',
                title: 'What quality issues are you currently experiencing?',
                type: 'checkbox',
                options: ['Bugs found in production', 'Long release cycles', 'Customer complaints', 'System downtime', 'Performance issues', 'Security vulnerabilities', 'Integration problems'],
                help: 'Select all issues you are experiencing',
                condition: 'no_qe_practice'
            },
            {
                id: 'no_qa_4',
                section: 'Section N: Current Testing Approach',
                title: 'How much time is spent on manual testing per release?',
                type: 'text',
                help: 'Estimate in hours or days (e.g., "2 days", "40 hours", "1 week")',
                condition: 'no_qe_practice'
            },
            {
                id: 'no_qa_5',
                section: 'Section N: Current Testing Approach',
                title: 'What is the main driver for considering a QE practice?',
                type: 'checkbox',
                options: ['Improve product quality', 'Reduce time to market', 'Lower operational costs', 'Meet compliance requirements', 'Customer demands', 'Competitive advantage', 'Scale development'],
                help: 'Select all drivers that apply',
                condition: 'no_qe_practice'
            },
            
            // Comprehensive QE Alignment Question (for organizations with QE practice)
            {
                id: 'qe_alignment',
                section: 'Section A: QE Practices & Maturity',
                title: 'Current QE Practices Overview',
                type: 'multi_input',
                fields: [
                    { id: 'unit_test_coverage', label: 'Unit Test Coverage:', placeholder: 'e.g., 70%, High, Medium, Low' },
                    { id: 'automation_coverage', label: 'Automation Coverage:', placeholder: 'e.g., 50%, Extensive, Some, Limited' },
                    { id: 'performance_testing', label: 'Performance Testing:', placeholder: 'e.g., Integrated in CI/CD, Regular, Limited, None' },
                    { id: 'defect_density', label: 'Defect Density:', placeholder: 'e.g., Tracked and analyzed, Monitored, Basic tracking, Not tracked' },
                    { id: 'sdet_training', label: 'SDET Training:', placeholder: 'e.g., 25% of team, Some team members, Limited, None' },
                    { id: 'people_documented_roles', label: 'People documented roles:', placeholder: 'e.g., Well-defined, Basic roles, Some documentation, Ad-hoc' },
                    { id: 'continuous_process_documented', label: 'Continuous Process documented:', placeholder: 'e.g., Comprehensive, Standard processes, Basic, Limited' },
                    { id: 'state_art_technology_used', label: 'State of art Technology used:', placeholder: 'e.g., Latest tools and frameworks, Modern tools, Standard tools, Legacy tools' }
                ],
                help: 'Provide details for each QE practice area. Fill in at least one field to continue.',
                condition: 'has_qe_practice'
            },
            
            // Section A: QE Practices & Maturity (for Yes path)
            {
                id: 'a1',
                section: 'Section A: QE Practices & Maturity',
                title: 'What is the size and structure of your QA/QE team?',
                type: 'textarea',
                help: 'Please describe team size, roles (QA Engineers, Test Automation Engineers, Performance Engineers, etc.), and reporting structure.',
                condition: 'has_qe_practice'
            },
            {
                id: 'a2',
                section: 'Section A: QE Practices & Maturity',
                title: 'What types of testing are performed?',
                type: 'checkbox',
                options: ['Unit Testing', 'API Testing', 'UI Testing', 'Performance Testing', 'Security Testing', 'Accessibility Testing', 'Integration Testing', 'End-to-End Testing'],
                help: 'Select all types of testing currently performed in your organization',
                condition: 'has_qe_practice'
            },
            {
                id: 'a3',
                section: 'Section A: QE Practices & Maturity',
                title: 'What percentage of your testing is automated?',
                type: 'textarea',
                help: 'Please specify Unit %, API %, UI %, Performance %, etc. If unknown, provide estimates.',
                condition: 'has_qe_practice'
            },
            {
                id: 'a4',
                section: 'Section A: QE Practices & Maturity',
                title: 'Which test automation tools or CI/CD frameworks are currently in use?',
                type: 'textarea',
                help: 'Examples: Selenium, Cypress, Jest, Jenkins, GitLab CI, Azure DevOps, etc.',
                condition: 'has_qe_practice'
            },
            {
                id: 'a5',
                section: 'Section A: QE Practices & Maturity',
                title: 'How long do regression cycles take today?',
                type: 'text',
                help: 'Specify in hours or days (e.g., "2 days", "8 hours", "1 week")',
                condition: 'has_qe_practice'
            },
            {
                id: 'a6',
                section: 'Section A: QE Practices & Maturity',
                title: 'What is your estimated test coverage across business-critical components?',
                type: 'text',
                help: 'Provide percentage estimate (e.g., "70%", "Unknown", "Varies by component")',
                condition: 'has_qe_practice'
            },
            {
                id: 'a7',
                section: 'Section A: QE Practices & Maturity',
                title: 'Do you practice Shift-left testing?',
                type: 'textarea',
                help: 'Examples: Unit test mandates, BDD, test in sprint, early defect detection',
                condition: 'has_qe_practice'
            },
            {
                id: 'a8',
                section: 'Section A: QE Practices & Maturity',
                title: 'Is Performance Engineering integrated into your CI/CD or testing strategy?',
                type: 'radio',
                options: ['Yes', 'No', 'Partially'],
                condition: 'has_qe_practice'
            },
            {
                id: 'a9',
                section: 'Section A: QE Practices & Maturity',
                title: 'Do you have Intelligent Data Management for testing?',
                type: 'textarea',
                help: 'Examples: synthetic data generation, data masking, on-demand provisioning',
                condition: 'has_qe_practice'
            },
            {
                id: 'a10',
                section: 'Section A: QE Practices & Maturity',
                title: 'Do you use AI/ML or analytics to optimize test cases, environments, or defect prediction?',
                type: 'radio',
                options: ['Yes', 'No', 'Exploring'],
                condition: 'has_qe_practice'
            },
            
            // Section B: Development & Technical Context
            {
                id: 'b1',
                section: 'Section B: Development & Technical Context',
                title: 'What is your current development methodology?',
                type: 'radio',
                options: ['Agile', 'DevOps', 'Waterfall', 'Hybrid']
            },
            {
                id: 'b2',
                section: 'Section B: Development & Technical Context',
                title: 'How many systems or applications are under test scope?',
                type: 'text',
                help: 'Provide number or range (e.g., "5", "10-15", "50+")'
            },
            {
                id: 'b3',
                section: 'Section B: Development & Technical Context',
                title: 'What technology stacks are in use?',
                type: 'textarea',
                help: 'Examples: Frontend (React, Angular), Backend (Java, .NET, Python), APIs (REST, GraphQL), Databases (SQL Server, MongoDB), Cloud (AWS, Azure, GCP)'
            },
            {
                id: 'b4',
                section: 'Section B: Development & Technical Context',
                title: 'Which testing environments are available?',
                type: 'textarea',
                help: 'Examples: Dev, QA, Staging, Pre-prod, Production, UAT'
            },
            {
                id: 'b5',
                section: 'Section B: Development & Technical Context',
                title: 'How frequently do you deploy to production?',
                type: 'radio',
                options: ['Multiple times per day', 'Daily', 'Weekly', 'Monthly', 'Quarterly']
            },
            
            // Section C: Pain Point Discovery
            {
                id: 'c1',
                section: 'Section C: Pain Point Discovery',
                title: 'How many defects are found in production per month (approximately)?',
                type: 'text',
                help: 'Provide estimate or range (e.g., "5", "10-20", "Unknown")'
            },
            {
                id: 'c2',
                section: 'Section C: Pain Point Discovery',
                title: 'What is your average Mean Time to Detect (MTTD) and Mean Time to Resolve (MTTR) defects?',
                type: 'textarea',
                help: 'MTTD: Time to discover issues, MTTR: Time to fix and deploy. Provide estimates in hours/days.'
            },
            {
                id: 'c3',
                section: 'Section C: Pain Point Discovery',
                title: 'How frequently are bugs reported by end users or customers?',
                type: 'radio',
                options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never']
            },
            {
                id: 'c4',
                section: 'Section C: Pain Point Discovery',
                title: 'Are there known bottlenecks in test automation, environment availability, or data readiness?',
                type: 'textarea',
                help: 'Describe specific challenges and bottlenecks'
            },
            {
                id: 'c5',
                section: 'Section C: Pain Point Discovery',
                title: 'Which areas are considered unstable, high-risk, or business-critical?',
                type: 'textarea',
                help: 'Identify systems, modules, or processes that require special attention'
            },
            
            // Section D: Business Impact
            {
                id: 'd1',
                section: 'Section D: Business Impact',
                title: 'What is the monthly cost of QA/QE operations?',
                type: 'text',
                help: 'Include salaries, tools, infrastructure costs in USD (e.g., "$50,000", "Unknown")'
            },
            {
                id: 'd2',
                section: 'Section D: Business Impact',
                title: 'What is the average cost of a delayed release?',
                type: 'text',
                help: 'Consider revenue impact, resource costs, opportunity loss (e.g., "$10,000", "1 week delay costs $X")'
            },
            {
                id: 'd3',
                section: 'Section D: Business Impact',
                title: 'What is the estimated cost per defect found in production?',
                type: 'text',
                help: 'Include fix cost, support cost, customer impact (e.g., "$5,000", "Varies")'
            },
            {
                id: 'd4',
                section: 'Section D: Business Impact',
                title: 'What are your support costs due to quality issues?',
                type: 'text',
                help: 'Monthly support team costs for handling quality-related incidents'
            },
            {
                id: 'd5',
                section: 'Section D: Business Impact',
                title: 'Have you experienced any revenue loss or SLA breaches due to quality issues?',
                type: 'textarea',
                help: 'Describe incidents and estimated financial impact'
            },
            
            // Section E: ROI Inputs
            {
                id: 'e1',
                section: 'Section E: ROI Inputs',
                title: 'How many QA/QE hours are spent per sprint or release?',
                type: 'text',
                help: 'Total hours across all QA activities (e.g., "200 hours per 2-week sprint")'
            },
            {
                id: 'e2',
                section: 'Section E: ROI Inputs',
                title: 'What is the average hourly cost of QA/QE resources?',
                type: 'text',
                help: 'Blended rate including salary, benefits, overhead (e.g., "$75/hour")'
            },
            {
                id: 'e3',
                section: 'Section E: ROI Inputs',
                title: 'How many test cases are executed per release cycle?',
                type: 'text',
                help: 'Total manual + automated test cases (e.g., "500", "1000+")'
            },
            {
                id: 'e4',
                section: 'Section E: ROI Inputs',
                title: 'How long does manual regression take vs. automated regression?',
                type: 'textarea',
                help: 'Compare time for manual vs automated execution (e.g., "Manual: 3 days, Automated: 4 hours")'
            },
            {
                id: 'e5',
                section: 'Section E: ROI Inputs',
                title: 'How many major releases do you have per year?',
                type: 'text',
                help: 'Number of significant production releases annually (e.g., "12", "4", "24")'
            }
        ];
        
        this.buildQuestionPath(); // Build initial question path
        this.initializeEventListeners();
        this.loadQuestion();
    }
    
    buildQuestionPath() {
        // Reset question path
        this.questionPath = [];
        
        // Always start with initial question
        this.questionPath.push(this.questions.find(q => q.id === 'initial'));
        
        // If we know the QE practice status, build conditional path
        if (this.hasQEPractice !== null) {
            const condition = this.hasQEPractice ? 'has_qe_practice' : 'no_qe_practice';
            
            // Add questions based on condition
            this.questions.forEach(question => {
                // Include questions that match the condition or have no condition (universal questions)
                // Exclude initial question as it's already added
                if (question.id !== 'initial' && 
                   (question.condition === condition || !question.condition)) {
                    this.questionPath.push(question);
                }
            });
        } else {
            // If we haven't answered the initial question, only show initial question
            // Additional questions will be added after the initial response
        }
        
        // Update total questions count
        this.totalQuestions = this.questionPath.length;
    }
    
    getCurrentQuestion() {
        return this.questionPath[this.currentQuestion] || null;
    }
    
    initializeEventListeners() {
        document.getElementById('nextBtn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('backBtn').addEventListener('click', () => this.previousQuestion());
        document.getElementById('calculateROIBtn').addEventListener('click', () => this.calculateROI());
        document.getElementById('downloadReportBtn').addEventListener('click', () => this.downloadReport());
    }
    
    loadQuestion() {
        if (this.currentQuestion >= this.questionPath.length) {
            this.showSummary();
            return;
        }
        
        const question = this.getCurrentQuestion();
        if (!question) {
            this.showSummary();
            return;
        }
        
        // Debug: Show current path information
        console.log(`Loading question ${this.currentQuestion + 1} of ${this.questionPath.length}: ${question.title}`);
        console.log(`QE Practice status: ${this.hasQEPractice}`);
        console.log(`Question condition: ${question.condition || 'none'}`);
        
        // Special handling for QE alignment question
        if (question.id === 'qe_alignment') {
            console.log('QE Alignment question loaded - this will complete the assessment when answered');
        }
        const questionCard = document.getElementById('questionCard');
        
        // Update progress
        this.updateProgress();
        
        // Update section badge
        document.getElementById('sectionBadge').textContent = question.section;
        
        // Update question title
        document.getElementById('questionTitle').textContent = question.title;
        
        // Clear previous content
        this.clearInputs();
        
        // Set up input based on question type
        this.setupInput(question);
        
        // Load previous response if exists
        this.loadPreviousResponse(question.id);
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Show help text if available
        this.showHelpText(question.help);
    }
    
    setupInput(question) {
        const radioGroup = document.getElementById('radioGroup');
        const checkboxGroup = document.getElementById('checkboxGroup');
        const textInputGroup = document.getElementById('textInputGroup');
        const textareaGroup = document.getElementById('textareaGroup');
        
        // Hide all input groups first
        radioGroup.classList.add('hidden');
        checkboxGroup.classList.add('hidden');
        textInputGroup.classList.add('hidden');
        textareaGroup.classList.add('hidden');
        
        if (question.type === 'radio') {
            radioGroup.classList.remove('hidden');
            
            // Clear and populate radio options
            radioGroup.innerHTML = '';
            question.options.forEach(option => {
                const label = document.createElement('label');
                label.className = 'radio-option';
                label.innerHTML = `
                    <input type="radio" name="response" value="${option.toLowerCase()}">
                    <span class="radio-custom"></span>
                    <span class="radio-text">${option}</span>
                `;
                radioGroup.appendChild(label);
            });
        } else if (question.type === 'checkbox') {
            checkboxGroup.classList.remove('hidden');
            
            // Clear and populate checkbox options
            checkboxGroup.innerHTML = '';
            question.options.forEach(option => {
                const label = document.createElement('label');
                label.className = 'checkbox-option';
                label.innerHTML = `
                    <input type="checkbox" name="response[]" value="${option.toLowerCase()}">
                    <span class="checkbox-custom"></span>
                    <span class="checkbox-text">${option}</span>
                `;
                checkboxGroup.appendChild(label);
            });
        } else if (question.type === 'text') {
            textInputGroup.classList.remove('hidden');
        } else if (question.type === 'textarea') {
            textareaGroup.classList.remove('hidden');
        } else if (question.type === 'multi_input') {
            // Create multi-input group if it doesn't exist
            let multiInputGroup = document.getElementById('multiInputGroup');
            if (!multiInputGroup) {
                multiInputGroup = document.createElement('div');
                multiInputGroup.id = 'multiInputGroup';
                multiInputGroup.className = 'multi-input-group';
                document.getElementById('questionContent').appendChild(multiInputGroup);
            }
            
            multiInputGroup.classList.remove('hidden');
            
            // Clear and populate multi-input fields
            multiInputGroup.innerHTML = '';
            question.fields.forEach(field => {
                const fieldDiv = document.createElement('div');
                fieldDiv.className = 'multi-input-field';
                fieldDiv.innerHTML = `
                    <label class="multi-input-label">${field.label}</label>
                    <input type="text" id="${field.id}" name="multi_response_${field.id}" 
                           placeholder="${field.placeholder}" class="multi-input-text">
                `;
                multiInputGroup.appendChild(fieldDiv);
            });
        }
    }
    
    clearInputs() {
        document.querySelectorAll('input[name="response"]').forEach(input => input.checked = false);
        document.querySelectorAll('input[name="response[]"]').forEach(input => input.checked = false);
        document.getElementById('textResponse').value = '';
        document.getElementById('textareaResponse').value = '';
        document.getElementById('notes').value = '';
        
        // Clear multi-input fields
        document.querySelectorAll('input[name^="multi_response_"]').forEach(input => input.value = '');
        
        // Hide multi-input group if it exists
        const multiInputGroup = document.getElementById('multiInputGroup');
        if (multiInputGroup) {
            multiInputGroup.classList.add('hidden');
        }
        
        // Remove any previous help text
        const existingHelp = document.querySelector('.help-text');
        if (existingHelp) {
            existingHelp.remove();
        }
    }
    
    showHelpText(helpText) {
        if (helpText) {
            const helpDiv = document.createElement('div');
            helpDiv.className = 'help-text';
            helpDiv.textContent = helpText;
            document.getElementById('questionContent').appendChild(helpDiv);
        }
    }
    
    loadPreviousResponse(questionId) {
        const response = this.responses[questionId];
        if (response) {
            if (response.type === 'radio') {
                const radioInput = document.querySelector(`input[name="response"][value="${response.value}"]`);
                if (radioInput) radioInput.checked = true;
            } else if (response.type === 'checkbox') {
                // For checkboxes, response.value is an array
                if (Array.isArray(response.value)) {
                    response.value.forEach(value => {
                        const checkboxInput = document.querySelector(`input[name="response[]"][value="${value}"]`);
                        if (checkboxInput) checkboxInput.checked = true;
                    });
                }
            } else if (response.type === 'text') {
                document.getElementById('textResponse').value = response.value;
            } else if (response.type === 'textarea') {
                document.getElementById('textareaResponse').value = response.value;
            } else if (response.type === 'multi_input') {
                // For multi-input, response.value is an object with field IDs as keys
                if (response.value && typeof response.value === 'object') {
                    Object.keys(response.value).forEach(fieldId => {
                        const input = document.getElementById(fieldId);
                        if (input) {
                            input.value = response.value[fieldId];
                        }
                    });
                }
            }
            
            if (response.notes) {
                document.getElementById('notes').value = response.notes;
            }
        }
    }
    
    updateProgress() {
        const currentQuestion = this.getCurrentQuestion();
        let progress, progressText;
        
        // Special handling for QE alignment question - show as final question
        if (currentQuestion && currentQuestion.id === 'qe_alignment') {
            progress = ((this.currentQuestion + 1) / (this.currentQuestion + 1)) * 100; // Show as 100%
            progressText = `Final Question: Comprehensive QE Assessment`;
        } else {
            progress = ((this.currentQuestion + 1) / this.questionPath.length) * 100;
            progressText = `Question ${this.currentQuestion + 1} of ${this.questionPath.length}`;
        }
        
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = progressText;
    }
    
    updateNavigationButtons() {
        const backBtn = document.getElementById('backBtn');
        const nextBtn = document.getElementById('nextBtn');
        const currentQuestion = this.getCurrentQuestion();
        
        backBtn.disabled = this.currentQuestion === 0;
        
        // Special handling for QE alignment question - it completes the assessment
        if (currentQuestion && currentQuestion.id === 'qe_alignment') {
            nextBtn.textContent = 'Complete Assessment →';
        } else if (this.currentQuestion === this.questionPath.length - 1) {
            nextBtn.textContent = 'Complete Assessment →';
        } else {
            nextBtn.textContent = 'Next →';
        }
    }
    
    saveCurrentResponse() {
        const question = this.getCurrentQuestion();
        const questionId = question.id;
        const notes = document.getElementById('notes').value;
        
        let response = {
            question: question.title,
            section: question.section,
            notes: notes
        };
        
        if (question.type === 'radio') {
            const selectedRadio = document.querySelector('input[name="response"]:checked');
            if (selectedRadio) {
                response.type = 'radio';
                response.value = selectedRadio.value;
                response.displayValue = selectedRadio.nextElementSibling.nextElementSibling.textContent;
            }
        } else if (question.type === 'checkbox') {
            const selectedCheckboxes = document.querySelectorAll('input[name="response[]"]:checked');
            if (selectedCheckboxes.length > 0) {
                response.type = 'checkbox';
                response.value = Array.from(selectedCheckboxes).map(cb => cb.value);
                // Create display value from selected options
                const displayValues = Array.from(selectedCheckboxes).map(cb => 
                    cb.nextElementSibling.nextElementSibling.textContent
                );
                response.displayValue = displayValues.join(', ');
            }
        } else if (question.type === 'text') {
            const textValue = document.getElementById('textResponse').value;
            if (textValue.trim()) {
                response.type = 'text';
                response.value = textValue;
                response.displayValue = textValue;
            }
        } else if (question.type === 'textarea') {
            const textareaValue = document.getElementById('textareaResponse').value;
            if (textareaValue.trim()) {
                response.type = 'textarea';
                response.value = textareaValue;
                response.displayValue = textareaValue;
            }
        } else if (question.type === 'multi_input') {
            const multiInputs = {};
            let hasAnyValue = false;
            let displayParts = [];
            
            question.fields.forEach(field => {
                const input = document.getElementById(field.id);
                if (input && input.value.trim()) {
                    multiInputs[field.id] = input.value.trim();
                    displayParts.push(`${field.label} ${input.value.trim()}`);
                    hasAnyValue = true;
                }
            });
            
            if (hasAnyValue) {
                response.type = 'multi_input';
                response.value = multiInputs;
                response.displayValue = displayParts.join(' • ');
            }
        }
        
        if (response.value) {
            this.responses[questionId] = response;
        }
    }
    
    validateCurrentResponse() {
        const question = this.getCurrentQuestion();
        
        if (question.type === 'radio') {
            const selectedRadio = document.querySelector('input[name="response"]:checked');
            return selectedRadio !== null;
        } else if (question.type === 'checkbox') {
            const selectedCheckboxes = document.querySelectorAll('input[name="response[]"]:checked');
            return selectedCheckboxes.length > 0;
        } else if (question.type === 'text') {
            const textValue = document.getElementById('textResponse').value;
            return textValue.trim() !== '';
        } else if (question.type === 'textarea') {
            const textareaValue = document.getElementById('textareaResponse').value;
            return textareaValue.trim() !== '';
        } else if (question.type === 'multi_input') {
            // Check if at least one field has a value
            return question.fields.some(field => {
                const input = document.getElementById(field.id);
                return input && input.value.trim() !== '';
            });
        }
        
        return false;
    }
    
    showValidationError() {
        // Remove existing error
        const existingError = document.querySelector('.error-text');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-text';
        errorDiv.textContent = 'Please provide a response before continuing.';
        document.getElementById('questionContent').appendChild(errorDiv);
    }
    
    nextQuestion() {
        if (!this.validateCurrentResponse()) {
            this.showValidationError();
            return;
        }
        
        this.saveCurrentResponse();
        
        // Handle initial question logic
        const currentQuestion = this.getCurrentQuestion();
        if (currentQuestion && currentQuestion.id === 'initial') {
            // Get the response to the initial question
            const response = this.responses['initial'];
            if (response) {
                this.hasQEPractice = response.value === 'yes';
                this.buildQuestionPath(); // Rebuild path based on response
            }
        }
        
        // Handle QE alignment question - skip to recommendations if answered
        if (currentQuestion && currentQuestion.id === 'qe_alignment') {
            // Check if the QE alignment question has been answered
            const response = this.responses['qe_alignment'];
            if (response && response.value && Object.keys(response.value).length > 0) {
                // Skip all remaining questions and go directly to recommendations (skip ROI)
                this.showQEAlignmentSummary();
                return;
            }
        }
        
        this.currentQuestion++;
        this.loadQuestion();
    }
    
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.saveCurrentResponse();
            this.currentQuestion--;
            this.loadQuestion();
        }
    }
    
    showSummary() {
        document.querySelector('.assessment-container').classList.add('hidden');
        document.getElementById('summaryContainer').classList.remove('hidden');
        
        const summaryContent = document.getElementById('summaryContent');
        summaryContent.innerHTML = '';
        
        // Group responses by section
        const sections = {};
        Object.values(this.responses).forEach(response => {
            if (!sections[response.section]) {
                sections[response.section] = [];
            }
            sections[response.section].push(response);
        });
        
        // Create summary sections
        Object.keys(sections).forEach(sectionName => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'summary-section';
            
            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = sectionName;
            sectionDiv.appendChild(sectionTitle);
            
            sections[sectionName].forEach(response => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'summary-item';
                
                const labelDiv = document.createElement('div');
                labelDiv.className = 'summary-label';
                labelDiv.textContent = response.question;
                
                const valueDiv = document.createElement('div');
                valueDiv.className = 'summary-value';
                valueDiv.textContent = response.displayValue.length > 50 
                    ? response.displayValue.substring(0, 50) + '...' 
                    : response.displayValue;
                
                itemDiv.appendChild(labelDiv);
                itemDiv.appendChild(valueDiv);
                sectionDiv.appendChild(itemDiv);
                
                if (response.notes) {
                    const notesDiv = document.createElement('div');
                    notesDiv.style.fontSize = '0.9rem';
                    notesDiv.style.color = '#6b7280';
                    notesDiv.style.marginTop = '5px';
                    notesDiv.textContent = `Notes: ${response.notes}`;
                    sectionDiv.appendChild(notesDiv);
                }
            });
            
            summaryContent.appendChild(sectionDiv);
        });
        
        // Update progress to 100%
        document.getElementById('progressFill').style.width = '100%';
        document.getElementById('progressText').textContent = 'Assessment Complete';
    }
    
    calculateROI() {
        document.getElementById('roiContainer').classList.remove('hidden');
        document.getElementById('recommendationsContainer').classList.remove('hidden');
        
        // Simple ROI calculation based on responses
        const roiData = this.performROICalculation();
        this.displayROIResults(roiData);
        this.generateRecommendations();
    }
    
    performROICalculation() {
        // Extract key financial inputs
        const monthlyQACost = this.extractNumericValue(this.responses.d1?.value, 50000);
        const costPerDefect = this.extractNumericValue(this.responses.d3?.value, 5000);
        const productionDefectsPerMonth = this.extractNumericValue(this.responses.c1?.value, 10);
        const hourlyRate = this.extractNumericValue(this.responses.e2?.value, 75);
        const releasesPerYear = this.extractNumericValue(this.responses.e5?.value, 12);
        
        // Current annual costs
        const currentAnnualQACost = monthlyQACost * 12;
        const currentDefectCost = productionDefectsPerMonth * costPerDefect * 12;
        const currentTotalCost = currentAnnualQACost + currentDefectCost;
        
        // Projected improvements with QE transformation
        const automationSavings = currentAnnualQACost * 0.3; // 30% reduction in manual effort
        const defectReduction = currentDefectCost * 0.5; // 50% reduction in production defects
        const fasterReleaseCycles = releasesPerYear * 2000; // $2k saved per faster release
        
        const totalAnnualSavings = automationSavings + defectReduction + fasterReleaseCycles;
        const implementationCost = currentAnnualQACost * 0.8; // 80% of annual QA cost for transformation
        
        const roi = ((totalAnnualSavings - implementationCost) / implementationCost) * 100;
        
        return {
            currentAnnualCost: currentAnnualQACost,
            currentDefectCost: currentDefectCost,
            currentTotalCost: currentTotalCost,
            automationSavings: automationSavings,
            defectReduction: defectReduction,
            fasterReleaseCycles: fasterReleaseCycles,
            totalAnnualSavings: totalAnnualSavings,
            implementationCost: implementationCost,
            roi: roi,
            paybackPeriod: implementationCost / (totalAnnualSavings / 12)
        };
    }
    
    extractNumericValue(value, defaultValue) {
        if (!value) return defaultValue;
        const matches = value.match(/[\d,]+/);
        if (matches) {
            return parseInt(matches[0].replace(/,/g, ''));
        }
        return defaultValue;
    }
    
    displayROIResults(roiData) {
        const roiContent = document.getElementById('roiContent');
        
        roiContent.innerHTML = `
            <div class="roi-metrics">
                <div class="roi-metric">
                    <div class="roi-metric-label">Current Annual QA Cost</div>
                    <div class="roi-metric-value">$${roiData.currentAnnualCost.toLocaleString()}</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-metric-label">Current Defect Cost</div>
                    <div class="roi-metric-value">$${roiData.currentDefectCost.toLocaleString()}</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-metric-label">Projected Annual Savings</div>
                    <div class="roi-metric-value">$${roiData.totalAnnualSavings.toLocaleString()}</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-metric-label">Implementation Cost</div>
                    <div class="roi-metric-value">$${roiData.implementationCost.toLocaleString()}</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-metric-label">ROI</div>
                    <div class="roi-metric-value">${roiData.roi.toFixed(1)}%</div>
                </div>
                <div class="roi-metric">
                    <div class="roi-metric-label">Payback Period</div>
                    <div class="roi-metric-value">${roiData.paybackPeriod.toFixed(1)} months</div>
                </div>
            </div>
            
            <div class="summary-section">
                <h3>ROI Breakdown</h3>
                <div class="summary-item">
                    <span class="summary-label">Automation Savings</span>
                    <span class="summary-value">$${roiData.automationSavings.toLocaleString()}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Defect Reduction Savings</span>
                    <span class="summary-value">$${roiData.defectReduction.toLocaleString()}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Faster Release Savings</span>
                    <span class="summary-value">$${roiData.fasterReleaseCycles.toLocaleString()}</span>
                </div>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
                <button class="btn btn-secondary" onclick="assessmentInstance.downloadReport()">📄 Download Report</button>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0369a1;">
                <h4 style="color: #0369a1; margin-bottom: 10px;">💡 Next Steps</h4>
                <p style="color: #0c4a6e; margin: 0;">
                    Based on your ROI analysis, consider scheduling a detailed QE maturity assessment workshop to create a prioritized transformation roadmap and maximize your return on investment.
                </p>
            </div>
        `;
    }
    
    generateRecommendations() {
        const recommendationsContent = document.getElementById('recommendationsContent');
        
        // Calculate maturity scores
        const maturityScores = this.calculateMaturityScore();
        
        // Calculate overall maturity level
        const overallLevel = Math.round((maturityScores.people + maturityScores.process + maturityScores.technology) / 3);
        
        // Generate recommendations based on responses
        const recommendations = this.analyzeResponsesForRecommendations();
        
        recommendationsContent.innerHTML = `
            <div class="overall-maturity-banner">
                <h3>🎯 Overall QE Maturity: Level  ${overallLevel} - ${this.getMaturityLevelName(overallLevel)}</h3>
                <p>Average across People, Process, and Technology capabilities</p>
            </div>
            
            <div class="maturity-dashboard">
                <h3>🎯 QE Maturity Assessment</h3>
                <div class="maturity-charts-container">
                    <div class="maturity-chart-wrapper combined-chart">
                        <canvas id="qeCombinedChart" width="400" height="400"></canvas>
                        <div class="chart-legend">
                            <div class="legend-item">
                                <div class="legend-color" style="background-color: ${this.getCategoryColor('people', maturityScores.people)};"></div>
                                <span>People: Level ${maturityScores.people}</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background-color: ${this.getCategoryColor('process', maturityScores.process)};"></div>
                                <span>Process: Level ${maturityScores.process}</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background-color: ${this.getCategoryColor('technology', maturityScores.technology)};"></div>
                                <span>Technology: Level ${maturityScores.technology}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="maturity-details-section">
                    <h4>📊 Maturity Level Details</h4>
                    <div class="maturity-detail-cards">
                        <div class="maturity-detail-card">
                            <h5>👥 People: Level ${maturityScores.people} - ${this.getMaturityLevelName(maturityScores.people)}</h5>
                            <p>${this.getMaturityLevelDetails(maturityScores.people).description.split(' • ').filter(item => item.includes('People') || item.includes('SDET')).join(' • ')}</p>
                        </div>
                        <div class="maturity-detail-card">
                            <h5>⚙️ Process: Level ${maturityScores.process} - ${this.getMaturityLevelName(maturityScores.process)}</h5>
                            <p>${this.getMaturityLevelDetails(maturityScores.process).description.split(' • ').filter(item => item.includes('Process') || item.includes('Performance') || item.includes('Defect')).join(' • ')}</p>
                        </div>
                        <div class="maturity-detail-card">
                            <h5>🔧 Technology: Level ${maturityScores.technology} - ${this.getMaturityLevelName(maturityScores.technology)}</h5>
                            <p>${this.getMaturityLevelDetails(maturityScores.technology).description.split(' • ').filter(item => item.includes('Technology') || item.includes('Unit Test') || item.includes('Automation')).join(' • ')}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="recommendations-section">
                <h3>📋 QE Transformation Recommendations</h3>
                
                <div class="recommendation-category">
                    <h4>🔄 Shift-Left Testing Strategy</h4>
                    <ul>
                        <li>Implement early testing integration in development cycles</li>
                        <li>Enhance developer testing capabilities and training</li>
                        <li>Establish testing requirements during design phase</li>
                    </ul>
                </div>
                
                <div class="recommendation-category">
                    <h4>🤖 Test Automation Optimization</h4>
                    <ul>
                        <li>Evaluate and optimize current automation frameworks</li>
                        <li>Implement AI-driven test case generation and maintenance</li>
                        <li>Establish automation metrics and KPIs</li>
                    </ul>
                </div>
                
                <div class="recommendation-category">
                    <h4>⚡ Performance & Reliability Engineering</h4>
                    <ul>
                        <li>Integrate performance testing into CI/CD pipelines</li>
                        <li>Implement continuous monitoring and alerting</li>
                        <li>Establish SLA/SLO monitoring and reporting</li>
                    </ul>
                </div>
                
                <div class="recommendation-category">
                    <h4>📊 Intelligent Data & Analytics</h4>
                    <ul>
                        <li>Implement test data management strategies</li>
                        <li>Leverage analytics for defect prediction</li>
                        <li>Establish quality metrics dashboards</li>
                    </ul>
                </div>
                
                <div class="recommendation-category">
                    <h4>🔧 CI/CD & Tooling Enhancement</h4>
                    <ul>
                        <li>Optimize testing integration in deployment pipelines</li>
                        <li>Implement quality gates and automated rollbacks</li>
                        <li>Standardize tooling across development teams</li>
                    </ul>
                </div>
                
                <div class="recommendation-category">
                    <h4>🏛️ Governance & Collaboration</h4>
                    <ul>
                        <li>Establish QE center of excellence</li>
                        <li>Implement cross-team collaboration frameworks</li>
                        <li>Create quality standards and best practices documentation</li>
                    </ul>
                </div>
            </div>
        `;
        
        // Create the combined maturity chart
        this.createQECombinedChart(maturityScores);
    }
    
    analyzeResponsesForRecommendations() {
        const recommendations = [];
        
        // Analyze responses and generate recommendations
        
        // Test Automation recommendations
        const automationPercentage = this.responses.a3?.value;
        if (automationPercentage && automationPercentage.toLowerCase().includes('low') || 
            (this.extractNumericValue(automationPercentage, 0) < 50)) {
            recommendations.push({
                area: 'Test Automation',
                recommendation: 'Increase test automation coverage to reduce manual effort and improve reliability',
                priority: 'High'
            });
        }
        
        // CI/CD Integration recommendations
        const cicdIntegration = this.responses.a8?.value;
        if (cicdIntegration === 'no' || cicdIntegration === 'partially') {
            recommendations.push({
                area: 'CI/CD Integration',
                recommendation: 'Implement comprehensive CI/CD pipeline integration for automated testing',
                priority: 'High'
            });
        }
        
        // Performance Testing recommendations
        const testingTypes = this.responses.a2?.value;
        if (!testingTypes || !testingTypes.includes('performance testing')) {
            recommendations.push({
                area: 'Performance Testing',
                recommendation: 'Implement performance testing to ensure application scalability',
                priority: 'Medium'
            });
        }
        
        // Quality metrics recommendations
        if (!this.responses.a6?.value || this.responses.a6.value.toLowerCase().includes('unknown')) {
            recommendations.push({
                area: 'Quality Metrics',
                recommendation: 'Establish comprehensive test coverage metrics and monitoring',
                priority: 'Medium'
            });
        }
        
        // Default recommendations if no specific issues found
        if (recommendations.length === 0) {
            recommendations.push(
                {
                    area: 'Continuous Improvement',
                    recommendation: 'Implement regular QE practice reviews and optimization cycles',
                    priority: 'Medium'
                },
                {
                    area: 'Team Training',
                    recommendation: 'Provide ongoing training on latest QE tools and methodologies',
                    priority: 'Low'
                },
                {
                    area: 'Innovation',
                    recommendation: 'Explore AI/ML tools for test case optimization and defect prediction',
                    priority: 'Low'
                }
            );
        }
        
        return recommendations;
    }
    
    showQEAlignmentSummary() {
        // Hide assessment container and show summary
        document.querySelector('.assessment-container').classList.add('hidden');
        document.getElementById('summaryContainer').classList.remove('hidden');
        
        const summaryContent = document.getElementById('summaryContent');
        summaryContent.innerHTML = '';
        
        // Create a special summary for QE alignment assessment
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'summary-section';
        
        const titleDiv = document.createElement('h3');
        titleDiv.textContent = 'QE Practices Assessment Complete';
        summaryDiv.appendChild(titleDiv);
        
        // Show the QE alignment response
        const response = this.responses['qe_alignment'];
        if (response) {
            const responseDiv = document.createElement('div');
            responseDiv.className = 'summary-item';
            responseDiv.style.flexDirection = 'column';
            responseDiv.style.alignItems = 'flex-start';
            
            const labelDiv = document.createElement('div');
            labelDiv.className = 'summary-label';
            labelDiv.textContent = response.question;
            labelDiv.style.marginBottom = '10px';
            
            const valueDiv = document.createElement('div');
            valueDiv.className = 'summary-value';
            valueDiv.style.fontSize = '0.9rem';
            valueDiv.style.lineHeight = '1.5';
            valueDiv.style.color = '#374151';
            valueDiv.textContent = response.displayValue;
            
            responseDiv.appendChild(labelDiv);
            responseDiv.appendChild(valueDiv);
            summaryDiv.appendChild(responseDiv);
            
            // Show notes if available
            if (response.notes) {
                const notesDiv = document.createElement('div');
                notesDiv.style.fontSize = '0.9rem';
                notesDiv.style.color = '#6b7280';
                notesDiv.style.marginTop = '15px';
                notesDiv.textContent = `Notes: ${response.notes}`;
                summaryDiv.appendChild(notesDiv);
            }
        }
        
        summaryContent.appendChild(summaryDiv);
        
        // Update summary actions to skip ROI and show only recommendations
        const summaryActions = document.querySelector('.summary-actions');
        summaryActions.innerHTML = '';
        
        // Create recommendations button only
        const recommendationsBtn = document.createElement('button');
        recommendationsBtn.className = 'btn btn-primary';
        recommendationsBtn.textContent = 'Generate Recommendations';
        recommendationsBtn.addEventListener('click', () => this.generateQERecommendations());
        
        summaryActions.appendChild(recommendationsBtn);
        
        // Update progress to 100%
        document.getElementById('progressFill').style.width = '100%';
        document.getElementById('progressText').textContent = 'QE Assessment Complete';
    }
    
    generateQERecommendations() {
        // Skip ROI calculation and show recommendations directly
        document.getElementById('recommendationsContainer').classList.remove('hidden');
        
        const recommendationsContent = document.getElementById('recommendationsContent');
        recommendationsContent.innerHTML = '';
        
        // Analyze QE alignment response for maturity scoring
        const maturityScores = this.analyzeQEAlignmentMaturity();
        
        // Calculate overall maturity level
        const overallLevel = Math.round((maturityScores.people + maturityScores.process + maturityScores.technology) / 3);
        
        // Generate recommendations based on QE alignment response
        const qeResponse = this.responses['qe_alignment'];
        
        const recommendationsHTML = `
            <div class="overall-maturity-banner">
                <h3>🎯 Overall QE Maturity: Level  ${overallLevel} - ${this.getMaturityLevelName(overallLevel)}</h3>
                <p>Average across People, Process, and Technology capabilities</p>
            </div>
            
            <div class="maturity-dashboard">
                <h3>🎯 QE Maturity Assessment</h3>
                <div class="maturity-charts-container">
                    <div class="maturity-chart-wrapper combined-chart">
                        <canvas id="qeCombinedChart" width="400" height="400"></canvas>
                        <div class="chart-legend">
                            <div class="legend-item">
                                <div class="legend-color" style="background-color: ${this.getCategoryColor('people', maturityScores.people)};"></div>
                                <span>People: Level ${maturityScores.people}</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background-color: ${this.getCategoryColor('process', maturityScores.process)};"></div>
                                <span>Process: Level ${maturityScores.process}</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color" style="background-color: ${this.getCategoryColor('technology', maturityScores.technology)};"></div>
                                <span>Technology: Level ${maturityScores.technology}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="maturity-details-section">
                    <h4>📊 Maturity Level Details</h4>
                    <div class="maturity-detail-cards">
                        <div class="maturity-detail-card">
                            <h5>👥 People: Level ${maturityScores.people} - ${this.getMaturityLevelName(maturityScores.people)}</h5>
                            <p>${this.getMaturityLevelDetails(maturityScores.people).description.split(' • ').filter(item => item.includes('People') || item.includes('SDET')).join(' • ')}</p>
                        </div>
                        <div class="maturity-detail-card">
                            <h5>⚙️ Process: Level ${maturityScores.process} - ${this.getMaturityLevelName(maturityScores.process)}</h5>
                            <p>${this.getMaturityLevelDetails(maturityScores.process).description.split(' • ').filter(item => item.includes('Process') || item.includes('Performance') || item.includes('Defect')).join(' • ')}</p>
                        </div>
                        <div class="maturity-detail-card">
                            <h5>🔧 Technology: Level ${maturityScores.technology} - ${this.getMaturityLevelName(maturityScores.technology)}</h5>
                            <p>${this.getMaturityLevelDetails(maturityScores.technology).description.split(' • ').filter(item => item.includes('Technology') || item.includes('Unit Test') || item.includes('Automation')).join(' • ')}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="recommendations-section">
                <h3>🎯 Strategic QE Enhancement Recommendations</h3>
                <p style="margin-bottom: 20px; color: #6b7280;">
                    Based on your comprehensive QE practices overview, here are tailored recommendations to enhance your quality engineering maturity:
                </p>
                
                <div class="recommendation-category">
                    <h4>🔄 Shift-Left Testing Enhancement</h4>
                    <ul>
                        <li>Implement early testing integration in development cycles</li>
                        <li>Enhance developer testing capabilities and training</li>
                        <li>Establish testing requirements during design phase</li>
                    </ul>
                </div>
                
                <div class="recommendation-category">
                    <h4>🤖 Test Automation Optimization</h4>
                    <ul>
                        <li>Evaluate and optimize current automation frameworks</li>
                        <li>Implement AI-driven test case generation and maintenance</li>
                        <li>Establish automation metrics and KPIs</li>
                    </ul>
                </div>
                
                <div class="recommendation-category">
                    <h4>⚡ Performance & Reliability Engineering</h4>
                    <ul>
                        <li>Integrate performance testing into CI/CD pipelines</li>
                        <li>Implement continuous monitoring and alerting</li>
                        <li>Establish SLA/SLO monitoring and reporting</li>
                    </ul>
                </div>
                
                <div class="recommendation-category">
                    <h4>📊 Intelligent Data & Analytics</h4>
                    <ul>
                        <li>Implement test data management strategies</li>
                        <li>Leverage analytics for defect prediction</li>
                        <li>Establish quality metrics dashboards</li>
                    </ul>
                </div>
                
                <div class="recommendation-category">
                    <h4>🔧 CI/CD & Tooling Enhancement</h4>
                    <ul>
                        <li>Optimize testing integration in deployment pipelines</li>
                        <li>Implement quality gates and automated rollbacks</li>
                        <li>Standardize tooling across development teams</li>
                    </ul>
                </div>
                
                <div class="recommendation-category">
                    <h4>🏛️ Governance & Collaboration</h4>
                    <ul>
                        <li>Establish QE center of excellence</li>
                        <li>Implement cross-team collaboration frameworks</li>
                        <li>Create quality standards and best practices documentation</li>
                    </ul>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <button class="btn btn-secondary" onclick="assessmentInstance.downloadReport()">📄 Download Report</button>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px; border-left: 4px solid #0369a1;">
                    <h4 style="color: #0369a1; margin-bottom: 10px;">💡 Next Steps</h4>
                    <p style="color: #0c4a6e; margin: 0;">
                        Consider scheduling a detailed QE maturity assessment workshop to dive deeper into specific areas 
                        identified in your response and create a prioritized transformation roadmap.
                    </p>
                </div>
            </div>
        `;
        
        recommendationsContent.innerHTML = recommendationsHTML;
        
        // Create the combined maturity chart for QE alignment
        this.createQECombinedChart(maturityScores);
    }
    
    analyzeQEAlignmentMaturity() {
        const qeResponse = this.responses['qe_alignment']?.value || {};
        
        // Convert multi-input object to a combined string for analysis
        let responseText = '';
        if (typeof qeResponse === 'object') {
            responseText = Object.values(qeResponse).join(' ').toLowerCase();
        } else {
            responseText = qeResponse.toLowerCase();
        }
        
        // Analyze People maturity based on QE alignment response
        let peopleScore = 2; // Default to managed level for existing QE practice
        
        // Check specific fields for more accurate scoring
        const sdeTraining = qeResponse.sdet_training?.toLowerCase() || '';
        const peopleRoles = qeResponse.people_documented_roles?.toLowerCase() || '';
        
        if (sdeTraining.includes('25%') || sdeTraining.includes('dedicated') || 
            peopleRoles.includes('well-defined')) {
            peopleScore = Math.max(peopleScore, 4);
        } else if (sdeTraining.includes('some') || peopleRoles.includes('basic')) {
            peopleScore = Math.max(peopleScore, 3);
        }
        
        if (responseText.includes('dedicated') && 
            (responseText.includes('automation engineer') || responseText.includes('sdet'))) {
            peopleScore = Math.max(peopleScore, 4);
        }
        if (responseText.includes('training') || responseText.includes('skill')) {
            peopleScore = Math.max(peopleScore, 3);
        }
        if (responseText.includes('collaboration') || responseText.includes('cross-team')) {
            peopleScore = Math.max(peopleScore, 4);
        }
        
        // Analyze Process maturity
        let processScore = 2; // Default to managed level
        
        // Check specific fields for more accurate scoring
        const performanceTesting = qeResponse.performance_testing?.toLowerCase() || '';
        const processDocumented = qeResponse.continuous_process_documented?.toLowerCase() || '';
        
        if (performanceTesting.includes('integrated') || processDocumented.includes('comprehensive')) {
            processScore = Math.max(processScore, 4);
        } else if (performanceTesting.includes('regular') || processDocumented.includes('standard')) {
            processScore = Math.max(processScore, 3);
        }
        
        if (responseText.includes('shift-left') || responseText.includes('early testing')) {
            processScore = Math.max(processScore, 4);
        }
        if (responseText.includes('ci/cd') && responseText.includes('integrated')) {
            processScore = Math.max(processScore, 4);
        }
        if (responseText.includes('governance') || responseText.includes('standard')) {
            processScore = Math.max(processScore, 3);
        }
        if (responseText.includes('continuous') || responseText.includes('optimiz')) {
            processScore = Math.max(processScore, 5);
        }
        
        // Analyze Technology maturity
        let technologyScore = 2; // Default to managed level
        
        // Check specific fields for more accurate scoring
        const unitTestCoverage = qeResponse.unit_test_coverage?.toLowerCase() || '';
        const automationCoverage = qeResponse.automation_coverage?.toLowerCase() || '';
        const technologyUsed = qeResponse.state_art_technology_used?.toLowerCase() || '';
        
        if (automationCoverage.includes('extensive') || automationCoverage.includes('high') ||
            unitTestCoverage.includes('70%') || unitTestCoverage.includes('high')) {
            technologyScore = Math.max(technologyScore, 4);
        } else if (automationCoverage.includes('some') || unitTestCoverage.includes('medium')) {
            technologyScore = Math.max(technologyScore, 3);
        }
        
        if (technologyUsed.includes('latest') || technologyUsed.includes('modern')) {
            technologyScore = Math.max(technologyScore, 4);
        } else if (technologyUsed.includes('standard')) {
            technologyScore = Math.max(technologyScore, 3);
        }
        
        if (responseText.includes('automation') && 
            (responseText.includes('high') || responseText.includes('extensive'))) {
            technologyScore = Math.max(technologyScore, 4);
        }
        if (responseText.includes('performance') && responseText.includes('integrated')) {
            technologyScore = Math.max(technologyScore, 4);
        }
        if (responseText.includes('intelligent data') || responseText.includes('analytics')) {
            technologyScore = Math.max(technologyScore, 4);
        }
        if (responseText.includes('ai') || responseText.includes('ml') || 
            responseText.includes('machine learning')) {
            technologyScore = Math.max(technologyScore, 5);
        }
        
        return {
            people: Math.min(peopleScore, 5),
            process: Math.min(processScore, 5),
            technology: Math.min(technologyScore, 5)
        };
    }
    
    createQECombinedChart(scores) {
        const ctx = document.getElementById('qeCombinedChart').getContext('2d');
        
        // Calculate percentages for each area
        const peoplePercentage = (scores.people / 5) * 100;
        const processPercentage = (scores.process / 5) * 100;
        const technologyPercentage = (scores.technology / 5) * 100;
        
        // Calculate overall maturity level
        const overallLevel = Math.round((scores.people + scores.process + scores.technology) / 3);
        const overallLevelName = this.getMaturityLevelName(overallLevel);
        
        // Get colors for each category with distinct color schemes
        const peopleColor = this.getCategoryColor('people', scores.people);
        const processColor = this.getCategoryColor('process', scores.process);
        const technologyColor = this.getCategoryColor('technology', scores.technology);
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['People', 'Process', 'Technology'],
                datasets: [{
                    data: [peoplePercentage, processPercentage, technologyPercentage],
                    backgroundColor: [peopleColor, processColor, technologyColor],
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = Math.round(context.parsed);
                                const level = Math.round((value / 100) * 5);
                                return `${label}: Level ${level} (${value}%)`;
                            },
                            afterLabel: function(context) {
                                const level = Math.round((context.parsed / 100) * 5);
                                const details = assessmentInstance.getMaturityLevelDetails(level);
                                return details.description.split(' • ').slice(0, 3).join('\n');
                            }
                        },
                        maxWidth: 400,
                        bodySpacing: 4,
                        titleSpacing: 4
                    }
                }
            },
            plugins: [{
                beforeDraw: function(chart) {
                    const width = chart.width;
                    const height = chart.height;
                    const ctx = chart.ctx;
                    
                    ctx.restore();
                    const fontSize = (height / 220).toFixed(2);
                    ctx.font = `bold ${fontSize}em sans-serif`;
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#1f2937';
                    
                    const centerX = width / 2;
                    const centerY = height / 2;
                    
                    // Draw overall level number only
                    ctx.font = `bold ${fontSize * 1.8}em sans-serif`;
                    ctx.fillStyle = '#1e40af';
                    ctx.textAlign = 'center';
                    ctx.fillText(`Level  ${overallLevel}`, centerX, centerY);
                    
                    ctx.save();
                }
            }]
        });
    }

    calculateMaturityScore() {
        const scores = {
            people: 0,
            process: 0,
            technology: 0
        };
        
        // People scoring based on team structure, training, and collaboration
        let peopleScore = 1; // Default Level 1
        
        // Check team structure and SDET training
        const teamStructure = this.responses.a1?.value || '';
        const testingTypes = this.responses.a2?.value || [];
        
        // Estimate SDET training level based on team description
        if (teamStructure.toLowerCase().includes('sdet') || 
            teamStructure.toLowerCase().includes('test automation engineer') ||
            teamStructure.toLowerCase().includes('automation')) {
            if (teamStructure.toLowerCase().includes('dedicated') || 
                teamStructure.toLowerCase().includes('specialized')) {
                peopleScore = Math.max(peopleScore, 4); // 20-30% of team
            } else {
                peopleScore = Math.max(peopleScore, 3); // 10-20% of team
            }
        }
        
        // Process scoring based on testing practices and CI/CD integration
        let processScore = 1; // Default Level 1
        
        // Check CI/CD integration
        const cicdIntegration = this.responses.a8?.value;
        if (cicdIntegration === 'yes') {
            processScore = Math.max(processScore, 4); // Fully integrated
        } else if (cicdIntegration === 'partially') {
            processScore = Math.max(processScore, 3); // Regular integration
        }
        
        // Check shift-left practices
        const shiftLeft = this.responses.a7?.value || '';
        if (shiftLeft.toLowerCase().includes('unit test') || 
            shiftLeft.toLowerCase().includes('early') ||
            shiftLeft.toLowerCase().includes('sprint')) {
            processScore = Math.max(processScore, 3);
        }
        
        // Technology scoring based on automation and testing coverage
        let technologyScore = 1; // Default Level 1
        
        // Check automation coverage
        const automationCoverage = this.responses.a3?.value || '';
        const automationPercent = this.extractAutomationPercentage(automationCoverage);
        
        if (automationPercent >= 70) {
            technologyScore = 5; // More than 70%
        } else if (automationPercent >= 50) {
            technologyScore = 4; // 50-70%
        } else if (automationPercent >= 30) {
            technologyScore = 3; // 30-50%
        } else if (automationPercent >= 10) {
            technologyScore = 2; // 10-30%
        }
        
        // Check test coverage
        const testCoverage = this.responses.a6?.value || '';
        const coveragePercent = this.extractCoveragePercentage(testCoverage);
        
        if (coveragePercent >= 80) {
            technologyScore = Math.max(technologyScore, 5);
        } else if (coveragePercent >= 60) {
            technologyScore = Math.max(technologyScore, 4);
        } else if (coveragePercent >= 40) {
            technologyScore = Math.max(technologyScore, 3);
        } else if (coveragePercent >= 20) {
            technologyScore = Math.max(technologyScore, 2);
        }
        
        scores.people = peopleScore;
        scores.process = processScore;
        scores.technology = technologyScore;
        
        return scores;
    }
    
    extractAutomationPercentage(text) {
        if (!text) return 0;
        
        // Look for percentage patterns
        const percentMatch = text.match(/(\d+)%/);
        if (percentMatch) {
            return parseInt(percentMatch[1]);
        }
        
        // Look for keywords
        const lowerText = text.toLowerCase();
        if (lowerText.includes('high') || lowerText.includes('mostly')) return 75;
        if (lowerText.includes('medium') || lowerText.includes('some')) return 40;
        if (lowerText.includes('low') || lowerText.includes('little')) return 15;
        if (lowerText.includes('none') || lowerText.includes('no')) return 0;
        
        return 0;
    }
    
    extractCoveragePercentage(text) {
        if (!text) return 0;
        
        // Look for percentage patterns
        const percentMatch = text.match(/(\d+)%/);
        if (percentMatch) {
            return parseInt(percentMatch[1]);
        }
        
        // Look for keywords
        const lowerText = text.toLowerCase();
        if (lowerText.includes('high') || lowerText.includes('comprehensive')) return 75;
        if (lowerText.includes('medium') || lowerText.includes('adequate')) return 50;
        if (lowerText.includes('low') || lowerText.includes('limited')) return 25;
        if (lowerText.includes('unknown') || lowerText.includes('no')) return 0;
        
        return 0;
    }
    
    getMaturityLevelName(score) {
        switch(score) {
            case 1: return 'Initial Level';
            case 2: return 'Managed Level';
            case 3: return 'Defined Level';
            case 4: return 'Quantitatively Managed Level';
            case 5: return 'Optimizing Level';
            default: return 'Initial Level';
        }
    }
    
    getMaturityLevelColor(score) {
        switch(score) {
            case 1: return '#dc2626'; // Red
            case 2: return '#f59e0b'; // Orange
            case 3: return '#eab308'; // Yellow
            case 4: return '#22c55e'; // Green
            case 5: return '#059669'; // Dark Green
            default: return '#dc2626';
        }
    }

    getCategoryColor(category, score) {
        // Define different color schemes for each category
        const colorSchemes = {
            people: {
                1: '#7c2d12', // Dark Red-Brown
                2: '#dc2626', // Red
                3: '#f59e0b', // Orange
                4: '#22c55e', // Green
                5: '#059669'  // Dark Green
            },
            process: {
                1: '#1e3a8a', // Dark Blue
                2: '#3b82f6', // Blue
                3: '#06b6d4', // Cyan
                4: '#10b981', // Emerald
                5: '#059669'  // Dark Green
            },
            technology: {
                1: '#581c87', // Dark Purple
                2: '#9333ea', // Purple
                3: '#a855f7', // Violet
                4: '#22c55e', // Green
                5: '#059669'  // Dark Green
            }
        };
        
        return colorSchemes[category][score] || '#dc2626';
    }

    createDonutChart(canvasId, score, label) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const percentage = (score / 5) * 100;
        const color = this.getMaturityLevelColor(score);
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [percentage, 100 - percentage],
                    backgroundColor: [color, '#e5e7eb'],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            },
            plugins: [{
                beforeDraw: function(chart) {
                    const width = chart.width;
                    const height = chart.height;
                    const ctx = chart.ctx;
                    
                    ctx.restore();
                    const fontSize = (height / 114).toFixed(2);
                    ctx.font = `bold ${fontSize}em Inter, sans-serif`;
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = color;
                    
                    const text = `${score}/5`;
                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 2;
                    
                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            }]
        });
    }

    downloadReport() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set up document styling
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        
        // Title
        doc.text('QA Assessment Report', 20, 30);
        
        // Subtitle
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        const currentDate = new Date().toLocaleDateString();
        doc.text(`Generated on: ${currentDate}`, 20, 40);
        
        let yPosition = 60;
        
        // Assessment Type
        const isQEAlignment = this.responses['qe_alignment'];
        doc.setFontSize(16);
        doc.setTextColor(40, 40, 40);
        
        if (isQEAlignment) {
            doc.text('Assessment Type: QE Practices Alignment Review', 20, yPosition);
            yPosition += 20;
            
            // Add QE Alignment Response
            doc.setFontSize(14);
            doc.text('QE Practices Overview:', 20, yPosition);
            yPosition += 10;
            
            doc.setFontSize(10);
            const qeText = this.responses['qe_alignment'].value;
            const splitQEText = doc.splitTextToSize(qeText, 170);
            doc.text(splitQEText, 20, yPosition);
            yPosition += splitQEText.length * 5 + 15;
            
            // Add Maturity Scores
            const maturityScores = this.analyzeQEAlignmentMaturity();
            doc.setFontSize(14);
            doc.text('Maturity Assessment:', 20, yPosition);
            yPosition += 15;
            
            doc.setFontSize(12);
            doc.text(`People: Level ${maturityScores.people} - ${this.getMaturityLevelName(maturityScores.people)}`, 30, yPosition);
            yPosition += 8;
            doc.text(`Process: Level ${maturityScores.process} - ${this.getMaturityLevelName(maturityScores.process)}`, 30, yPosition);
            yPosition += 8;
            doc.text(`Technology: Level ${maturityScores.technology} - ${this.getMaturityLevelName(maturityScores.technology)}`, 30, yPosition);
            yPosition += 20;
            
        } else {
            doc.text('Assessment Type: Detailed QE Maturity Assessment', 20, yPosition);
            yPosition += 20;
            
            // Add summary of key responses
            doc.setFontSize(14);
            doc.text('Key Assessment Areas:', 20, yPosition);
            yPosition += 15;
            
            // Add maturity scores if available
            if (Object.keys(this.responses).length > 1) {
                const maturityScores = this.calculateMaturityScore();
                doc.setFontSize(12);
                doc.text(`People Maturity: Level ${maturityScores.people} - ${this.getMaturityLevelName(maturityScores.people)}`, 30, yPosition);
                yPosition += 8;
                doc.text(`Process Maturity: Level ${maturityScores.process} - ${this.getMaturityLevelName(maturityScores.process)}`, 30, yPosition);
                yPosition += 8;
                doc.text(`Technology Maturity: Level ${maturityScores.technology} - ${this.getMaturityLevelName(maturityScores.technology)}`, 30, yPosition);
                yPosition += 15;
            }
        }
        
        // Add key responses
        if (yPosition < 200) {
            doc.setFontSize(14);
            doc.text('Assessment Responses:', 20, yPosition);
            yPosition += 15;
            
            // Add key responses (limit to avoid overflow)
            const keyResponses = Object.values(this.responses).slice(0, 5);
            doc.setFontSize(10);
            
            keyResponses.forEach(response => {
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 30;
                }
                
                // Question
                doc.setFont('helvetica', 'bold');
                const questionText = doc.splitTextToSize(`Q: ${response.question}`, 170);
                doc.text(questionText, 20, yPosition);
                yPosition += questionText.length * 5 + 3;
                
                // Answer
                doc.setFont('helvetica', 'normal');
                const answerText = doc.splitTextToSize(`A: ${response.displayValue}`, 170);
                doc.text(answerText, 20, yPosition);
                yPosition += answerText.length * 5 + 8;
                
                if (response.notes) {
                    doc.setTextColor(100, 100, 100);
                    const notesText = doc.splitTextToSize(`Notes: ${response.notes}`, 170);
                    doc.text(notesText, 20, yPosition);
                    yPosition += notesText.length * 5 + 8;
                    doc.setTextColor(40, 40, 40);
                }
            });
        }
        
        // Add new page for recommendations
        doc.addPage();
        yPosition = 30;
        
        // Recommendations section
        doc.setFontSize(16);
        doc.text('Recommendations', 20, yPosition);
        yPosition += 20;
        
        if (isQEAlignment) {
            // QE Enhancement recommendations
            const categories = [
                'Shift-Left Testing Enhancement',
                'Test Automation Optimization', 
                'Performance & Reliability Engineering',
                'Intelligent Data & Analytics',
                'CI/CD & Tooling Enhancement',
                'Governance & Collaboration'
            ];
            
            doc.setFontSize(12);
            categories.forEach(category => {
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 30;
                }
                doc.setFont('helvetica', 'bold');
                doc.text(category, 20, yPosition);
                yPosition += 10;
                doc.setFont('helvetica', 'normal');
                doc.text('• Enhance current practices and implement best practices', 25, yPosition);
                yPosition += 8;
                doc.text('• Focus on continuous improvement and optimization', 25, yPosition);
                yPosition += 15;
            });
        } else {
            // Detailed recommendations based on responses
            const recommendations = this.analyzeResponsesForRecommendations();
            
            doc.setFontSize(12);
            recommendations.forEach(rec => {
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 30;
                }
                
                doc.setFont('helvetica', 'bold');
                doc.text(`${rec.area} (${rec.priority} Priority)`, 20, yPosition);
                yPosition += 8;
                
                doc.setFont('helvetica', 'normal');
                const recText = doc.splitTextToSize(rec.recommendation, 170);
                doc.text(recText, 25, yPosition);
                yPosition += recText.length * 5 + 10;
            });
        }
        
        // Add next steps
        if (yPosition > 240) {
            doc.addPage();
            yPosition = 30;
        } else {
            yPosition += 10;
        }
        
        doc.setFontSize(14);
        doc.text('Next Steps', 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(11);
        const nextStepsText = doc.splitTextToSize(
            'Consider scheduling a detailed QE maturity assessment workshop to dive deeper into specific areas identified in your response and create a prioritized transformation roadmap.',
            170
        );
        doc.text(nextStepsText, 20, yPosition);
        
        // Save the PDF
        const filename = isQEAlignment ? 
            'QE_Alignment_Assessment_Report.pdf' : 
            'QE_Detailed_Assessment_Report.pdf';
        
        doc.save(filename);
    }

    getMaturityLevelDetails(score) {
        const details = {
            1: {
                name: 'Initial Level',
                description: 'Unit Test Coverage: Less than 20% • Automation Coverage: Less than 10% • Performance Testing: Not integrated into CI/CD • Defect Density: Not tracked • SDET Training: None • People: Roles are not clearly defined, minimal collaboration • Process: Processes are ad-hoc and chaotic • Technology: Limited tools and technology usage'
            },
            2: {
                name: 'Managed Level',
                description: 'Unit Test Coverage: 20% - 40% • Automation Coverage: 10% - 30% • Performance Testing: Limited integration in CI/CD • Defect Density: Tracked occasionally • SDET Training: Less than 10% of team • People: Basic roles defined, some collaboration • Process: Basic project management processes established • Technology: Some tools and technology in use'
            },
            3: {
                name: 'Defined Level',
                description: 'Unit Test Coverage: 40% - 60% • Automation Coverage: 30% - 50% • Performance Testing: Regular integration in CI/CD • Defect Density: Tracked regularly • SDET Training: 10% - 20% of team • People: Roles well-defined, good collaboration • Process: Processes are well-documented and standardized • Technology: Use of advanced tools and technology'
            },
            4: {
                name: 'Quantitatively Managed Level',
                description: 'Unit Test Coverage: 60% - 80% • Automation Coverage: 50% - 70% • Performance Testing: Fully integrated in CI/CD • Defect Density: Analyzed and used for improvements • SDET Training: 20% - 30% of team • People: Highly skilled team, excellent collaboration • Process: Processes are measured and controlled • Technology: Cutting-edge tools and technology in use'
            },
            5: {
                name: 'Optimizing Level',
                description: 'Unit Test Coverage: More than 80% • Automation Coverage: More than 70% • Performance Testing: Continuous integration and improvement • Defect Density: Continuously analyzed and improved • SDET Training: More than 30% of team • People: Expert team, seamless collaboration • Process: Continuous process improvement and innovation • Technology: State-of-the-art tools and technology'
            }
        };
        
        return details[score] || details[1];
    }

    // ...existing code...
}

// Initialize the assessment when the page loads
let assessmentInstance;
document.addEventListener('DOMContentLoaded', () => {
    assessmentInstance = new QAAssessment();
});
