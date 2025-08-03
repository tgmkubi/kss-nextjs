# Design Document

## Overview

Bu tasarım, mevcut login formunu shadcn/ui kütüphanesinin react-hook-form entegrasyonu ile modernize etmeyi amaçlar. Mevcut form basit HTML form elementleri ve useActionState kullanırken, yeni tasarım react-hook-form, zod validasyon ve shadcn/ui bileşenlerini kullanarak daha iyi kullanıcı deneyimi sağlayacak.

## Architecture

### Current Architecture
- **Form State Management**: React'ın useActionState hook'u
- **Validation**: HTML5 native validation (required, minLength)
- **UI Components**: Custom styled HTML elements
- **Error Handling**: Server-side error messages
- **Submission**: Server Actions ile form submission

### New Architecture
- **Form State Management**: react-hook-form useForm hook'u
- **Validation**: Zod schema ile client-side validation
- **UI Components**: shadcn/ui Form, FormField, FormItem, FormLabel, FormControl, FormMessage
- **Error Handling**: Real-time client-side validation + server-side errors
- **Submission**: react-hook-form ile form handling, mevcut handleSignIn server action korunacak

## Components and Interfaces

### 1. LoginForm Component
```typescript
interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  // Mevcut props korunacak, ek prop gerekmeyebilir
}
```

### 2. Form Schema (Zod)
```typescript
const loginSchema = z.object({
  email: z.string().email("Geçerli bir email adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır")
});
```

### 3. shadcn/ui Components
- **Form**: Ana form wrapper
- **FormField**: Her input alanı için
- **FormItem**: Form item container
- **FormLabel**: Label component
- **FormControl**: Input control wrapper
- **FormMessage**: Error message display
- **Input**: shadcn/ui Input component
- **Button**: Mevcut shadcn/ui Button component

## Data Models

### Form State
```typescript
type LoginFormState = {
  email: string;
  password: string;
  isSubmitting: boolean;
  errors: {
    email?: string;
    password?: string;
    root?: string; // Server errors
  };
}
```

### Validation Schema
```typescript
const loginValidationSchema = z.object({
  email: z
    .string()
    .min(1, "Email gereklidir")
    .email("Geçerli bir email adresi giriniz"),
  password: z
    .string()
    .min(1, "Şifre gereklidir")
    .min(6, "Şifre en az 6 karakter olmalıdır")
});
```

## Error Handling

### Client-Side Validation
- **Real-time validation**: onChange ve onBlur events
- **Zod schema validation**: Type-safe validation rules
- **Field-level errors**: Her alan için ayrı error messages
- **Form-level errors**: Genel form hataları

### Server-Side Error Integration
- **Existing handleSignIn**: Mevcut server action korunacak
- **Error mapping**: Server errors'ı form state'e mapping
- **Error display**: FormMessage component ile error gösterimi

### Error States
1. **Validation Errors**: Client-side zod validation
2. **Network Errors**: Connection issues
3. **Authentication Errors**: Invalid credentials
4. **Server Errors**: Backend errors

## Testing Strategy

### Unit Tests
- **Form validation**: Zod schema testing
- **Component rendering**: React Testing Library
- **User interactions**: Form submission, input changes
- **Error handling**: Error state testing

### Integration Tests
- **Form submission flow**: End-to-end form submission
- **Authentication integration**: handleSignIn integration
- **Error scenarios**: Various error conditions
- **Accessibility**: Screen reader compatibility

### Test Cases
1. **Valid form submission**: Successful login flow
2. **Invalid email format**: Email validation error
3. **Short password**: Password length validation
4. **Empty fields**: Required field validation
5. **Server errors**: Authentication failure handling
6. **Loading states**: Form submission states

## Implementation Details

### Dependencies
Gerekli yeni dependencies:
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Zod resolver için
- `zod`: Validation schema (zaten mevcut)

### File Structure
```
src/ui/auth/
├── login-form.tsx (güncellenecek)
└── login-form-schema.ts (yeni)
```

### Key Features
1. **Real-time Validation**: Kullanıcı yazarken anlık feedback
2. **Better UX**: Loading states, disabled states
3. **Accessibility**: Proper ARIA labels, screen reader support
4. **Type Safety**: TypeScript ile tam type safety
5. **Consistent Styling**: shadcn/ui design system

### Migration Strategy
1. **Backward Compatibility**: Mevcut authentication flow korunacak
2. **Progressive Enhancement**: Aşamalı geçiş
3. **Error Handling**: Mevcut error handling genişletilecek
4. **Styling**: Mevcut tasarım dili korunacak

## Visual Design

### Layout
- **Container**: Mevcut rounded-lg bg-gray-50 container korunacak
- **Form Fields**: shadcn/ui Input components
- **Spacing**: Consistent spacing with shadcn/ui
- **Typography**: Mevcut lusitana font korunacak

### Interactive States
- **Focus States**: shadcn/ui focus ring styles
- **Error States**: Red border ve error messages
- **Loading States**: Disabled button with spinner
- **Success States**: Smooth transitions

### Responsive Design
- **Mobile First**: Mobile-friendly form layout
- **Touch Targets**: Adequate touch target sizes
- **Keyboard Navigation**: Full keyboard accessibility