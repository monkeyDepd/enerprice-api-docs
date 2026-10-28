# EnerPrice Data API Documentation

## Tech Stack

- **Frontend**: React 19, TypeScript (optional)
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build**: Create React App with Craco
- **Deployment**: GitHub Pages, Netlify, Vercel, Firebase

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Git

##  Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/enerPrice-api-docs.git
cd enerPrice-api-docs
```

### 2. Install Dependencies

```bash
cd frontend
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
npm start
# or
yarn start
```

Visit `http://localhost:3000` to see the documentation in action!

## Where the content lives

All page content is in `frontend/src/content/`. `App.js` renders it and holds no copy.

| File | What it holds |
|---|---|
| `content/index.js` | Sidebar groups, and which pages switch with the address toggle |
| `content/v1/downloads.js` | Dataset pages on the new `/api/v1` addresses |
| `content/v1/pricing.js` | Fair Market Pricing on the new addresses, single and batch |
| `content/v1/savings.js` | Comparative Savings on the new addresses, JSON and file upload |
| `content/legacy.js` | The product pages for the old addresses, unchanged from before the move |
| `content/guides.js` | Shared pages: Home, Migration guide, Deprecation policy, Changelog, Response headers, Notebook |
| `content/errors.js` | The Errors page |
| `content/migration.js` | Deprecation and sunset dates, and the old-to-new address map |
| `content/samples.js`, `content/batch.js` | Builders that write the Python, JavaScript, Ruby and cURL samples |

The address toggle at the top of the page switches the product pages between `v1` and `legacy`. Every other page stays the same. Links take the form `#/v1/<section>` or `#/legacy/<section>`, and each endpoint card has its own anchor.

To change the deprecation or sunset date, edit `content/migration.js`. Every page reads the dates from there.

The notebooks are `frontend/notebooks/demo.ipynb` (new addresses) and `demo_legacy.ipynb` (old addresses).

## Available Scripts

In the `frontend` directory:

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm run deploy:netlify` - Build for Netlify
- `npm run deploy:vercel` - Deploy to Vercel
- `npm run deploy:firebase` - Deploy to Firebase
- `npm run analyze` - Analyze bundle size
- `npm run serve` - Serve production build locally

##  Theme Customization

### Dark/Light Theme

The app supports both dark and light themes. Default is dark theme (black background). Users can toggle between themes using the theme switcher in the navigation.

### Custom Colors

Modify `tailwind.config.js` to customize the color scheme:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#your-primary-color',
          foreground: '#your-text-color',
        },
      }
    }
  }
}
```
