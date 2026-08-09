export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/hero.png" />
        <img
          src="/images/hero-mobile.png"
          alt="Elzavia"
          className="w-full h-auto block"
        />
      </picture>
    </section>
  );
}
