# CreditLend Pro Frontend 🏦

CreditLend Pro is a modern frontend application designed to streamline the loan application process for both borrowers and administrators. It provides a user-friendly interface for submitting loan applications, managing beneficiary data, and generating insightful analytics. This project aims to simplify lending workflows and improve overall efficiency.

## 🚀 Key Features

- **Intuitive Borrower Portal:** A multi-step form guides borrowers through the application process, allowing them to easily submit personal information and required documents.
- **Comprehensive Admin Dashboard:** Provides administrators with a centralized view of beneficiary data, analytics, and filtering options.
- **Detailed Beneficiary View:** Allows administrators to access detailed information about each beneficiary, including their profile, documents, credit score breakdown, and risk assessment.
- **Secure Admin/Partner Login:** A dedicated login page for administrators and partners, ensuring secure access to sensitive data.
- **Dynamic Routing:** Uses React Router to manage navigation between different pages, providing a seamless user experience.
- **Global Error Handling:** Implements an `ErrorBoundary` component to catch and handle errors gracefully.
- **SEO Optimization:** Utilizes `react-helmet` to manage document head elements for improved search engine visibility.
- **Tailwind CSS Styling:** Leverages Tailwind CSS for consistent and responsive styling throughout the application.
- **Environment Variable Configuration:** Uses `.env` file to manage environment-specific settings and API keys securely.

## 🛠️ Tech Stack

- **Frontend:**
    - React
    - React Router DOM
    - Radix UI
    - Class Variance Authority (cva)
    - clsx
    - Framer Motion
    - Lucide React
    - React Helmet
    - Recharts
    - Tailwind Merge
- **Build Tool:**
    - Vite
- **Styling:**
    - Tailwind CSS
- **Other:**
    - JavaScript (ES6+)
    - .env (Environment Variables)

## 📦 Getting Started

Follow these instructions to set up and run the frontend application locally.

### Prerequisites

- Node.js (version 16 or higher)
- npm or Yarn package manager

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository_url>
    cd Frontend
    ```

2.  Install dependencies using npm:

    ```bash
    npm install
    ```

    Or, if you prefer Yarn:

    ```bash
    yarn install
    ```

3.  Create a `.env` file in the root directory of the `Frontend` folder and populate it with the necessary environment variables. Example:

    ```
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_OPENAI_API_KEY=your_openai_api_key
    VITE_GEMINI_API_KEY=your_gemini_api_key
    VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
    VITE_GOOGLE_ANALYTICS_ID=your_google_analytics_id
    VITE_ADSENSE_ID=your_adsense_id
    VITE_PERPLEXITY_API_KEY=your_perplexity_api_key
    VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    ```

    **Note:** Replace the placeholder values with your actual API keys and project URLs.

### Running Locally

1.  Start the development server:

    ```bash
    npm run dev
    ```

    Or, if you are using Yarn:

    ```bash
    yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:4028` (or the port specified in your `vite.config.js` file).

## 📂 Project Structure

```
Frontend/
├── .env                      # Environment variables
├── .gitignore                # Specifies intentionally untracked files that Git should ignore
├── package.json              # Project metadata and dependencies
├── public/                   # Public assets (e.g., images, fonts)
├── src/                      # Source code
│   ├── App.jsx               # Main application component
│   ├── Index.jsx             # Entry point for the application
│   ├── Routes.jsx            # Defines application routes
│   ├── components/           # Reusable components
│   │   ├── AppIcon.jsx       # Custom icon component
│   │   ├── ErrorBoundary.jsx # Error boundary component
│   │   ├── ScrollToTop.jsx   # Component to scroll to top on route change
│   │   └── ui/             # UI components
│   │       ├── AdminSidebar.jsx # Admin sidebar component
│   │       ├── BreadcrumbTrail.jsx # Breadcrumb component
│   │       ├── Button.jsx      # Custom button component
│   │       ├── Input.jsx       # Custom input component
│   │       └── UserProfileDropdown.jsx # User profile dropdown component
│   ├── pages/                # Page components
│   │   ├── admin-dashboard/  # Admin dashboard page
│   │   │   ├── components/   # Components specific to admin dashboard
│   │   │   │   ├── AnalyticsCharts.jsx # Analytics charts component
│   │   │   │   ├── BeneficiaryTable.jsx # Beneficiary table component
│   │   │   │   ├── FilterControls.jsx # Filter controls component
│   │   │   │   └── MetricsCard.jsx # Metrics card component
│   │   │   └── index.jsx     # Admin dashboard main component
│   │   ├── admin-partner-login/ # Admin/partner login page
│   │   │   ├── components/   # Components specific to admin/partner login
│   │   │   │   ├── LoginHeader.jsx # Login header component
│   │   │   │   ├── LoginForm.jsx # Login form component
│   │   │   │   └── TrustSignals.jsx # Trust signals component
│   │   │   └── index.jsx     # Admin/partner login main component
│   │   ├── beneficiary-detail-view/ # Beneficiary detail view page
│   │   │   ├── components/   # Components specific to beneficiary detail view
│   │   │   │   ├── ActionPanel.jsx # Action panel component
│   │   │   │   ├── BeneficiaryProfile.jsx # Beneficiary profile component
│   │   │   │   ├── DocumentViewer.jsx # Document viewer component
│   │   │   │   ├── PaymentBehaviorChart.jsx # Payment behavior chart component
│   │   │   │   ├── RiskAssessment.jsx # Risk assessment component
│   │   │   │   └── ScoreBreakdown.jsx # Score breakdown component
│   │   │   └── index.jsx     # Beneficiary detail view main component
│   │   ├── borrower-portal/  # Borrower portal page
│   │   │   ├── components/   # Components specific to borrower portal
│   │   │   │   ├── DocumentCategorySection.jsx # Document category section component
│   │   │   │   ├── ProgressStepper.jsx # Progress stepper component
│   │   │   │   ├── StepNavigation.jsx # Step navigation component
│   │   │   │   └── VerificationStatusPanel.jsx # Verification status panel component
│   │   │   └── index.jsx     # Borrower portal main component
│   │   ├── landing-page/     # Landing page
│   │   │   ├── components/   # Components specific to landing page
│   │   │   │   ├── FeatureCards.jsx # Feature cards component
│   │   │   │   ├── FooterSection.jsx # Footer section component
│   │   │   │   ├── HeroSection.jsx # Hero section component
│   │   │   │   └── TestimonialsSection.jsx # Testimonials section component
│   │   │   └── index.jsx     # Landing page main component
│   │   └── NotFound.jsx      # Not found (404) page
│   ├── styles/               # Stylesheets
│   │   ├── index.css         # Global styles
│   │   └── tailwind.css      # Tailwind CSS styles
│   └── utils/                # Utility functions
│       └── cn.js             # Utility function for class name merging
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.js          # Vite configuration file
```


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main branch of the original repository.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

If you have any questions or suggestions, feel free to contact us at sihscouts@gmail.com.

## 💖 Thanks Message

Thank you for checking out CreditLend Pro! We appreciate your interest and contributions.

