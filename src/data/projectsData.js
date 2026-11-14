
/**
 * Project portfolio data.
 *
 * Each entry represents a project you have actually worked on.
 * Add, remove or edit projects here. No UI changes required.
 */

export const projectCategories = [
  'Artificial Intelligence / Machine Learning',
  'Data Engineering',
  'Data Analytics',
  'Python Development',
  'Others'
]

export const projects = [
  {
    id: 'multimodal-vision-transformer',
    sample: false,
    featured: true,
    title: 'Multimodal Vision Transformer for Respiratory Disease Classification',
    category: 'Artificial Intelligence / Machine Learning',
    status: 'Completed',
    year: '2026',
    problem:
      'Respiratory diseases such as COVID-19, Pneumonia and Tuberculosis require accurate analysis of medical imaging data.',
    solution:
      'Built a dual-branch ViT-B/16 deep learning system integrating CT scan and chest X-ray images for automated respiratory disease classification. Implemented Grad-CAM explainability to visualise and validate clinically relevant diagnostic regions.',
    description:
      'A multimodal deep learning system for respiratory disease classification, evaluated on a 14,700-image dataset.',
    stack: [
      'Deep Learning',
      'Vision Transformer (ViT-B/16)',
      'Computer Vision',
      'Grad-CAM',
      'Medical Imaging',
    ],
    highlights: [
      'Achieved 88% validation accuracy.',
      'Recorded F1 scores between 85% and 91% across four disease classes.',
      'Used a dataset containing 14,700 medical images.',
      'Implemented Grad-CAM for model explainability.',
    ],
    github: 'https://github.com/Smaransai2911/Multimodal-ViT-for-respiratory-disease-classification',
    demo: '',
    image: '',
  },

  {
    id: 'au-chatbot',
    sample: false,
    featured: true,
    title: 'Alliance University Virtual Assistant (AU-ChatBot)',
    category: 'Others',
    status: 'Completed',
    year: '2025',
    problem:
      'Developed a virtual assistant to handle university-related queries across multiple intent categories.',
    solution:
      'Built an NLP-driven REST API backend in Java supporting more than 50 intent categories and over 100 users. Integrated webhook automation and collaborated with senior engineers through Agile sprints.',
    description:
      'An NLP-driven university virtual assistant with REST API integration and webhook automation.',
    stack: [
      'Java',
      'Natural Language Processing',
      'REST API',
      'Webhook Automation',
      'Git',
      'Agile',
    ],
    highlights: [
      'Supported more than 50 intent categories.',
      'Served over 100 users.',
      'Webhook automation reduced resolution time by 60%.',
      'Maintained structured documentation and version-controlled code.',
    ],
    github: 'https://github.com/Smaransai2911/AU-ChatBot',
    demo: '',
    image: '',
  },

  {
    id: 'student-research-agent',
    sample: false,
    featured: true,
    title: 'Student Research Agent',
    category: [
    'Artificial Intelligence / Machine Learning',
    'Python Development',
],
    status: 'Developed',
    year: '2026',
    problem:
      'A student-focused research application developed using AI and large language model integrations.',
    solution:
      'Developed a full-stack AI application with a Python backend, JavaScript/Streamlit user interface and LLM API integrations.',
    description:
      'A full-stack AI application combining a Python backend, an interactive interface and LLM API integrations.',
    stack: [
      'Python',

      'Streamlit',
      'Large Language Models',
      'LLM API Integration',
    ],
    github: 'https://github.com/Smaransai2911/student-research-agent',
    demo: '',
    image: '',
  },

  {
    id: 'financial-time-series-forecasting',
    sample: false,
    featured: true,
    title: 'Financial Time Series Forecasting ML Pipeline',
    category: [
    'Artificial Intelligence / Machine Learning',
  ' Data Analytics',
    ],
    problem:
      'Financial time series forecasting requires systematic data preparation, feature engineering and model evaluation.',
    solution:
      'Built an end-to-end machine learning pipeline using Python for data ingestion, feature engineering, model training and evaluation. Applied systematic model selection and hyperparameter tuning to improve forecasting performance.',
    description:
      'A Python-based machine learning pipeline for financial time series forecasting.',
    stack: [
      'Python',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Machine Learning',
      'Time Series Forecasting',
    ],
    highlights: [
      'Achieved 85% forecasting accuracy.',
      'Reduced RMSE by 25%.',
      'Applied model selection and hyperparameter tuning.',
    ],
    github: '',
    demo: '',
    image: '',
  },
]
