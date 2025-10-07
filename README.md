# Stone Admin Panel

A comprehensive Next.js admin panel built with Ant Design for managing stones, products, posts, banners, and system configurations.

## Features

### 🔐 Authentication System
- **Login/Logout**: Secure authentication with JWT tokens
- **Role-based Access**: Admin and User roles with different permissions
- **Route Protection**: Protected routes and components based on permissions
- **Session Management**: Automatic token refresh and session persistence
- **Password Management**: Change password functionality
- **Demo Accounts**: Pre-configured accounts for testing different roles

### 🏗️ Admin Layout
- Responsive sidebar navigation
- Collapsible menu
- User profile dropdown
- Modern and clean design

### 📦 Product Management
- Full CRUD operations for products
- Product categories and status management
- Stock tracking
- Image upload support
- Advanced filtering and sorting

### 📝 Post Management
- Blog post creation and editing
- Rich content management
- Category and tag system
- Publishing workflow (draft, published, archived)
- Featured posts support
- Author management

### 🎨 Banner Management
- Dynamic banner system
- Multiple position support (header, sidebar, footer, popup, inline)
- Scheduling functionality
- Performance tracking (clicks, impressions, CTR)
- Target audience segmentation
- Priority-based ordering

### 🪨 Stone Management
- Comprehensive stone catalog
- Technical specifications tracking
- Multiple stone types (natural, engineered, composite)
- Categories (marble, granite, limestone, etc.)
- Pricing and inventory management
- Supplier information
- Rating system
- Application tracking

### ⚙️ Configuration Management
- Multi-type configuration system:
  - **String**: Text inputs
  - **Number**: Numeric values
  - **Boolean**: Toggle switches
  - **Image**: File uploads
  - **Color**: Color picker
  - **Textarea**: Multi-line text
  - **Select**: Dropdown options
  - **Slider**: Range inputs
  - **Date/Time**: Date and time pickers
  - **JSON**: Code editor for complex configs
- Organized in tabs (General, Appearance, Business, Advanced)
- Real-time preview and validation

### 📊 Dashboard
- Key performance indicators
- Statistics overview
- Quick action cards
- Visual progress indicators
- Real-time data updates

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: Ant Design (antd)
- **Language**: TypeScript
- **Styling**: CSS-in-JS with Ant Design theming
- **Icons**: Ant Design Icons
- **Date Handling**: Day.js
- **State Management**: React hooks and local state

## Project Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── page.tsx            # Dashboard
│   │   ├── products/           # Product management
│   │   ├── posts/              # Post management
│   │   ├── banners/            # Banner management
│   │   ├── stones/             # Stone management
│   │   └── config/             # Configuration management
│   ├── layout.tsx              # Root layout with Ant Design
│   └── page.tsx                # Home page (redirects to admin)
├── lib/
│   ├── api.ts                  # API simulation layer
│   ├── mockData.ts             # Mock data for development
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Utility functions
└── components/                 # Reusable components (future expansion)
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stone-admin-panel
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will automatically redirect to the admin panel at `/admin`.

### Demo Credentials

The application includes pre-configured demo accounts for testing different roles:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | admin@stonesolutions.com | admin123 | Full access to all features |
| **Manager** | manager@stonesolutions.com | manager123 | Products, posts, and stones management |
| **Editor** | editor@stonesolutions.com | editor123 | Limited to posts and banners |

You can use these credentials to test the authentication system and role-based access control.

## Features in Detail

### Product Management
- **CRUD Operations**: Create, read, update, and delete products
- **Categories**: Organize products by categories (Stones, Garden, Decoration, Tools)
- **Status Management**: Active/Inactive status with visual indicators
- **Stock Tracking**: Monitor inventory levels with color-coded alerts
- **Image Support**: Upload and manage product images
- **Advanced Filtering**: Filter by category, status, and stock levels
- **Sorting**: Sort by name, price, stock, and creation date

### Post Management
- **Rich Content**: Full-featured blog post editor
- **Publishing Workflow**: Draft → Published → Archived states
- **Categorization**: Organize posts by categories
- **Tagging System**: Add multiple tags for better organization
- **Featured Posts**: Highlight important content
- **Author Management**: Track post authors
- **Scheduling**: Set publish dates for posts
- **SEO-Friendly**: Excerpt and meta information support

### Banner Management
- **Multiple Positions**: Header, sidebar, footer, popup, and inline banners
- **Scheduling**: Set start and end dates for campaigns
- **Performance Analytics**: Track clicks, impressions, and CTR
- **Target Audiences**: Segment banners for specific user groups
- **Priority System**: Control banner display order
- **Status Management**: Active, inactive, and scheduled states

### Stone Management
- **Comprehensive Catalog**: Detailed stone information database
- **Technical Specs**: Density, compressive strength, water absorption, thermal conductivity
- **Multiple Types**: Natural, engineered, and composite stones
- **Categories**: Marble, granite, limestone, sandstone, slate, quartzite, travertine
- **Pricing**: Per square foot pricing with thickness specifications
- **Supplier Management**: Track stone suppliers and origins
- **Application Tracking**: Record suitable applications for each stone
- **Rating System**: Customer rating integration
- **Inventory Management**: Stock levels and minimum order quantities

### Configuration Management
- **Multi-Type Support**: Handle various data types with appropriate UI controls
- **Organized Tabs**: Logical grouping of configuration options
- **Real-Time Updates**: Immediate feedback on configuration changes
- **Validation**: Built-in validation for different input types
- **Description Support**: Helpful descriptions for each configuration option

## API Integration

The application includes a complete API simulation layer that can be easily replaced with real backend endpoints. The API layer provides:

- **Consistent Response Format**: Standardized API responses
- **Error Handling**: Proper error states and messages
- **Loading States**: Simulated network delays for realistic UX
- **CRUD Operations**: Full create, read, update, delete support
- **Type Safety**: Full TypeScript support for all API calls

## Customization

### Theming
The application uses Ant Design's theming system. You can customize the theme in `src/app/layout.tsx`:

```tsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
    },
  }}
>
```

### Adding New Modules
To add a new management module:

1. Create a new page in `src/app/admin/[module]/page.tsx`
2. Add the route to the sidebar navigation in `src/app/admin/layout.tsx`
3. Create corresponding types in `src/lib/types.ts`
4. Add mock data in `src/lib/mockData.ts`
5. Implement API functions in `src/lib/api.ts`

## Development Notes

- **Mock Data**: All data is currently mocked for development purposes
- **File Uploads**: Upload functionality is simulated - integrate with your preferred storage solution
- **Authentication**: No authentication is implemented - add your preferred auth solution
- **Database**: No database integration - replace mock data with real database calls
- **Responsive Design**: All components are mobile-responsive using Ant Design's grid system

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Real database integration
- [ ] File upload to cloud storage
- [ ] Advanced analytics and reporting
- [ ] Email notification system
- [ ] Multi-language support
- [ ] Advanced search and filtering
- [ ] Bulk operations
- [ ] Data export functionality
- [ ] Activity logging and audit trails

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

Built with ❤️ using Next.js and Ant Design