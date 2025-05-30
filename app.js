// Disease database with detailed information
const diseaseDatabase = {
    "healthy_apple": {
        name: "Apple Leaf",
        status: "Healthy",
        scientificName: "Malus domestica",
        disease: "No disease detected",
        confidence: "98%",
        description: "The leaf appears healthy with vibrant green color and no visible spots or discoloration. The structure is intact with no signs of pests or fungal growth.",
        symptoms: "N/A",
        treatment: "Continue current care regimen. Ensure proper sunlight, watering, and nutrient balance.",
        prevention: "Regular inspection, proper spacing between plants, and maintaining good air circulation.",
        affectedParts: "N/A",
        image: "images/healthy_apple.jpg"
    },
    "apple_scab": {
        name: "Apple Leaf",
        status: "Diseased",
        scientificName: "Venturia inaequalis",
        disease: "Apple Scab",
        confidence: "94%",
        description: "Fungal disease causing dark, scaly lesions on leaves and fruit. Common in humid conditions and can lead to premature leaf drop.",
        symptoms: "Olive-green to black spots on leaves, velvety lesions, yellowing around spots, distorted or stunted leaves.",
        treatment: "Apply fungicides containing myclobutanil, sulfur, or copper. Remove and destroy infected leaves.",
        prevention: "Plant resistant varieties, prune for air circulation, remove fallen leaves in autumn.",
        affectedParts: "Leaves, fruits, young twigs",
        image: "images/apple_scab.jpg"
    },
    "tomato_blight": {
        name: "Tomato Leaf",
        status: "Diseased",
        scientificName: "Phytophthora infestans",
        disease: "Early Blight",
        confidence: "89%",
        description: "Fungal disease causing concentric rings on leaves, leading to defoliation and reduced fruit production.",
        symptoms: "Brown spots with concentric rings, yellow halos, leaf yellowing progressing from bottom up.",
        treatment: "Apply chlorothalonil or copper-based fungicides. Remove infected leaves immediately.",
        prevention: "Rotate crops yearly, stake plants for air flow, water at soil level (not leaves).",
        affectedParts: "Leaves, stems, fruits",
        image: "images/tomato_blight.jpg"
    },
    "grape_black_rot": {
        name: "Grape Leaf",
        status: "Diseased",
        scientificName: "Guignardia bidwellii",
        disease: "Black Rot",
        confidence: "91%",
        description: "Fungal disease that can destroy grape crops if untreated, causing fruit to shrivel into hard black mummies.",
        symptoms: "Brown spots with black edges on leaves, black fruit lesions, tiny black dots in affected areas.",
        treatment: "Apply fungicides like mancozeb or myclobutanil. Remove all infected plant material.",
        prevention: "Proper pruning, canopy management, and removing infected berries before winter.",
        affectedParts: "Leaves, stems, fruits",
        image: "images/grape_black_rot.jpg"
    },
    "corn_rust": {
        name: "Corn Leaf",
        status: "Diseased",
        scientificName: "Puccinia sorghi",
        disease: "Common Rust",
        confidence: "87%",
        description: "Fungal disease producing rust-colored pustules that reduce photosynthesis and weaken plants.",
        symptoms: "Small, circular to elongated cinnamon-brown pustules on both leaf surfaces.",
        treatment: "Fungicides containing azoxystrobin or propiconazole if detected early.",
        prevention: "Plant resistant hybrids, avoid late planting, rotate with non-host crops.",
        affectedParts: "Leaves (primarily), occasionally husks and stalks",
        image: "images/corn_rust.jpg"
    }
};

// DOM Elements
const examplesSection = document.getElementById('examples-section');
const analysisSection = document.getElementById('analysis-section');
const fileUpload = document.getElementById('file-upload');

// Event Listeners
if (fileUpload) {
    fileUpload.addEventListener('change', handleFileUpload);
}

// Functions
function showExamples() {
    examplesSection.style.display = examplesSection.style.display === 'none' ? 'block' : 'none';
}

