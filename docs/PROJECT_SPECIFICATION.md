# Scripters™ — Project Specification

---

## 🎯 Brand Identity

**Scripters™** — Premium digital marketplace for crypto tools, e-books, scripts, themes, plugins, templates, audio, video, and digital art.

### Contact & Support
| Channel | Link |
|---------|------|
| 🌐 Website | [scripters.shop](https://scripters.shop) |
| 📩 Telegram | [@LikhonDev](https://t.me/LikhonDev) |
| 💬 Community | [t.me/ScriptsChats](https://t.me/ScriptsChats) |
| 📱 WhatsApp | [+1 820-823-1206](https://wa.me/18208231206) |

### Trust & Safety
- 🛡️ Escrow system via Atlos for secure crypto payments
- ✅ Verified vendors with KYC
- ⭐ Premium users get priority support
- ⚠️ We do not support deals from other platforms

---

## 📁 Repository Structure

```
scripters/
├── .github/workflows/
│   ├── ci.yml
│   └── cd.yml
├── apps/web/                    # Next.js 14 App Router
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── reset-password/page.tsx
│   │   ├── (shop)/
│   │   │   ├── page.tsx
│   │   │   ├── products/
│   │   │   ├── cart/page.tsx
│   │   │   └── checkout/page.tsx
│   │   ├── (vendor)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── products/
│   │   │   ├── orders/page.tsx
│   │   │   └── analytics/page.tsx
│   │   ├── (admin)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   ├── vendors/page.tsx
│   │   │   └── payouts/page.tsx
│   │   ├── (user)/
│   │   │   ├── profile/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   └── downloads/page.tsx
│   │   ├── blog/
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── products/route.ts
│   │       ├── orders/route.ts
│   │       ├── cart/route.ts
│   │       ├── downloads/route.ts
│   │       └── webhooks/
│   │           ├── stripe/route.ts
│   │           └── atlos/route.ts
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── product/
│   │   ├── cart/
│   │   └── checkout/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── stripe.ts
│   │   ├── atlos.ts
│   │   ├── s3.ts
│   │   ├── redis.ts
│   │   └── validators.ts
│   └── hooks/
├── packages/
│   ├── ui/
│   └── utils/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   └── .well-known/verification.txt
├── .env.example
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.x |
| **UI** | Material UI 5.x + Tailwind CSS |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma 5.x |
| **Auth** | NextAuth.js 5 / Stack Auth |
| **Payments** | Stripe + Atlos (Crypto) |
| **Storage** | AWS S3 / Cloudflare R2 |
| **Cache** | Upstash Redis |
| **Email** | Resend |
| **CDN** | Cloudflare |
| **Monitoring** | Checkly + Sentry |
| **Deploy** | Vercel |

---

## 🔐 Environment Variables

> ⚠️ **SECURITY**: Never commit real credentials. Use `.env.local` locally and Vercel Environment Variables in production. Refer to `.env.example` for a complete list of required variables.


---

## 🗄️ Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_URL_UNPOOLED")
}

// ==================== AUTH ====================
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  hashedPass    String?
  image         String?
  role          UserRole  @default(CUSTOMER)
  emailVerified DateTime?
  resetToken    String?
  resetExpires  DateTime?

  vendor        Vendor?
  orders        Order[]
  reviews       Review[]
  cart          CartItem[]
  downloads     Download[]
  sessions      Session[]
  accounts      Account[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum UserRole { ADMIN VENDOR CUSTOMER }

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

// ==================== VENDOR ====================
model Vendor {
  id             String    @id @default(cuid())
  userId         String    @unique
  user           User      @relation(fields: [userId], references: [id])
  storeName      String
  slug           String    @unique
  description    String?   @db.Text
  logo           String?
  banner         String?
  verified       Boolean   @default(false)
  kycStatus      KycStatus @default(PENDING)
  commissionRate Float     @default(0.15)

  products       Product[]
  payoutAccount  PayoutAccount?
  payouts        Payout[]

  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

enum KycStatus { PENDING SUBMITTED APPROVED REJECTED }

model PayoutAccount {
  id          String  @id @default(cuid())
  vendorId    String  @unique
  vendor      Vendor  @relation(fields: [vendorId], references: [id])
  provider    String  // stripe, atlos, bank
  accountId   String?
  accountData Json?
  verified    Boolean @default(false)
}

model Payout {
  id        String       @id @default(cuid())
  vendorId  String
  vendor    Vendor       @relation(fields: [vendorId], references: [id])
  amount    Float
  currency  String       @default("USD")
  status    PayoutStatus @default(PENDING)
  reference String?
  paidAt    DateTime?
  createdAt DateTime     @default(now())
}

enum PayoutStatus { PENDING PROCESSING COMPLETED FAILED }

// ==================== PRODUCTS ====================
model Category {
  id          String     @id @default(cuid())
  name        String
  slug        String     @unique
  description String?
  icon        String?
  parentId    String?
  parent      Category?  @relation("SubCategories", fields: [parentId], references: [id])
  children    Category[] @relation("SubCategories")
  products    Product[]
  createdAt   DateTime   @default(now())
}

model Product {
  id           String        @id @default(cuid())
  vendorId     String
  vendor       Vendor        @relation(fields: [vendorId], references: [id])
  categoryId   String?
  category     Category?     @relation(fields: [categoryId], references: [id])

  title        String
  slug         String        @unique
  description  String        @db.Text
  shortDesc    String?
  price        Float
  comparePrice Float?

  thumbnail    String
  images       String[]
  demoUrl      String?
  videoUrl     String?

  files        ProductFile[]
  licenses     License[]
  tags         String[]

  featured     Boolean       @default(false)
  status       ProductStatus @default(DRAFT)
  salesCount   Int           @default(0)
  viewCount    Int           @default(0)
  avgRating    Float         @default(0)

  orderItems   OrderItem[]
  reviews      Review[]
  cartItems    CartItem[]

  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  @@index([vendorId])
  @@index([categoryId])
  @@index([status])
}

enum ProductStatus { DRAFT PENDING PUBLISHED REJECTED ARCHIVED }

model ProductFile {
  id        String  @id @default(cuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  name      String
  key       String  // S3 key
  size      Int
  checksum  String
  version   String  @default("1.0.0")
}

model License {
  id          String   @id @default(cuid())
  productId   String
  product     Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  type        String   // personal, commercial, extended
  name        String
  price       Float
  features    String[]
  maxProjects Int?
  support     Boolean  @default(false)
  updates     String?  // 6mo, 1yr, lifetime
}

// ==================== ORDERS ====================
model Order {
  id            String      @id @default(cuid())
  orderNumber   String      @unique
  userId        String
  user          User        @relation(fields: [userId], references: [id])

  items         OrderItem[]
  downloads     Download[]

  subtotal      Float
  discount      Float       @default(0)
  platformFee   Float
  total         Float
  currency      String      @default("USD")

  status        OrderStatus @default(PENDING)
  paymentMethod String?     // stripe, atlos
  paymentId     String?
  paidAt        DateTime?

  couponId      String?
  coupon        Coupon?     @relation(fields: [couponId], references: [id])

  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  @@index([userId])
  @@index([status])
}

enum OrderStatus { PENDING PROCESSING PAID FULFILLED REFUNDED CANCELLED }

model OrderItem {
  id          String  @id @default(cuid())
  orderId     String
  order       Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String
  product     Product @relation(fields: [productId], references: [id])
  vendorId    String
  licenseType String
  price       Float
  licenseKey  String?
}

model Download {
  id        String   @id @default(cuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  fileKey   String
  count     Int      @default(0)
  maxCount  Int      @default(5)
  expiresAt DateTime
  createdAt DateTime @default(now())
}

// ==================== CART ====================
model CartItem {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId   String
  product     Product  @relation(fields: [productId], references: [id])
  licenseType String   @default("personal")
  createdAt   DateTime @default(now())

  @@unique([userId, productId])
}

// ==================== REVIEWS ====================
model Review {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  rating    Int
  title     String?
  comment   String?  @db.Text
  verified  Boolean  @default(false)
  helpful   Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, productId])
}

// ==================== COUPONS ====================
model Coupon {
  id          String     @id @default(cuid())
  code        String     @unique
  type        CouponType
  value       Float
  minPurchase Float?
  maxDiscount Float?
  usageLimit  Int?
  usedCount   Int        @default(0)
  startDate   DateTime?
  endDate     DateTime?
  active      Boolean    @default(true)
  orders      Order[]
  createdAt   DateTime   @default(now())
}

enum CouponType { PERCENTAGE FIXED }

// ==================== BLOG ====================
model BlogPost {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  excerpt     String?
  content     String    @db.Text
  thumbnail   String?
  authorId    String
  published   Boolean   @default(false)
  publishedAt DateTime?
  tags        String[]
  viewCount   Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// ==================== SETTINGS ====================
model Setting {
  id    String @id @default(cuid())
  key   String @unique
  value Json
}
```

---

## 💳 Payment Integration

### Stripe (Fiat)

```typescript
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export async function createCheckoutSession(order: Order) {
  return stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: order.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.product.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    })),
    metadata: { orderId: order.id },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=true`,
  });
}
```

### Atlos (Crypto)

```typescript
// lib/atlos.ts
const ATLOS_API = 'https://api.atlos.io/v1';

interface AtlosPayment {
  id: string;
  checkout_url: string;
  status: 'pending' | 'paid' | 'expired';
}

export async function createAtlosPayment(order: Order): Promise<AtlosPayment> {
  const res = await fetch(`${ATLOS_API}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Merchant-Id': process.env.ATLOS_MERCHANT_ID!,
      'X-Api-Secret': process.env.ATLOS_API_SECRET!,
    },
    body: JSON.stringify({
      amount: order.total,
      currency: 'USD',
      order_id: order.id,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/atlos`,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${order.id}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?canceled=true`,
    }),
  });

  if (!res.ok) throw new Error('Failed to create Atlos payment');
  return res.json();
}

export function verifyAtlosWebhook(payload: string, signature: string): boolean {
  const crypto = require('crypto');
  const expected = crypto
    .createHmac('sha256', process.env.ATLOS_WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
```

### Webhook Handler

```typescript
// app/api/webhooks/atlos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAtlosWebhook } from '@/lib/atlos';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get('x-atlos-signature') || '';

  if (!verifyAtlosWebhook(payload, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(payload);

  if (event.type === 'payment.completed') {
    await prisma.order.update({
      where: { id: event.data.order_id },
      data: {
        status: 'PAID',
        paymentId: event.data.payment_id,
        paidAt: new Date(),
      },
    });
  }

  return NextResponse.json({ received: true });
}
```

---

## 📡 API Routes

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/[...nextauth]` | NextAuth handlers |
| POST | `/api/auth/forgot-password` | Request reset |
| POST | `/api/auth/reset-password` | Reset with token |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List (paginated, filtered) |
| GET | `/api/products/[slug]` | Get details |
| POST | `/api/products` | Create (vendor) |
| PUT | `/api/products/[id]` | Update (vendor) |
| DELETE | `/api/products/[id]` | Delete (vendor) |

### Cart & Checkout
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart` | Add item |
| DELETE | `/api/cart/[id]` | Remove item |
| POST | `/api/checkout` | Create session |
| POST | `/api/checkout/atlos` | Crypto checkout |

### Orders & Downloads
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | List user orders |
| GET | `/api/orders/[id]` | Order details |
| GET | `/api/downloads/[id]` | Signed download URL |

### Webhooks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webhooks/stripe` | Stripe events |
| POST | `/api/webhooks/atlos` | Atlos crypto events |

---

## 🧩 Component Examples

### Loading Button (MUST keep label)
```tsx
export function Button({ loading, children, ...props }) {
  return (
    <button disabled={loading} {...props}>
      {loading && <Spinner className="mr-2" aria-hidden />}
      {children}
    </button>
  );
}
```

### Form with Error Handling
```tsx
export function LoginForm() {
  const [error, setError] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        autoComplete="email"
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <span id="email-error" role="alert" className="text-red-500">
          {error}
        </span>
      )}
      <Button type="submit">Sign In</Button>
    </form>
  );
}
```

### Skeleton Matching Layout
```tsx
export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full h-48 rounded-lg" />
      <Skeleton className="w-3/4 h-5" />
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-1/4 h-6" />
    </div>
  );
}
```

### Accessible Modal
```tsx
export function ConfirmDialog({ open, onClose, onConfirm, title, children }) {
  const cancelRef = useRef(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      initialFocus={cancelRef}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
```

### Error State with Guidance
```tsx
export function ErrorAlert({ title, message, action }) {
  return (
    <Alert severity="error" role="alert">
      <AlertTitle>{title}</AlertTitle>
      <p>{message}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </Alert>
  );
}

// Usage: Guide the exit, be specific
<ErrorAlert
  title="Payment Failed"
  message="Your card was declined. Please try a different payment method."
  action={{ label: "Update Payment Method", onClick: () => router.push('/settings/billing') }}
/>
```

---

## 🎨 Footer Component

```tsx
// components/layout/Footer.tsx
import Link from 'next/link';
import { Telegram, WhatsApp, Language } from '@mui/icons-material';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Scripters™</h3>
            <p className="text-gray-400">
              Buy digital goods! Premium scripts, themes, templates & more.
            </p>
            <div className="flex gap-3">
              <a
                href="https://t.me/ScriptsChats"
                aria-label="Join Telegram Community"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Telegram />
              </a>
              <a
                href="https://wa.me/18208231206"
                aria-label="Contact on WhatsApp"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <WhatsApp />
              </a>
              <a
                href="https://scripters.shop"
                aria-label="Visit Website"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Language />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products?category=crypto-tools">Crypto Tools</Link></li>
              <li><Link href="/products?category=scripts">Scripts</Link></li>
              <li><Link href="/products?category=themes">Themes</Link></li>
              <li><Link href="/products?category=ebooks">E-books</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help">Help Center</Link></li>
              <li><a href="https://t.me/LikhonDev">@LikhonDev</a></li>
              <li><Link href="/refunds">Refund Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="font-semibold mb-4">Trust & Safety</h4>
            <ul className="space-y-2 text-gray-400">
              <li>🛡️ Escrow Protection</li>
              <li>✅ Verified Vendors</li>
              <li>💳 Secure Payments</li>
              <li>🔒 Crypto via Atlos</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© {year} Scripters™. All rights reserved.</p>
          <p className="text-sm mt-2">
            🔺 Verify at scripters.shop • We do not support deals from other platforms
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

## 🚀 Deployment

### Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

### Dockerfile

```dockerfile
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate && pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm build

# .github/workflows/cd.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: --prod
```

---
