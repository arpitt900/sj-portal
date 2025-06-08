# Shreeji Jewels Management Portal

A comprehensive jewelry business management system built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Karigar Management**: Track artisans, orders, and material distribution
- **Client Management**: Customer database with purchase history and preferences
- **Inventory Management**: Real-time stock tracking with QR codes
- **Transaction Management**: Complete financial transaction tracking
- **Harvest Plans**: Gold savings scheme management
- **Analytics Dashboard**: Business insights and performance metrics
- **AI Console**: Intelligent business assistance

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deployment**: Vercel
- **Icons**: Lucide React

## Quick Start

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd shreeji-jewels-portal
npm install
\`\`\`

### 2. Environment Setup

Create a `.env.local` file in the root directory:

\`\`\`env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 3. Database Setup

Run the SQL scripts in your Supabase SQL editor:

1. Execute `scripts/create-tables.sql` to create the database schema
2. Execute `scripts/seed-tables.sql` to populate with sample data

### 4. Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment on Vercel

### 1. Connect to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Vercel will automatically detect it's a Next.js project

### 2. Environment Variables

In your Vercel project settings, add these environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Deploy

Vercel will automatically deploy your application. Each push to your main branch will trigger a new deployment.

## Database Schema

The application uses the following main tables:

- `karigars` - Artisan information and balances
- `karigar_orders` - Work orders and tracking
- `clients` - Customer database
- `inventory` - Stock management
- `transactions` - Financial records
- `harvest_plans` - Gold savings schemes

## Features Overview

### Karigar Management
- Track artisan work orders and delivery schedules
- Material issuing (gold/diamonds) with real-time balance tracking
- Performance analytics and rating system
- Real-time order status updates

### Client Management
- Comprehensive customer profiles with purchase history
- Birthday and anniversary tracking for marketing
- VIP status and loyalty program management
- Size preferences and custom requirements

### Inventory Management
- QR code-based item tracking
- Real-time stock valuation
- Category-wise organization
- Location tracking within store

### Transaction Management
- Complete financial transaction recording
- Multiple payment method support
- Automated accounting entries
- Monthly/yearly financial reports

### Analytics Dashboard
- Business performance metrics
- Sales trends and forecasting
- Inventory turnover analysis
- Customer behavior insights

## API Routes

The application includes several API routes for data management:

- `/api/karigars` - Karigar CRUD operations
- `/api/orders` - Order management
- `/api/clients` - Client management
- `/api/inventory` - Stock operations
- `/api/transactions` - Financial records

## Real-time Features

Using Supabase's real-time capabilities:

- Live order status updates
- Inventory level notifications
- Transaction confirmations
- Multi-user collaboration

## Security

- Row Level Security (RLS) enabled on all Supabase tables
- Environment variables for sensitive data
- Secure API routes with proper authentication
- Data validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support and questions, please contact the development team or create an issue in the repository.

## License

This project is proprietary software for Shreeji Jewels.
\`\`\`

Let's create a deployment script to help with Vercel setup:
