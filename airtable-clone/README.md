# Airtable Clone - T3 Stack

A full-featured Airtable clone built with the T3 Stack, featuring infinite scrolling, optimistic updates, and real-time collaboration capabilities.

## Features

- 🚀 **T3 Stack**: Built with Next.js, tRPC, Tailwind CSS, and TypeScript
- 🔐 **Authentication**: BetterAuth for secure user authentication
- 📊 **Database**: PostgreSQL with Drizzle ORM
- 📝 **Table Management**: Create, edit, and delete tables
- 📋 **Column Management**: Add and remove columns with various types
- 📝 **Row Management**: Add, edit, and delete rows
- 🔄 **Optimistic Updates**: Instant UI updates with background synchronization
- 📜 **Infinite Scrolling**: Efficiently load large datasets
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16
- **Language**: JavaScript (ES Modules)
- **Authentication**: BetterAuth
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **API**: tRPC
- **Styling**: Tailwind CSS
- **State Management**: React Query

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/airtable_clone
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

3. Run database migrations:

```bash
npx drizzle-kit migrate
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Creating an Account

1. Click "Sign up" to create a new account
2. Fill in your email and password
3. Click "Sign up" to create your account

### Creating a Table

1. Log in to your account
2. Click "+ Create Table" on the dashboard
3. Enter a table name and optional description
4. Click "Create Table"

### Managing Columns

1. Open a table
2. Click "+ Add Column" to add a new column
3. Enter a column name and select a type
4. Click "Add Column"
5. To delete a column, click the "×" button in the column header

### Managing Rows

1. Open a table
2. Click "+ Add Row" to add a new row
3. Click on any cell to edit its value
4. To delete a row, click the "Delete" button in the actions column

### Infinite Scrolling

The table automatically loads more rows as you scroll down, providing a seamless experience even with large datasets.

### Optimistic Updates

Cell updates are instantly reflected in the UI while being synchronized with the server in the background, providing a smooth user experience.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user
- `POST /api/auth/logout` - Log out a user

### Tables

- `mutation table.create` - Create a new table
- `query table.list` - Get all tables for the current user
- `query table.get` - Get a specific table with columns and rows
- `mutation table.addColumn` - Add a new column to a table
- `mutation table.deleteColumn` - Delete a column from a table
- `mutation table.addRow` - Add a new row to a table
- `mutation table.deleteRow` - Delete a row from a table
- `mutation table.updateCell` - Update a cell value

## Database Schema

### Users

- `id` (UUID, Primary Key)
- `email` (Text, Unique)
- `password` (Text)
- `name` (Text)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Tables

- `id` (UUID, Primary Key)
- `name` (Text)
- `description` (Text)
- `userId` (UUID, Foreign Key to Users)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Columns

- `id` (UUID, Primary Key)
- `tableId` (UUID, Foreign Key to Tables)
- `name` (Text)
- `type` (Text)
- `position` (Integer)
- `isRequired` (Boolean)
- `defaultValue` (Text)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Rows

- `id` (UUID, Primary Key)
- `tableId` (UUID, Foreign Key to Tables)
- `order` (Integer)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Cell Values

- `id` (UUID, Primary Key)
- `rowId` (UUID, Foreign Key to Rows)
- `columnId` (UUID, Foreign Key to Columns)
- `value` (JSONB)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [T3 Stack](https://create.t3.gg/)
- [Airtable](https://airtable.com/)
- [BetterAuth](https://better-auth.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com/)
- [tRPC](https://trpc.io/)