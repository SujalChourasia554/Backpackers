import Navbar from "@/Components/Navbar";
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const categories = [
    {
      title: "Beaches",
      description: "Discover pristine beaches and coastal paradise",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80",
      link: "/beaches",
      color: "#00a8cc"
    },
    {
      title: "Mountains",
      description: "Explore majestic peaks and scenic trails",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
      link: "/mountains",
      color: "#2d5016"
    },
    {
      title: "Cultural & Heritage",
      description: "Experience rich history and traditions",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80",
      link: "/cultural",
      color: "#8b4513"
    },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Background Image */}
      <div className={styles.backgroundImage} />

      {/* Navbar */}
      <Navbar />

      {/* Main Content Wrapper */}
      <div className={styles.mainContent}>

        {/* ================= HERO SECTION ================= */}
        <section className={styles.heroSection}>
          {/* Left */}
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle}>
              Travel Smarter. <br />
              Backpack lighter.
            </h1>

            <p className={styles.heroDescription}>
              Plan stays, food and unforgettable experience that
              match your budget and vibe – powered by AI and
              real backpacker journeys.
            </p>

            <Link href="/explore">
              <button className={styles.primaryButton}>
                Start My Journey
              </button>
            </Link>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.logoContainer}>
              <img
                src="/logo.png"
                alt="Backpackers Logo"
                className={styles.heroLogo}
              />
            </div>
          </div>
        </section>

        <section className={styles.categoriesSection}>
          <h2 className={styles.sectionTitle}>
            Choose Your <span className={styles.highlight}>Destination</span>
          </h2>

          <div className={styles.categoriesGrid}>
            {categories.map((category) => (
              <Link href={category.link} key={category.title}>
                <div className={styles.categoryCard}>
                  <div 
                    className={styles.categoryImage}
                    style={{ 
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className={styles.categoryOverlay}>
                      <h3 className={styles.categoryTitle}>{category.title}</h3>
                    </div>
                  </div>
                  <div className={styles.categoryContent}>
                    <p className={styles.categoryDescription}>{category.description}</p>
                    <div 
                      className={styles.exploreButton}
                      style={{ backgroundColor: category.color }}
                    >
                      Explore →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= PLAN SECTION ================= */}
        <section className={styles.planSection}>
          <div className={styles.planContainer}>

            {/* Left */}
            <div className={styles.planLeft}>
              <span className={styles.planBadge}>
                SMARTER TRAVEL
              </span>

              <h2 className={styles.planTitle}>
                Let Us Plan Your <br /> Dream Itinerary
              </h2>

              <p className={styles.planDescription}>
                Stop spending hours researching. Tell us your budget, dates and interest,
                and we'll generate a day-by-day plan with hotel booking and hidden places.
              </p>

              <Link href="/explore">
                <button className={styles.planButton}>
                  Create My Trip
                </button>
              </Link>
            </div>

            <div className={styles.planRight}>
              <h4 className={styles.planCardTitle}>Your 3-Day Plan</h4>

              <ul className={styles.planList}>
                <li>✔ Check in The Hostel</li>
                <li>✔ Visit the Waterfall</li>
                <li>✔ Trek the Mountains</li>
              </ul>

              <p className={styles.budgetTag}>
                Budget Friendly
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
