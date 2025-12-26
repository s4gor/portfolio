# Minimalist Developer Portfolio

A clean, high-performance single-page portfolio template built with **Next.js 16**, **Tailwind CSS v4**, and **Framer Motion**.

Featuring a macOS-style dock navigation, custom GitHub contribution timeline, and a blog integration.

## ✨ Features

-   **Single Page Architecture**: Smooth scrolling navigation between sections.
-   **Dock Navigation**: Interactive, macOS-inspired floating dock with magnification effects.
-   **Custom GitHub Timeline**: A branded, dot-matrix visualization of your contribution history (filtered by date).
-   **Blog Integration**: Fetches latest posts from a WordPress/Headless CMS endpoint.
-   **Modern Stack**: Built on the bleeding edge with Next.js 15+ and Tailwind v4.
-   **Fully Responsive**: optimized for mobile, tablet, and desktop.
-   **SEO Optimized**: structured data, metatags, and semantic HTML.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)
-   **Deployment**: Vercel (Recommended)

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or pnpm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Customization

### 1. Personal Information
Edit `app/page.tsx` to update:
-   **Hero Section**: Name, bio, and avatar.
-   **Social Links**: LinkedIn, GitHub, X (Twitter), etc.
-   **Experience**: Your work history.
-   **Tech Stack**: The icons and tools you use.

### 2. GitHub Activity configuration
Open `components/github-activity.tsx` to:
-   Change the `username` prop to your GitHub handle.
-   Adjust the filtered date range in `selectLast6Months` or `transformData`.
-   Update `milestones` array with your own career events.

### 3. Blog Source
The blog currently fetches from a WordPress JSON API. To use your own source, update the `getBlogPosts` function in `app/page.tsx`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [s4gor](https://github.com/s4gor).