function analyzeSample(imageId) {
    // Show analysis section with loading animation
    analysisSection.innerHTML = `
        <div class="analysis-process">
            <div class="ai-model-info">
                <i class="fas fa-robot"></i> 
                Using <strong>${getRandomAIModel()}</strong> for analysis
            </div>
            <div class="time-estimate">
                <i class="fas fa-clock"></i> Estimated time: <span id="time-remaining">20</span> seconds
            </div>
            
            <div class="process-step active" id="step1">
                <div class="process-icon">
                    <i class="fas fa-search"></i>
                </div>
                <div class="process-text">Initializing image analysis...</div>
                <div class="progress-bar">
                    <div class="progress" style="width: 15%"></div>
                </div>
            </div>
            <div class="process-step" id="step2">
                <div class="process-icon">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="process-text">Extracting visual features...</div>
                <div class="progress-bar">
                    <div class="progress" style="width: 35%"></div>
                </div>
            </div>
            <div class="process-step" id="step3">
                <div class="process-icon">
                    <i class="fas fa-dna"></i>
                </div>
                <div class="process-text">Comparing with disease patterns...</div>
                <div class="progress-bar">
                    <div class="progress" style="width: 65%"></div>
                </div>
            </div>
            <div class="process-step" id="step4">
                <div class="process-icon">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <div class="process-text">Finalizing diagnosis...</div>
                <div class="progress-bar">
                    <div class="progress" style="width: 85%"></div>
                </div>
            </div>
        </div>
    `;
    
    // Start countdown timer
    let timeLeft = 20;
    const timerElement = document.getElementById('time-remaining');
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) clearInterval(timerInterval);
    }, 1000);
    
    // Scroll to analysis section
    analysisSection.scrollIntoView({ behavior: 'smooth' });
    
    // Simulate analysis process with variable delays
    let step = 1;
    const stepDelays = [4000, 4000, 4000, 4000]; // Different delays for each step
    
    function processNextStep() {
        if (step > 1) {
            document.getElementById(`step${step-1}`).classList.remove('active');
        }
        if (step <= 4) {
            document.getElementById(`step${step}`).classList.add('active');
            setTimeout(processNextStep, stepDelays[step-1]);
            step++;
        } else {
            clearInterval(timerInterval);
            showAnalysisResult(imageId);
        }
    }
    
    setTimeout(processNextStep, stepDelays[0]);
}

function getRandomAIModel() {
    const models = [
        "LeafSense AI v1.0"
    ];
    return models[Math.floor(Math.random() * models.length)];
}

function showAnalysisResult(imageId) {
    const result = diseaseDatabase[imageId];
    const statusClass = result.status === "Healthy" ? "healthy" : "diseased";
    
    analysisSection.innerHTML = `
        <div class="analysis-result">
            <div class="status-badge ${statusClass}">${result.status}</div>
            <h2>${result.name} - ${result.disease}</h2>
            
            <div class="result-grid">
                <div class="result-details">
                    <div class="result-item">
                        <strong>Scientific Name:</strong> ${result.scientificName}
                    </div>
                    <div class="result-item">
                        <strong>Confidence Level:</strong> ${result.confidence}
                    </div>
                    <div class="result-item">
                        <strong>Description:</strong> ${result.description}
                    </div>
                    <div class="result-item">
                        <strong>Symptoms:</strong> ${result.symptoms}
                    </div>
                </div>
                
                <div class="result-visual">
                    <img src="${result.image}" class="result-image" alt="${result.disease}">
                    <div class="confidence-meter">
                        <div class="meter-bar" style="width: ${result.confidence}"></div>
                    </div>
                    <p>Detection Confidence: ${result.confidence}</p>
                </div>
            </div>
        </div>
    `;
    
    // Now show recommendations
    showRecommendations(imageId);
}

function showRecommendations(imageId) {
    const result = diseaseDatabase[imageId];
    const recommendationsSection = document.getElementById('recommendations-section');
    const recommendationsContainer = document.getElementById('recommendations-container');
    const preventionTips = document.getElementById('prevention-content');
    
    // Treatment recommendations
    recommendationsContainer.innerHTML = `
        <div class="recommendation-card">
            <h4><i class="fas fa-prescription-bottle-alt"></i> Immediate Treatment</h4>
            <p>${result.treatment}</p>
        </div>
        <div class="recommendation-card">
            <h4><i class="fas fa-calendar-check"></i> Long-term Care</h4>
            <p>${result.longTermCare || 'Monitor plant health regularly and maintain proper growing conditions.'}</p>
        </div>
        <div class="recommendation-card">
            <h4><i class="fas fa-seedling"></i> Soil Management</h4>
            <p>${result.soilManagement || 'Ensure proper soil pH and nutrient balance for optimal plant health.'}</p>
        </div>
    `;
    
    // Prevention tips
    preventionTips.innerHTML = `
        ${result.prevention.split('. ').map(tip => tip.trim() ? `
        <div class="tip-item">
            <i class="fas fa-lightbulb"></i>
            <div class="tip-content">
                <p>${tip}.</p>
            </div>
        </div>
        ` : '').join('')}
    `;
    
    // Show the recommendations section
    recommendationsSection.style.display = 'block';
    recommendationsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Add to disease database (example for apple_scab)
    if (imageId === 'apple_scab') {
        diseaseDatabase[imageId].longTermCare = "Apply dormant sprays in late winter. Consider planting resistant varieties like 'Liberty' or 'Freedom' apples.";
        diseaseDatabase[imageId].soilManagement = "Maintain soil pH between 6.0-6.5. Add compost to improve soil health and drainage.";
    }
    // Add similar for other plants as needed
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // In a real app, you would upload this to your server for analysis
        // For this demo, we'll randomly select one of our sample results
        const sampleIds = Object.keys(diseaseDatabase);
        const randomSample = sampleIds[Math.floor(Math.random() * sampleIds.length)];
        analyzeSample(randomSample);
    }
}

// Camera access would require HTTPS and user permission
document.getElementById('capture-method').addEventListener('click', function() {
    alert("Camera access would be implemented in a production environment. For this demo, please use the sample images or upload option.");
});