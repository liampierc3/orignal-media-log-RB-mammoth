# Video Production Tracking App Template

A Next.js application template for tracking video production projects, including athlete content, shooters, editors, and project status. This template uses local state management and can be easily adapted to use any database solution.

## Features

- Track video projects with detailed information
- Filter and search functionality
- Statistics dashboard
- Shooter and editor workload tracking
- Athlete content management
- Export to CSV
- Ready to integrate with your preferred database

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/data` - Static data files (e.g., athlete list)
- `/types` - TypeScript type definitions
- `/public` - Static assets
- `/styles` - Global styles and Tailwind configuration

## Customization

### Adding Athletes

Update the `data/athletes.ts` file with your list of athletes:

```typescript
export const athletes = [
  "Athlete Name 1",
  "Athlete Name 2",
  // Add more athletes...
]
```

### Adding Database Integration

This template uses local state management by default, making it easy to add your preferred database solution. To add database integration:

1. Install your database client (e.g., Supabase, Firebase, Prisma, etc.)
2. Create a configuration file in the `lib` directory
3. Modify the data fetching and mutation functions in `app/page.tsx`:
   - `addNewEntry`
   - `deleteEntry`
   - `updateEntry`
   - `updateVideoLink`

### Customizing Shooters and Editors

Modify the shooter and editor options in `app/page.tsx` to match your team:

```typescript
// Example shooter options
<SelectContent>
  <SelectItem value="Shooter 1">Shooter 1</SelectItem>
  <SelectItem value="Shooter 2">Shooter 2</SelectItem>
  // Add more shooters...
</SelectContent>

// Example editor options
<SelectContent>
  <SelectItem value="Editor 1">Editor 1</SelectItem>
  <SelectItem value="Editor 2">Editor 2</SelectItem>
  // Add more editors...
</SelectContent>
```

## License

MIT License - Feel free to use this template for your own projects. 