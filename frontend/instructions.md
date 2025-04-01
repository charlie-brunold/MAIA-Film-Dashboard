# MAIA Film Dashboard Setup Instructions

## Initial Setup

1. Navigate to the frontend directory:
```bash
cd /Users/charliebrunold/Documents/GitHub/MAIA-Film-Dashboard/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## Troubleshooting

If you encounter any errors during installation or startup:

### Missing Dependencies

If you see errors about missing dependencies like 'critters', run:
```bash
npm install critters
```

### Hydration Errors

If you see hydration mismatch errors in the console, this is normal during the first render and should resolve when the page fully loads. We've implemented a client-side mounting strategy to address these issues.

### Build Issues

If you encounter build issues, try cleaning the Next.js cache:
```bash
rm -rf .next
npm run dev
```

## Project Structure

- `src/app`: App Router directory 
- `src/context`: React context for state management
- `src/components`: Reusable UI components
