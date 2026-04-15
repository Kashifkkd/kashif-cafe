import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, Star, Tag, Flame } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type MenuItem = {
  name: string;
  description: string;
  image: string;
  price: number;
  discountedPrice?: number;
  isSpecial?: boolean;
};

type MenuCategory = {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  items: MenuItem[];
};

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "coffee",
    title: "Coffee & Espresso",
    subtitle: "Single-origin beans and slow barista craft",
    coverImage:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80&auto=format&fit=crop",
    items: [
      {
        name: "Heritage Signature Latte",
        description: "Caramelized brown sugar, cinnamon foam, and espresso double shot.",
        image:
          "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=1000&q=80&auto=format&fit=crop",
        price: 9.5,
        discountedPrice: 8,
        isSpecial: true,
      },
      {
        name: "Cold Brew Reserve",
        description: "18-hour steeped arabica with citrus finish.",
        image:
          "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=1000&q=80&auto=format&fit=crop",
        price: 7.5,
      },
      {
        name: "Classic Cappuccino",
        description: "Velvety milk microfoam with balanced espresso body.",
        image:
          "https://images.unsplash.com/photo-1534778101976-62847782c213?w=1000&q=80&auto=format&fit=crop",
        price: 6.5,
        discountedPrice: 5.5,
      },
    ],
  },
  {
    id: "bites",
    title: "All-Day Bites",
    subtitle: "Fresh, hearty, and handcrafted in-house",
    coverImage:
      "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=1600&q=80&auto=format&fit=crop",
    items: [
      {
        name: "Truffle Mushroom Sandwich",
        description: "Sourdough, roasted mushrooms, truffle aioli, and aged cheddar.",
        image:
          "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1000&q=80&auto=format&fit=crop",
        price: 15.5,
        discountedPrice: 13.5,
        isSpecial: true,
      },
      {
        name: "Smoky Peri Peri Fries",
        description: "Crispy potato fries with house peri peri seasoning.",
        image:
          "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=1000&q=80&auto=format&fit=crop",
        price: 6,
      },
      {
        name: "Garden Pesto Panini",
        description: "Grilled vegetables, basil pesto, and mozzarella.",
        image:
          "https://images.unsplash.com/photo-1550317138-10000687a72b?w=1000&q=80&auto=format&fit=crop",
        price: 12.5,
      },
    ],
  },
  {
    id: "pizza",
    title: "Artisan Pizza",
    subtitle: "Stone-fired classics with modern cafe flair",
    coverImage:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1600&q=80&auto=format&fit=crop",
    items: [
      {
        name: "Burrata Margherita",
        description: "San Marzano tomato, fresh basil, olive oil, and burrata.",
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1000&q=80&auto=format&fit=crop",
        price: 18.5,
        discountedPrice: 16,
        isSpecial: true,
      },
      {
        name: "BBQ Chicken Rustica",
        description: "Smoked chicken, barbecue glaze, onion confit, and mozzarella.",
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1000&q=80&auto=format&fit=crop",
        price: 19,
      },
      {
        name: "Farmhouse Harvest",
        description: "Bell peppers, olives, sweet corn, and herbed ricotta.",
        image:
          "https://images.unsplash.com/photo-1548365328-9f547fb0953f?w=1000&q=80&auto=format&fit=crop",
        price: 17,
      },
    ],
  },
  {
    id: "mocktails",
    title: "Mocktails & Mojitos",
    subtitle: "Bright, refreshing, and photo-ready pours",
    coverImage:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=1600&q=80&auto=format&fit=crop",
    items: [
      {
        name: "Royal Mint Mojito",
        description: "Fresh mint, lime, crushed ice, and sparkling finish.",
        image:
          "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=1000&q=80&auto=format&fit=crop",
        price: 8.5,
        discountedPrice: 7,
      },
      {
        name: "Passion Fruit Sparkler",
        description: "Tropical passion fruit blend with basil seeds and soda.",
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?w=1000&q=80&auto=format&fit=crop",
        price: 8,
      },
      {
        name: "Berry Sunset Cooler",
        description: "Mixed berries, lemon, and rosemary simple syrup.",
        image:
          "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1000&q=80&auto=format&fit=crop",
        price: 9,
        isSpecial: true,
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Heritage Café Menu",
  description: "Explore our complete café menu with categories, prices, and special offers.",
};

function formatPrice(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--cream-warm)] pb-20 pt-22 sm:pt-28">
        <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--espresso)]/10 bg-[var(--espresso)] shadow-[0_20px_90px_rgba(0,0,0,0.18)] sm:rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1800&q=80&auto=format&fit=crop"
              alt="Cafe menu hero"
              width={1800}
              height={900}
              className="h-[300px] w-full object-cover opacity-60 sm:h-[450px]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,194,94,0.22),transparent_40%)]" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-10 md:p-12">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--cream)]/90 backdrop-blur">
                <Sparkles className="size-3.5" />
                World-Class Cafe Selection
              </p>
              <h1 className="mt-3 max-w-3xl font-editorial text-3xl font-semibold text-[var(--cream)] sm:mt-4 sm:text-5xl md:text-6xl">
                Crafted menu with global standards
              </h1>
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-[var(--cream)]/80 sm:mt-4 sm:text-base">
                Elevated flavor profiles, polished plating, and clear value through curated
                discounts. Discover chef-recommended stars across every category.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 md:px-10">
          <div className="flex flex-wrap gap-2">
            {MENU_CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
              className="inline-flex items-center rounded-full border border-[var(--espresso)]/15 bg-[var(--cream)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--espresso)]/80 transition hover:border-[var(--amber)] hover:text-[var(--amber)] sm:px-4 sm:py-2 sm:text-xs sm:tracking-widest"
              >
                {category.title}
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-6 grid w-full max-w-7xl gap-8 px-4 sm:mt-8 sm:px-6 md:px-10">
          {MENU_CATEGORIES.map((category) => (
            <article
              id={category.id}
              key={category.title}
              className="overflow-hidden rounded-[2rem] border border-[var(--espresso)]/10 bg-[var(--cream)] shadow-[0_18px_60px_rgba(0,0,0,0.08)]"
            >
              <header className="relative h-44 sm:h-60">
                <Image
                  src={category.coverImage}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
                  <h2 className="font-editorial text-2xl font-semibold text-[var(--cream)] sm:text-4xl">
                    {category.title}
                  </h2>
                  <p className="mt-1 text-xs text-[var(--cream)]/80 sm:text-sm">{category.subtitle}</p>
                </div>
              </header>

              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3">
                {category.items.map((item) => {
                  const hasDiscount = typeof item.discountedPrice === "number";
                  const discountPercent = hasDiscount
                    ? Math.round(((item.price - item.discountedPrice!) / item.price) * 100)
                    : 0;

                  return (
                    <div
                      key={item.name}
                      className="group overflow-hidden rounded-3xl border border-[var(--espresso)]/10 bg-white/80 shadow-[0_14px_40px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:border-[var(--amber)]/50 hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)]"
                    >
                      <div className="relative h-40 overflow-hidden sm:h-44">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                        {item.isSpecial && (
                          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full border border-[var(--amber)]/35 bg-[var(--amber)]/20 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[var(--cream)] backdrop-blur sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px] sm:tracking-widest">
                            <Flame className="size-3" />
                            Chef Special
                          </span>
                        )}
                      </div>

                      <div className="p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-[var(--espresso)]">{item.name}</h3>
                          {!item.isSpecial && (
                            <Star className="mt-0.5 size-4 text-[var(--espresso)]/35" />
                          )}
                        </div>
                        <p className="mt-2 text-sm text-[var(--espresso)]/65">{item.description}</p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {hasDiscount ? (
                            <>
                              <span className="text-lg font-semibold text-[var(--espresso)] sm:text-xl">
                                {formatPrice(item.discountedPrice!)}
                              </span>
                              <span className="text-sm text-[var(--espresso)]/45 line-through">
                                {formatPrice(item.price)}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--amber)]/20 px-2 py-0.5 text-[10px] font-semibold text-[var(--espresso)] sm:text-xs">
                                <Tag className="size-3" />
                                {discountPercent}% OFF
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-semibold text-[var(--espresso)] sm:text-xl">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>

                        {hasDiscount && (
                          <p className="mt-2 text-xs uppercase tracking-widest text-[var(--espresso)]/55">
                            Limited time price
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
