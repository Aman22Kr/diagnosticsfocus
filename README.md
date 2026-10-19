# DiagnosticsFocus 🔬

> A high-fidelity, production-grade diagnostic pathology and preventive health checkup web portal, recreated from the reference website [Apollo Diagnostics](https://apollodiagnostics.in/) and rebranded under **DiagnosticsFocus** for **Aman22kr**.

---

## 🌟 About DiagnosticsFocus

**DiagnosticsFocus** is an all-inclusive clinical diagnostic platform engineered with modern web technologies to deliver laboratory testing services. Built with automated clinical workflows in mind, it provides:

- **3,000+ Pathology Blood & Urine Tests**: Complete Hemogram (CBC), Thyroid Profile (T3/T4/TSH), HPLC HbA1c, Comprehensive Lipid Profile, LFT, KFT with electrolytes, Vitamin D 25-OH, and Vitamin B12.
- **Preventative Health Packages**: Curated multi-organ wellness screenings (Essential, Vital Advanced Full Body, Senior Citizen Geriatric Care, Women Wellness).
- **Free Doorstep Home Sample Collection**: Interactive 4-step scheduling with morning fasting slots, temperature-controlled cold-chain specimen preservation, and barcoded vacutainers.
- **Instant Patient Report Download**: Authentic digital PDF report preview with biological reference intervals, flagged abnormal values, clinical summaries, and Dr. MD Pathologist electronic sign-offs.
- **150+ Lab Locator**: Pathology processing centers and regional reference labs across Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, and Pune.
- **Upload Doctor Prescription**: Effortless upload of handwritten doctor slips for pharmacist review and automatic cart generation.
- **Dedicated Bottom Ad Section**: Elegant sponsored healthcare banner on every page showcasing family health memberships.
- **Blank Video Placeholder**: A pristine square container honoring the requirement: *"If there is an area for a YouTube video link or thumbnail that takes you to YouTube, just put a blank square space there."*

---

## 🚀 Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/) (configured with `HashRouter` for zero-configuration static hosting on GitHub Pages)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom healthcare design system
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Persistence**: Browser `localStorage` with error handling and fallback defaults
- **Deployment**: Static GitHub Pages via GitHub Actions / `gh-pages`

---

## 💾 LocalStorage Persistence Layer

All user actions survive browser refreshes without requiring a remote database backend:

| Storage Key | Content Description |
| :--- | :--- |
| `diagnosticsfocus_cart_v1` | Items added to cart (tests, packages, subtotal, sample types) |
| `diagnosticsfocus_bookings_v1` | Confirmed appointment bookings with reference IDs (e.g. `DF-884920`) |
| `diagnosticsfocus_saved_items_v1` | Bookmarked diagnostic tests |
| `diagnosticsfocus_selected_city_v1` | Active regional hub (Mumbai, Delhi, Bengaluru, etc.) |
| `diagnosticsfocus_prescriptions_v1` | Uploaded prescription history & review status |
| `diagnosticsfocus_search_history_v1` | Recent keyword search queries |
| `diagnosticsfocus_anim_settings_v1` | Configured animation speed (`NORMAL`) and intensity (`STRONG`) |

*Note: LocalStorage is confined strictly to the client's browser session. No real banking secrets or passwords are required or stored.*

---

## 📁 Multi-Page Route Architecture

- `#/` - **Home Page**: Hero showcase, instant test search, 4 Apollo Diagnostics quick actions, featured health packages, popular pathology tests, laboratory tour with blank square video space, patient testimonials, and bottom ad banner.
- `#/tests` - **Diagnostic Tests Catalog**: Full catalog with live search, department filters (Routine, Diabetes, Thyroid, Cardiac, Liver, Kidney, Vitamins), fasting filter, sort by price/popularity.
- `#/tests/:slug` - **Dynamic Test Detail**: In-depth clinical significance, parameter reference intervals, fasting duration, specimen requirements, and booking action.
- `#/packages` - **Health Packages**: Full body checkups with age and gender segmentation.
- `#/packages/:slug` - **Package Detail**: Organ system breakdowns, sub-tests list, pre-test preparation guidelines.
- `#/home-collection` - **Home Sample Collection Booking**: 4-step wizard with slot selection and instant booking confirmation.
- `#/download-reports` - **Download Patient Reports**: Instant lookup by mobile number (`9876543210`) or booking ID (`DF-884920`), rendering a printable digital report.
- `#/locate-lab` - **Pathology Center Locator**: Interactive filtering by city, locality, and pincode.
- `#/upload-prescription` - **Upload Prescription**: Drag-and-drop prescription document upload with callback request.
- `#/about` - **About Us**: Clinical heritage, NABL & CAP quality accreditations, automated analyzer fleet.
- `#/contact` - **Contact Us**: 24x7 toll-free helpline (`1800-425-0777`), central laboratory address, and validated inquiry form.
- `#/faq` - **Frequently Asked Questions**: Categorized accordion FAQs.
- `#/cart` - **Test Cart & Checkout**: Coupon codes (`FOCUS10`, `HEALTH20`), cost breakdown, and checkout.
- `*` - **Custom 404 Page**: Recovery links to explore tests, packages, or home.

---

## 🛠️ Local Development & Build Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Generates production-optimized static assets in `./dist`.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 🚢 GitHub Pages Deployment Guide

### Method A: Automated GitHub Actions (Recommended)

1. Push this repository to GitHub under username `Aman22kr`:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of DiagnosticsFocus healthcare portal"
   git branch -M main
   git remote add origin https://github.com/Aman22kr/DiagnosticsFocus.git
   git push -u origin main
   ```
2. In your GitHub repository settings:
   - Navigate to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
3. The `.github/workflows/deploy.yml` workflow will automatically build and publish the site.

### Method B: Manual Deployment via `gh-pages`

1. Run the deploy script:
   ```bash
   npm run deploy
   ```
2. In your GitHub repository:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Source**, select **Deploy from a branch** and choose `gh-pages` / `(root)`.

---

## 👤 Author & Attribution

- **Reference Website**: [Apollo Diagnostics](https://apollodiagnostics.in/)
- **Recreated Brand**: **DiagnosticsFocus**
- **GitHub Owner**: [Aman22kr](https://github.com/Aman22kr)
