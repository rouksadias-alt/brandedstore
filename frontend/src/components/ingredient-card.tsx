import { Leaf, Snowflake, Coffee, Droplets, Wind, Shield } from "lucide-react";
import type { Ingredient } from "@/lib/products";

const iconMap = {
  leaf: Leaf,
  snowflake: Snowflake,
  coffee: Coffee,
  droplets: Droplets,
  wind: Wind,
  shield: Shield,
};

export function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  const Icon = iconMap[ingredient.icon];
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-mint-100 bg-white p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-100 text-mint-700">
        <Icon className="h-6 w-6" />
      </div>
      <p className="font-bold text-ink">{ingredient.name}</p>
      <p className="text-sm leading-relaxed text-ink/65">{ingredient.benefit}</p>
    </div>
  );
}
