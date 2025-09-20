# ArchiSketch

Welcome to **ArchiSketch**, an intelligent, AI-powered platform for designing, visualizing, and collaborating on architecture diagrams. Built with Next.js, Genkit, and ShadCN UI, ArchiSketch provides a seamless and interactive experience for creating diagrams for AI, cloud, development, and security projects.

## Features

- **Interactive Editor**: A powerful and intuitive editor with an infinity canvas, drag-and-drop components, and smart guides.
- **AI Assistant**: A built-in chatbot powered by Gemini to help you generate, modify, and get suggestions for your diagrams.
- **Component Library**: A rich library of components for various architectural domains, including AI/ML, Cloud, Development, and Security.
- **Real-time Collaboration**: A dedicated chat window for diagram-specific conversations and real-time collaboration.
- **Project Dashboard**: An overview of your recent diagrams, project activity, and analytics.
- **Template Gallery**: A collection of pre-built diagram templates to kickstart your designs.
- **Dark Mode**: A beautiful dark mode theme for a comfortable viewing experience.

## Getting Started

Follow these steps to get your local development environment set up and running.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/archisketch.git
    cd archisketch
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of your project and add your Gemini API key:

    ```env
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```

    You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## Code of Conduct

Please review our [Code of Conduct](CODE_OF_CONDUCT.md) to understand our community standards.

## Security

If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md) to report it.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
